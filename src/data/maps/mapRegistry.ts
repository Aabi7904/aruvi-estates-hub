import { Plot } from "@/types/plot";
// Adjust these import paths if your files are in different folders
import { plotsData, plotPositions } from "./plotData"; 
import { amuthaPlots, amuthaPositions } from "./amuthaSurabiData";
import amuthaMapImage from "../../assets/Amutha Surabi Nagar-images-1.jpg";
import { highwayPlots, highwayPositions } from "./sivanmalai3";
import highwayMapImage from "../../assets/sivanmalai3layout.png";
import { raghavendraPlots, raghavendraPositions } from "./raghavendra";
import raghavendraMapImage from "../../assets/raghavendralayout.png";
import { semozhinagarPlots, semozhinagarPositions } from "./semozhinagar";
import semozhi from "../../assets/semozhilayout.jpg"
import { sivanmalai2plotPlots, sivanmalai2plotPositions } from "./sivanmalai2plot";
import sivanmalai2plotMapImage from "../../assets/sivanmalai2layout.png";
import aaavenue from "../../assets/aa-avenue-masterplan.jpg"
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
  // AA Avenue
  "wXW9gKJ5p8dmEmWiv8wu": { 
    id: "wXW9gKJ5p8dmEmWiv8wu",
    dimensions: { width: 3628, height: 2628 }, 
    plots: plotsData,
    positions: plotPositions,
    imageSrc:aaavenue
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
    positions: highwayPositions,// sivanmalai 3 tha highwaycity nu potrukommm da 
    imageSrc: highwayMapImage // Use the local image for perfect alignment
  },
  "R4pHJ7IbBMchIfz8ZyIh": { 
    id: "R4pHJ7IbBMchIfz8ZyIh",
    dimensions: { width: 2091, height: 1402 }, // Match Figma Frame size
    plots: raghavendraPlots,
    positions: raghavendraPositions,
    imageSrc: raghavendraMapImage // Use the local image for perfect alignment
  },
  "1BVA8zOITcXt5Mzv6l5H": { 
    id: "1BVA8zOITcXt5Mzv6l5H",
    dimensions: { width: 4962, height: 3508 }, // Match Figma Frame size
    plots: semozhinagarPlots,
    positions: semozhinagarPositions,
    imageSrc: semozhi // Use the local image for perfect alignment
  },
  "bzs0bscfPMPEg6qjhOZq": { 
    id: "bzs0bscfPMPEg6qjhOZq",
    dimensions: { width: 2180, height: 1524 }, // Match Figma Frame size
    plots: sivanmalai2plotPlots,
    positions: sivanmalai2plotPositions,
    imageSrc: sivanmalai2plotMapImage // Use the local image for perfect alignment
  }
};

// 3. Helper to fetch data
export const getMapData = (projectId: string): ProjectMapData | null => {
  return mapRegistry[projectId] || null;
};