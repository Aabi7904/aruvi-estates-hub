// src/data/plotData.ts
import { Plot } from "@/types/plot"; // Import the law
export interface PlotPosition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number; // Optional if you need to rotate rectangles later
}

// These match your Figma "Rectangle" properties
export const plotPositions: PlotPosition[] = [
  {
    id: "1",
    x: 743,     // From your Figma screenshot
    y: 1005,    // From your Figma screenshot
    width: 242, // From your Figma screenshot
    height: 371 // From your Figma screenshot
  },
  {
    id: "2",
    x: 988,     // From your Figma screenshot
    y: 1006,    // From your Figma screenshot
    width: 242, // From your Figma screenshot
    height: 370 // From your Figma screenshot
  },
  {
    id: "3",
    x: 736,     // From your Figma screenshot
    y: 876,    // From your Figma screenshot
    width: 492, // From your Figma screenshot
    height: 129 // From your Figma screenshot
  },
  {
    id: "4",
    x: 559,     // From your Figma screenshot
    y: 740,    // From your Figma screenshot
    width: 673, // From your Figma screenshot
    height: 132
    // From your Figma screenshot
  },
  {
    id: "5",
    x: 1431,     // From your Figma screenshot
    y: 735,    // From your Figma screenshot
    width: 197, // From your Figma screenshot
    height: 298// From your Figma screenshot
  },
  {
    id: "6",
    x: 1631,     // From your Figma screenshot
    y: 734,    // From your Figma screenshot
    width: 197, // From your Figma screenshot
    height: 298 // From your Figma screenshot
  },
  {
    id: "7",
    x: 1829,     // From your Figma screenshot
    y: 734,    // From your Figma screenshot
    width: 197, // From your Figma screenshot
    height: 298 // From your Figma screenshot
  },
  {
    id: "8",
    x: 2027,     // From your Figma screenshot
    y: 732,    // From your Figma screenshot
    width: 197, // From your Figma screenshot
    height: 298 // From your Figma screenshot
  },
  {
    id: "9",
    x: 2227,     // From your Figma screenshot
    y: 731,    // From your Figma screenshot
    width: 197, // From your Figma screenshot
    height: 298// From your Figma screenshot
  },
  {
    id: "10",
    x: 2425,     // From your Figma screenshot
    y: 728,    // From your Figma screenshot
    width: 198, // From your Figma screenshot
    height: 304// From your Figma screenshot
  },
  {
    id: "11",
    x: 2625,     // From your Figma screenshot
    y: 725,    // From your Figma screenshot
    width: 129, // From your Figma screenshot
    height: 307// From your Figma screenshot
  },

  {
    id: "12",
    x: 2755,     // From your Figma screenshot
    y: 725,    // From your Figma screenshot
    width: 207, // From your Figma screenshot
    height: 307// From your Figma screenshot
  },
  {
    id: "13",
    x: 2757,     // From your Figma screenshot
    y: 1190,    // From your Figma screenshot
    width: 205, // From your Figma screenshot
    height: 330// From your Figma screenshot
  },
  {
    id: "14",
    x: 2622,     // From your Figma screenshot
    y: 1189,    // From your Figma screenshot
    width: 132, // From your Figma screenshot
    height: 331// From your Figma screenshot
  },
  {
    id: "15",
    x: 2490,     // From your Figma screenshot
    y: 1190,    // From your Figma screenshot
    width: 132, // From your Figma screenshot
    height: 330// From your Figma screenshot
  },
  {
    id: "16",
    x: 2356,     // From your Figma screenshot
    y: 1189,    // From your Figma screenshot
    width: 134, // From your Figma screenshot
    height: 331// From your Figma screenshot
  },
  {
    id: "17",
    x: 2220,     // From your Figma screenshot
    y: 1189,    // From your Figma screenshot
    width: 136, // From your Figma screenshot
    height: 336// From your Figma screenshot
  },
  {
    id: "18",
    x: 2092,     // From your Figma screenshot
    y: 1190,    // From your Figma screenshot
    width: 128, // From your Figma screenshot
    height: 335// From your Figma screenshot
  },
  {
    id: "19",
    x: 1960,     // From your Figma screenshot
    y: 1188,    // From your Figma screenshot
    width: 132, // From your Figma screenshot
    height: 337// From your Figma screenshot
  },
  {
    id: "20",
    x: 1827,     // From your Figma screenshot
    y: 1189,    // From your Figma screenshot
    width: 133, // From your Figma screenshot
    height: 336// From your Figma screenshot
  },
  {
    id: "21",
    x: 1699,     // From your Figma screenshot
    y: 1190,    // From your Figma screenshot
    width: 128, // From your Figma screenshot
    height: 340// From your Figma screenshot
  },
  {
    id: "22",
    x: 1567,     // From your Figma screenshot
    y: 1191,    // From your Figma screenshot
    width: 132, // From your Figma screenshot
    height: 339// From your Figma screenshot
  },
  {
    id: "23",
    x: 1432,     // From your Figma screenshot
    y: 1191,    // From your Figma screenshot
    width: 135, // From your Figma screenshot
    height: 339// From your Figma screenshot
  },

  // Add Plot 2, 3, etc. here later...
];

