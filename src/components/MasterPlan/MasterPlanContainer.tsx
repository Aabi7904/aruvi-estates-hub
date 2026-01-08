import { useState, useCallback } from "react";
import { TopBar } from "./TopBar";
import { InteractiveMap } from "./InteractiveMap";
import { plotsData } from "./plotData"; 
import { useToast } from "@/hooks/use-toast";
import { Plot } from "@/types/plot";

interface MasterPlanContainerProps {
  imageUrl?: string;
}

export function MasterPlanContainer({ imageUrl }: MasterPlanContainerProps) {
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const { toast } = useToast();

  const handleSearch = useCallback((plotId: string) => {
    const plot = plotsData.find((p) => p.id === plotId);
    
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
  }, [toast]);

  const handleSelectPlot = useCallback((plot: Plot) => {
    setSelectedPlot(plot);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-[500px] border border-border rounded-xl overflow-hidden shadow-lg bg-background">
      
      {/* Search & Status Bar */}
      <TopBar selectedPlot={selectedPlot} onSearch={handleSearch} />
      
      {/* Map Wrapper */}
      <div className="flex-1 relative w-full h-full bg-gray-50 overflow-hidden">
        <InteractiveMap
          plots={plotsData}
          selectedPlot={selectedPlot}
          onSelectPlot={handleSelectPlot}
          imageUrl={imageUrl || ""}
          initialScale={0.5} // <-- Pass initialScale (NOT initialZoom)
        />
      </div>
    </div>
  );
}
