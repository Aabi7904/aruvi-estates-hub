import { useState } from "react";
import { Search, CheckCircle2 } from "lucide-react";
import { Plot } from "@/types/plot";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  selectedPlot: Plot | null;
  onSearch: (plotId: string) => void;
}

export function TopBar({ selectedPlot, onSearch }: TopBarProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
      setSearchValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="bg-card shadow-md border-b border-border">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
           
            <div>
              <h1 className="text-lg font-semibold text-foreground">Layout Plan</h1>
              <p className="text-s text-muted-foreground">Click on any plot to view details or check availability.</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Input
                type="text"
                placeholder="Enter Plot No (e.g., 5)"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full sm:w-56 pl-4 pr-4 h-10 bg-background border-border focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="h-10 px-4 bg-primary hover:bg-primary/90"
            >
              <Search className="w-4 h-4 mr-2" />
              Find
            </Button>
          </div>

          {/* Selected Plot Details */}
          <div className="flex items-center gap-6 min-h-[40px]">
            {selectedPlot ? (
              <div className="flex items-center gap-6 animate-fade-in">
                <div className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-available" />
                  <span className="text-sm font-medium">Plot No: {selectedPlot.id}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-available" />
                  <span className="text-sm font-medium">
                    Area: {selectedPlot.sqft.toLocaleString()} Sq.ft
                  </span>
                </div>
                <span
  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white shadow-sm ${
    selectedPlot.status === "Available"
      ? "bg-green-600"  // Solid Green for Available
      : "bg-red-600"    // Solid Red for Sold
  }`}
>
  {selectedPlot.status}
</span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Select a plot to view details
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