// Ensure your main data array has a matching ID "1"
export const plotsData: Plot[] = [
  {
    id: "1",
    sqft: 2053.50,
    status: "Sold",
    dimensions: "37' x 55'7\""
  },
  {
    id: "2",
    sqft: 2041.00,
    status: "Sold",
    dimensions: "37' x 55'7\""
  },
  {
    id: "3",
    sqft: 1480.00,
    status: "Sold",
    dimensions: "37' x 55'7\""
  },
  {
    id: "4",
    sqft: 1987.00,
    status: "Sold",
    dimensions: "37' x 55'7\""
  },

  {
    id: "5",
    sqft: 1318.75,
    status: "Sold",
    dimensions: "37' x 55'7\""
  },

  {
    id: "6",
    sqft: 1338.75,
    status: "Available",
    dimensions: "37' x 55'7\""
  },

  {
    id: "7",
    sqft: 1350.00,
    status: "Available",
    dimensions: "37' x 55'7\""
  },

  {
    id: "8",
    sqft: 1362.25,
    status: "Available",
    dimensions: "37' x 55'7\""
  },

  {
    id: "9",
    sqft: 1368.75,
    status: "Available",
    dimensions: "37' x 55'7\""
  },
  {
    id: "10",
    sqft: 1376.25,
    status: "Available",
    dimensions: "37' x 55'7\""
  },
  {
    id: "11",
    sqft: 920.00,
    status: "Available",
    dimensions: "37' x 55'7\""
  },
  {
    id: "12",
    sqft: 1304.00,
    status: "Available",
    dimensions: "37' x 55'7\""
  },
  {
    id: "13",
    sqft: 1418.00,
    status: "Available",
    dimensions: "37' x 55'7\""
  },
  {
    id: "14",
    sqft: 1000.00,
    status: "Available",
    dimensions: "37' x 55'7\""
  },
  {
    id: "15",
    sqft: 1000.00,
    status: "Available",
    dimensions: "37' x 55'7\""
  },
  {
    id: "16",
    sqft: 1000.00,
    status: "Available",
    dimensions: "37' x 55'7\""
  },
  {
    id: "17",
    sqft: 1000.00,
    status: "Available",
    dimensions: "37' x 55'7\""
  },
  {
    id: "18",
    sqft: 1000.00,
    status: "Available",
    dimensions: "37' x 55'7\""
  },

  {
    id: "19",
    sqft: 1000.00,
    status: "Available",
    dimensions: "37' x 55'7\""
  },
  {
    id: "20",
    sqft: 1000.00,
    status: "Available",
    dimensions: "37' x 55'7\""
  },
  {
    id: "21",
    sqft: 1000.00,
    status: "Available",
    dimensions: "37' x 55'7\""
  },
  {
    id: "22",
    sqft: 1000.00,
    status: "Available",
    dimensions: "37' x 55'7\""
  },
  {
    id: "23",
    sqft: 987.50,
    status: "Sold",
    dimensions: "37' x 55'7\""
  },



  // ... other plots
];