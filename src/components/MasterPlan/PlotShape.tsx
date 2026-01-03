import { Plot } from "@/types/plot";
import { PlotPosition } from "./plotData";

interface PlotShapeProps {
  plot: Plot;
  position: PlotPosition;
  isSelected: boolean;
  onSelect: (plot: Plot) => void;
}

export function PlotShape({ plot, position, isSelected, onSelect }: PlotShapeProps) {
  
  // 1. Define color schemes based on status
  const getStatusClasses = () => {
    switch (plot.status) {
      case 'Available':
        return {
          // Default: Very faint green tint + subtle border
          base: "fill-green-500/10 stroke-green-500/30",
          // Hover: More visible semi-transparent green
          hover: "hover:fill-green-500/40 hover:stroke-green-600",
        };
      case 'Sold':
        return {
          base: "fill-red-500/10 stroke-red-500/30",
          hover: "hover:fill-red-500/40 hover:stroke-red-600",
        };
      default:
        return {
          base: "fill-gray-500/10 stroke-gray-500/30",
          hover: "hover:fill-gray-500/40 hover:stroke-gray-600",
        };
    }
  };

  const colors = getStatusClasses();

  // 2. Combine classes for the final look
  const shapeClassName = `
    cursor-pointer transition-all duration-300 ease-out stroke-1
    
    /* Base & Hover states */
    ${colors.base} ${colors.hover}

    /* SELECTED STATE (Overrides everything else)
       - Uses your 'primary' (Emerald Green) theme color
       - semi-transparent fill (/50)
       - Thicker, solid border (stroke-2)
       - Adds a subtle shadow for a "layered" effect
    */
    ${isSelected ? '!fill-primary/50 !stroke-primary !stroke-2 filter drop-shadow-sm' : ''}
  `
  // Cleans up extra spaces in the class string
  .trim().replace(/\s+/g, ' ');

  // 3. Render as a Rectangle (or Polygon if you add rotation later)
  if (position.rotation) {
    // Logic for rotated plots (if you need it later)
    const cx = position.x + position.width / 2;
    const cy = position.y + position.height / 2;
    return (
      <rect
        x={position.x}
        y={position.y}
        width={position.width}
        height={position.height}
        transform={`rotate(${position.rotation}, ${cx}, ${cy})`}
        className={shapeClassName}
        onClick={() => onSelect(plot)}
      />
    );
  }

  // Standard Rectangle
  return (
    <rect
      x={position.x}
      y={position.y}
      width={position.width}
      height={position.height}
      className={shapeClassName}
      onClick={() => onSelect(plot)}
    />
  );
}