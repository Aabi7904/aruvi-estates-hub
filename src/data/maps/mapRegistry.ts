import { Plot } from "@/types/plot";
// Adjust these import paths if your files are in different folders
import { plotsData as semmozhiPlots, plotPositions as semmozhiPositions } from "./plotData"; 
import { amuthaPlots, amuthaPositions } from "./amuthaSurabiData";
import amuthaMapImage from "../../assets/Amutha Surabi Nagar-images-1.jpg";
import { highwayPlots, highwayPositions } from "./sivanmalai3";
import highwayMapImage from "../../assets/sivanmalai3layout.png";
// 1. Define the Types
export interface PlotPosition {
  id: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rotation?: number;
  
  // 🆕 NEW FIELD: For Figma SVG paths
  path?: string; 
  
  // Keep points for backward compatibility (if you use polygons elsewhere)
  points?: string; 
}

export interface ProjectMapData {
  id: string;             
  dimensions: {           
    width: number;
    height: number;
  };
  plots: Plot[];          
  positions: PlotPosition[]; 
  imageSrc?: string;
}

// 2. Create the Registry
const mapRegistry: Record<string, ProjectMapData> = {
  // Semmozhi Nagar
  "wXW9gKJ5p8dmEmWiv8wu": { 
    id: "wXW9gKJ5p8dmEmWiv8wu",
    dimensions: { width: 3628, height: 2628 }, 
    plots: semmozhiPlots,
    positions: semmozhiPositions
  },

  // Amutha Surabi Nagar
 "ZQGvR6X1m1BQF9SankfO": { 
    id: "ZQGvR6X1m1BQF9SankfO",
    // ⚠️ Ensure these dimensions match your Figma Frame size exactly!
    dimensions: { width: 5056, height: 2889 }, 
    plots: amuthaPlots,
    positions: amuthaPositions,
    imageSrc: amuthaMapImage
  },
  "wzgKhBjkiOGW2gXmSvQX": { 
    id: "wzgKhBjkiOGW2gXmSvQX",
    dimensions: { width: 2183, height: 1541 }, // Match Figma Frame size
    plots: highwayPlots,
    positions: highwayPositions,
    imageSrc: highwayMapImage // Use the local image for perfect alignment
  }
};

// 3. Helper to fetch data
export const getMapData = (projectId: string): ProjectMapData | null => {
  return mapRegistry[projectId] || null;
};