import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Plot } from "@/types/plot"; // Ensure this matches your shared type
import { plotPositions } from "./plotData"; // Check this path is correct relative to this file
import { MapControls } from "./MapControls";
import { PlotShape } from "./PlotShape";
import { Legend } from "./Legend";

// 1. ADD 'imageUrl' TO THE INTERFACE
interface InteractiveMapProps {
  plots: Plot[];
  selectedPlot: Plot | null;
  onSelectPlot: (plot: Plot) => void;
  imageUrl: string; // <--- This was missing!
}

// MATCH THESE TO YOUR IMAGE ASPECT RATIO (e.g. 3628 x 2628)
const MAP_WIDTH = 3628; 
const MAP_HEIGHT = 2628;

export function InteractiveMap({ plots, selectedPlot, onSelectPlot, imageUrl }: InteractiveMapProps) {
  return (
    <div className="relative flex-1 bg-gray-100 overflow-hidden h-full min-h-[600px]">
      <TransformWrapper
        initialScale={0.22}
        minScale={0.15}
        maxScale={4}
        centerOnInit={true}
        limitToBounds={false}
        wheel={{ step: 0.1 }}
        doubleClick={{ disabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <MapControls
              onZoomIn={() => zoomIn()}
              onZoomOut={() => zoomOut()}
              onReset={() => resetTransform()}
            />
            <Legend />
            
            <TransformComponent
              wrapperClass="!w-full !h-full"
              contentClass="!w-full !h-full flex items-center justify-center"
            >
              <div 
                className="relative shadow-2xl bg-white" 
                style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}
              >
                {/* 2. USE THE DYNAMIC IMAGE URL HERE */}
                <img
                  src={imageUrl || "/placeholder.jpg"} 
                  alt="Master Plan Layout"
                  className="w-full h-full object-contain select-none pointer-events-none"
                  draggable={false}
                />
                
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                  preserveAspectRatio="xMidYMid meet"
                >
                  {plots.map((plot) => {
                    const position = plotPositions.find((p) => p.id === plot.id);
                    if (!position) return null;
                    
                    return (
                      <PlotShape
                        key={plot.id}
                        plot={plot}
                        position={position}
                        isSelected={selectedPlot?.id === plot.id}
                        onSelect={onSelectPlot}
                      />
                    );
                  })}
                </svg>
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>

      <div className="absolute bottom-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 px-4 py-2 pointer-events-none">
        <p className="text-xs text-gray-600">
          <span className="font-medium text-gray-900">Tip:</span> Scroll to zoom, drag to pan
        </p>
      </div>
    </div>
  );
}