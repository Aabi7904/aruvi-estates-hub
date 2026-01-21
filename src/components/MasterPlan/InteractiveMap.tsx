import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Plot } from "@/types/plot"; 
import { plotPositions } from "./plotData"; 
import { MapControls } from "./MapControls";
import { PlotShape } from "./PlotShape";
import { Legend } from "./Legend";

// Keep coordinate system for the SVG points
const MAP_WIDTH = 3628;
const MAP_HEIGHT = 2628;

interface InteractiveMapProps {
  plots: Plot[];
  selectedPlot: Plot | null;
  onSelectPlot: (plot: Plot) => void;
  imageUrl: string;
  initialScale?: number; 
}

export function InteractiveMap({
  plots,
  selectedPlot,
  onSelectPlot,
  imageUrl,
  initialScale = 0.4, 
}: InteractiveMapProps) {
  return (
    <div className="relative flex-1 bg-gray-100 overflow-hidden w-full h-full">
      <TransformWrapper
        initialScale={initialScale}
        minScale={0.15}
        maxScale={4}
        centerOnInit={false} // Prevent auto-centering (fixes top white space)
        limitToBounds={false}
        wheel={{ step: 0.1 }}
        doubleClick={{ disabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <MapControls
              onZoomIn={zoomIn}
              onZoomOut={zoomOut}
              onReset={resetTransform}
            />

            <Legend />

            <TransformComponent
              wrapperClass="!w-full !h-full"
              contentClass="!w-full !h-full"
            >
              {/* Layout: Horizontal Center, Vertical Top */}
              <div className="w-full h-full flex justify-center items-start">
                <div
                  className="relative shadow-2xl bg-white w-fit h-fit"
                  style={{ transformOrigin: "center top" }} // Shrinks upwards
                >
                  <img
                    src={imageUrl || "/placeholder.jpg"}
                    alt="Master Plan Layout"
                    className="block max-w-none select-none pointer-events-none"
                    style={{ width: MAP_WIDTH, height: "auto" }}
                    draggable={false}
                  />

                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                    preserveAspectRatio="none"
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