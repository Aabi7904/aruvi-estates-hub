import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Plot } from "@/types/plot"; 
import { MapControls } from "./MapControls";
import { PlotShape } from "./PlotShape";
import { Legend } from "./Legend";
// Import the type for Positions
import { PlotPosition } from "@/data/maps/mapRegistry";

interface InteractiveMapProps {
  plots: Plot[];
  selectedPlot: Plot | null;
  onSelectPlot: (plot: Plot) => void;
  imageUrl: string;
  initialScale?: number;
  
  // 🆕 NEW PROPS: Dynamic Data
  plotPositions: PlotPosition[];
  mapDimensions: { width: number; height: number };
}

export function InteractiveMap({
  plots,
  selectedPlot,
  onSelectPlot,
  imageUrl,
  initialScale = 0.4,
  plotPositions,   // <--- Now dynamic
  mapDimensions,   // <--- Now dynamic
}: InteractiveMapProps) {
  
  // Destructure dynamic dimensions
  const { width, height } = mapDimensions;

  return (
    <div className="relative flex-1 bg-gray-100 overflow-hidden w-full h-full">
      <TransformWrapper
        initialScale={initialScale}
        minScale={0.15}
        maxScale={4}
        centerOnInit={true}
        centerZoomedOut={false}
        limitToBounds={false}
        wheel={{ step: 0.1 }}
        doubleClick={{ disabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <MapControls onZoomIn={zoomIn} onZoomOut={zoomOut} onReset={resetTransform} />
            <Legend />

            <TransformComponent
              wrapperClass="!w-full !h-full"
              contentClass="!w-full !h-full"
            >
              <div className="w-full flex justify-center items-start">
                <div
                  className="relative shadow-2xl bg-white w-fit h-fit"
                  style={{ transformOrigin: "center top" }}
                >
                  <img
                    src={imageUrl || "/placeholder.jpg"}
                    alt="Master Plan Layout"
                    className="block max-w-none select-none pointer-events-none"
                    // 🆕 Use dynamic dimensions
                    style={{ width: width, height: "auto" }}
                    draggable={false}
                  />

                  <svg
                    className="absolute inset-0 w-full h-full"
                    // 🆕 Use dynamic viewBox
                    viewBox={`0 0 ${width} ${height}`}
                    preserveAspectRatio="none"
                  >
                    {plots.map((plot) => {
                      // 🆕 Find position in the passed PROP array
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