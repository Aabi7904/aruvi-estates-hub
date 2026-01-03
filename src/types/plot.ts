export interface Plot {
  id: string;
  sqft: number;
  status: "Available" | "Sold";
  dimensions: string;
}

export interface PlotPosition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
