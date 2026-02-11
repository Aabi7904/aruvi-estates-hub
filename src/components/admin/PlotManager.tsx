// src/components/admin/PlotManager.tsx
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, RefreshCw, Save } from 'lucide-react';
import { ProjectData } from './ProjectForm';

// Define the shape of our Plot Status
export interface PlotStatus {
  id: string;
  status: 'Available' | 'Sold' | 'Reserved';
}

interface PlotManagerProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectData | null;
  onSave: (projectId: string, plots: PlotStatus[]) => void;
  isSaving: boolean;
}

const PlotManager = ({ isOpen, onClose, project, onSave, isSaving }: PlotManagerProps) => {
  const [plots, setPlots] = useState<PlotStatus[]>([]);
  const [startNum, setStartNum] = useState('');
  const [endNum, setEndNum] = useState('');

  // Load existing plots when opening
  useEffect(() => {
    if (project && project.plotStatuses) {
      setPlots(project.plotStatuses);
    } else {
      setPlots([]);
    }
  }, [project, isOpen]);

  // Toggle Status: Available -> Sold -> Reserved -> Available
  const toggleStatus = (id: string) => {
    setPlots(prev => prev.map(p => {
      if (p.id === id) {
        if (p.status === 'Available') return { ...p, status: 'Sold' };
        if (p.status === 'Sold') return { ...p, status: 'Reserved' };
        return { ...p, status: 'Available' };
      }
      return p;
    }));
  };

  // Bulk Add Plots (e.g., 1 to 50)
  const handleBulkAdd = () => {
    const start = parseInt(startNum);
    const end = parseInt(endNum);

    if (!isNaN(start) && !isNaN(end) && end >= start) {
      const newPlots: PlotStatus[] = [];
      const currentIds = new Set(plots.map(p => p.id));

      for (let i = start; i <= end; i++) {
        const idStr = i.toString();
        // Only add if it doesn't exist
        if (!currentIds.has(idStr)) {
          newPlots.push({ id: idStr, status: 'Available' });
        }
      }
      // Sort numerically
      const combined = [...plots, ...newPlots].sort((a, b) => parseInt(a.id) - parseInt(b.id));
      setPlots(combined);
      setStartNum('');
      setEndNum('');
    }
  };

  const handleSave = () => {
    if (project?.id) {
      onSave(project.id, plots);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sold': return 'bg-red-500 hover:bg-red-600';
      case 'Reserved': return 'bg-orange-500 hover:bg-orange-600';
      default: return 'bg-green-500 hover:bg-green-600';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Manage Plots: {project?.title}</DialogTitle>
          <DialogDescription>
            Add plot numbers and click them to toggle status (Available / Sold).
          </DialogDescription>
        </DialogHeader>

        {/* Bulk Add Controls */}
        <div className="flex items-end gap-3 py-4 border-b">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="start">Start Plot #</Label>
            <Input type="number" id="start" value={startNum} onChange={(e) => setStartNum(e.target.value)} placeholder="1" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="end">End Plot #</Label>
            <Input type="number" id="end" value={endNum} onChange={(e) => setEndNum(e.target.value)} placeholder="10" />
          </div>
          <Button onClick={handleBulkAdd} variant="secondary">
            <Plus className="w-4 h-4 mr-2" /> Generate
          </Button>
        </div>

        {/* Plots Grid */}
        <ScrollArea className="flex-1 p-4 border rounded-md bg-gray-50">
          {plots.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              No plots added yet. Use the generator above.
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
              {plots.map((plot) => (
                <div 
                  key={plot.id}
                  onClick={() => toggleStatus(plot.id)}
                  className={`
                    cursor-pointer p-2 rounded-lg text-center text-white text-xs font-bold shadow-sm transition-all transform hover:scale-105
                    ${getStatusColor(plot.status)}
                  `}
                >
                  <div className="text-[10px] opacity-80 uppercase">{plot.status}</div>
                  <div className="text-lg">{plot.id}</div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <DialogFooter className="mt-4 gap-2">
          <Button variant="outline" onClick={() => setPlots([])}>
             <Trash2 className="w-4 h-4 mr-2" /> Clear All
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlotManager;