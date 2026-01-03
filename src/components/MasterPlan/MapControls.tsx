import { Plus, Minus, RotateCcw } from "lucide-react";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function MapControls({ onZoomIn, onZoomOut, onReset }: MapControlsProps) {
  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
      <button
        onClick={onZoomIn}
        className="w-10 h-10 rounded-full bg-card shadow-lg border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors duration-200"
        aria-label="Zoom in"
      >
        <Plus className="w-5 h-5" />
      </button>
      <button
        onClick={onZoomOut}
        className="w-10 h-10 rounded-full bg-card shadow-lg border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors duration-200"
        aria-label="Zoom out"
      >
        <Minus className="w-5 h-5" />
      </button>
      <button
        onClick={onReset}
        className="w-10 h-10 rounded-full bg-card shadow-lg border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors duration-200"
        aria-label="Reset view"
      >
        <RotateCcw className="w-5 h-5" />
      </button>
    </div>
  );
}
