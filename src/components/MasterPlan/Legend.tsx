export function Legend() {
  return (
    <div className="absolute bottom-4 left-4 z-10 bg-card/95 backdrop-blur-sm rounded-lg shadow-lg border border-border p-4">
      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">Legend</h3>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-available/40 border-2 border-available" />
          <span className="text-sm text-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-sold/40 border-2 border-sold" />
          <span className="text-sm text-foreground">Sold</span>
        </div>
      </div>
    </div>
  );
}
