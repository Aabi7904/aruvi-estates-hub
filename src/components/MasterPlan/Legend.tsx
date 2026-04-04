export function Legend() {
  return (
    <div className="absolute bottom-4 left-4 z-10 bg-card/95 backdrop-blur-sm rounded-lg shadow-lg border border-border p-4">
      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">Legend</h3>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: 'rgba(34, 197, 94, 0.4)', border: '2px solid rgb(34, 197, 94)' }}
          />
          <span className="text-sm text-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: 'rgba(239, 68, 68, 0.4)', border: '2px solid rgb(239, 68, 68)' }}
          />
          <span className="text-sm text-foreground">Sold</span>
        </div>
      </div>
    </div>
  );
}