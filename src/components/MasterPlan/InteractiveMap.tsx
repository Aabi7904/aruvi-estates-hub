import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Plot } from "@/types/plot"; // Shared Plot type
import { plotPositions } from "./plotData"; // Make sure path is correct
import { MapControls } from "./MapControls";
import { PlotShape } from "./PlotShape";
import { Legend } from "./Legend";

// Map dimensions (adjust to your image's real dimensions)
const MAP_WIDTH = 3628;
const MAP_HEIGHT = 2628;

// InteractiveMap Props
interface InteractiveMapProps {
  plots: Plot[];
  selectedPlot: Plot | null;
  onSelectPlot: (plot: Plot) => void;
  imageUrl: string;
  initialScale?: number; // Optional initial zoom
}

export function InteractiveMap({
  plots,
  selectedPlot,
  onSelectPlot,
  imageUrl,
  initialScale = 0.22, // default zoom
}: InteractiveMapProps) {
  return (
    <div className="relative flex-1 bg-gray-100 overflow-hidden w-full h-full min-h-[600px]">
      <TransformWrapper
        initialScale={initialScale}
        minScale={0.15}
        maxScale={4}
        centerOnInit={true}
        limitToBounds={false}
        wheel={{ step: 0.1 }}
        doubleClick={{ disabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Zoom & Reset Controls */}
            <MapControls
              onZoomIn={zoomIn}
              onZoomOut={zoomOut}
              onReset={resetTransform}
            />

            {/* Legend */}
            <Legend />

            {/* Zoomable/Pannable Content */}
            <TransformComponent
              wrapperClass="!w-full !h-full"
              contentClass="!w-full !h-full flex items-center justify-center"
            >
              <div
                className="relative shadow-2xl bg-white"
                style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}
              >
                {/* Master Plan Image */}
                <img
                  src={imageUrl || "/placeholder.jpg"}
                  alt="Master Plan Layout"
                  className="w-full h-full object-contain select-none pointer-events-none"
                  draggable={false}
                />

                {/* Plots Overlay */}
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

      {/* Tip Box */}
      <div className="absolute bottom-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 px-4 py-2 pointer-events-none">
        <p className="text-xs text-gray-600">
          <span className="font-medium text-gray-900">Tip:</span> Scroll to zoom, drag to pan
        </p>
      </div>
    </div>
  );
}
