import { useState, useCallback } from "react";
import { TopBar } from "./TopBar";
import { InteractiveMap } from "./InteractiveMap";
import { plotsData } from "./plotData"; 
import { useToast } from "@/hooks/use-toast";
// Import the Shared Type ONLY. Do not define it locally again.
import { Plot } from "@/types/plot";

// Define the props this container accepts
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
    <div className="flex flex-col h-[800px] border border-border rounded-xl overflow-hidden shadow-lg bg-background">
      {/* Title Bar */}
      <div className="bg-primary/5 p-4 border-b border-border">
        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
          📍 Interactive Master Plan
        </h2>
        <p className="text-sm text-muted-foreground">
          Click on any plot to view details or check availability.
        </p>
      </div>

      {/* Search & Status Bar */}
      <TopBar selectedPlot={selectedPlot} onSearch={handleSearch} />
      
      {/* The Map */}
      <InteractiveMap
        plots={plotsData}
        selectedPlot={selectedPlot}
        onSelectPlot={handleSelectPlot}
        // Use the prop passed from ProjectDetails, or fallback to a default if missing
        imageUrl={imageUrl || ""}
      />
    </div>
  );
}