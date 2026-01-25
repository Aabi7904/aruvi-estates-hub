import { Plot } from "@/types/plot";
import { PlotPosition } from "@/data/maps/mapRegistry"; 

interface PlotShapeProps {
  plot: Plot;
  position: PlotPosition;
  isSelected: boolean;
  onSelect: (plot: Plot) => void;
}

export function PlotShape({ plot, position, isSelected, onSelect }: PlotShapeProps) {
  
  // 1. Define color schemes
  const getStatusClasses = () => {
    switch (plot.status) {
      case 'Available':
        return {
          base: "fill-green-500/20 stroke-green-500/50",
          hover: "hover:fill-green-500/40 hover:stroke-green-600",
        };
      case 'Sold':
        return {
          base: "fill-red-500/20 stroke-red-500/50",
          hover: "hover:fill-red-500/40 hover:stroke-red-600",
        };
      default:
        return {
          base: "fill-gray-500/20 stroke-gray-500/50",
          hover: "hover:fill-gray-500/40 hover:stroke-gray-600",
        };
    }
  };

  const colors = getStatusClasses();

  // 2. Combine classes
  const shapeClassName = `
    cursor-pointer transition-all duration-300 ease-out stroke-1
    ${colors.base} ${colors.hover}
    ${isSelected ? '!fill-primary/60 !stroke-primary !stroke-[3px] filter drop-shadow-md' : ''}
  `.trim().replace(/\s+/g, ' ');

  // ---------------------------------------------------------
  // 🆕 OPTION A: Render SVG PATH (From Figma)
  // ---------------------------------------------------------
  if (position.path) {
    // If X and Y are provided, we translate (move) the shape to that spot
    const transform = (position.x !== undefined && position.y !== undefined)
      ? `translate(${position.x}, ${position.y})`
      : undefined;

    return (
      <path
        d={position.path}
        transform={transform}
        className={shapeClassName}
        onClick={() => onSelect(plot)}
      />
    );
  }

  // ---------------------------------------------------------
  // OPTION B: Polygon (Fallback)
  // ---------------------------------------------------------
  if (position.points) {
    return (
      <polygon
        points={position.points}
        className={shapeClassName}
        onClick={() => onSelect(plot)}
      />
    );
  }

  // ---------------------------------------------------------
  // OPTION C: Rectangle (Fallback)
  // ---------------------------------------------------------
  if (position.width !== undefined && position.height !== undefined && position.x !== undefined && position.y !== undefined) {
     const cx = position.x + position.width / 2;
     const cy = position.y + position.height / 2;
     return (
        <rect
          x={position.x}
          y={position.y}
          width={position.width}
          height={position.height}
          transform={position.rotation ? `rotate(${position.rotation}, ${cx}, ${cy})` : undefined}
          className={shapeClassName}
          onClick={() => onSelect(plot)}
        />
     );
  }

  return null;
}