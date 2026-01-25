import { useState, useCallback } from "react";
import { TopBar } from "./TopBar";
import { InteractiveMap } from "./InteractiveMap";
import { useToast } from "@/hooks/use-toast";
import { Plot } from "@/types/plot";
// 🆕 Import the type
import { ProjectMapData } from "@/data/maps/mapRegistry";

interface MasterPlanContainerProps {
  imageUrl?: string;
  mapData: ProjectMapData; // 🆕 Accept the full data object
}

export function MasterPlanContainer({ imageUrl, mapData }: MasterPlanContainerProps) {
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const { toast } = useToast();

  // 🆕 Search logic now uses the passed mapData, not the hardcoded file
  const handleSearch = useCallback((plotId: string) => {
    const plot = mapData.plots.find((p) => p.id === plotId);
    
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
  }, [toast, mapData.plots]); // Depend on dynamic plots

  const handleSelectPlot = useCallback((plot: Plot) => {
    setSelectedPlot(plot);
  }, []);

  return (
    <div className="flex flex-col w-full h-[600px] border border-border rounded-xl overflow-hidden shadow-lg bg-background">
      
      <TopBar selectedPlot={selectedPlot} onSearch={handleSearch} />
      
      <div className="flex-1 relative w-full h-full bg-gray-50 overflow-hidden">
        <InteractiveMap
          // 🆕 Pass dynamic data down
          plots={mapData.plots}
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