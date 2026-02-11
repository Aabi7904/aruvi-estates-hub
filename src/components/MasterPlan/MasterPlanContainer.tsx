import { useState, useCallback, useMemo } from "react";
import { TopBar } from "./TopBar";
import { InteractiveMap } from "./InteractiveMap";
import { useToast } from "@/hooks/use-toast";
import { Plot } from "@/types/plot";
import { ProjectMapData } from "@/data/maps/mapRegistry";
// 🆕 Import Project type correctly (it is now exported)
import { Project } from "@/pages/ProjectDetails"; 

interface MasterPlanContainerProps {
  imageUrl?: string;
  mapData: ProjectMapData; 
  project?: Project; 
}

export function MasterPlanContainer({ imageUrl, mapData, project }: MasterPlanContainerProps) {
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const { toast } = useToast();

  // 🆕 MERGE LOGIC: Combine static data with live Firebase statuses
  const dynamicPlots = useMemo(() => {
    // If no live data, return static data
    if (!project?.plotStatuses) return mapData.plots;

    // ⚠️ FIXED: Explicitly typed Map to avoid 'unknown' errors
    const statusMap = new Map<string, string>();
    project.plotStatuses.forEach(p => statusMap.set(p.id, p.status));

    return mapData.plots.map(plot => {
      const liveStatus = statusMap.get(plot.id);
      
      // If live status exists, override the static one.
      // ⚠️ FIXED: Added 'as Plot' casting to satisfy TypeScript if "Reserved" status is used
      if (liveStatus) {
        return { ...plot, status: liveStatus } as Plot;
      }
      return plot;
    });
  }, [mapData.plots, project?.plotStatuses]);

  const handleSearch = useCallback((plotId: string) => {
    const plot = dynamicPlots.find((p) => p.id === plotId);
    
    if (plot) {
      setSelectedPlot(plot);
      toast({
        title: `Plot ${plot.id} Found`,
        description: `Area: ${plot.sqft.toLocaleString()} Sq.ft • Status: ${plot.status}`,
      });
    } else {
      toast({
        title: "Plot Not Found",
        description: `No plot with ID "${plotId}" exists.`,
        variant: "destructive",
      });
    }
  }, [toast, dynamicPlots]); 

  const handleSelectPlot = useCallback((plot: Plot) => {
    setSelectedPlot(plot);
  }, []);

  return (
    <div className="flex flex-col w-full h-[600px] border border-border rounded-xl overflow-hidden shadow-lg bg-background">
      
      <TopBar selectedPlot={selectedPlot} onSearch={handleSearch} />
      
      <div className="flex-1 relative w-full h-full bg-gray-50 overflow-hidden">
        <InteractiveMap
          // Pass the merged DYNAMIC plots instead of static mapData.plots
          plots={dynamicPlots}
          plotPositions={mapData.positions}
          mapDimensions={mapData.dimensions}
          
          selectedPlot={selectedPlot}
          onSelectPlot={handleSelectPlot}
          imageUrl={imageUrl || ""}
          initialScale={0.2} 
        />
      </div>
    </div>
  );
}