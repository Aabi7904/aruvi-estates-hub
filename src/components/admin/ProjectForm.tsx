import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload, X, Map as MapIcon } from 'lucide-react';

export interface ProjectData {
  id?: string;
  title: string;
  location: string;
  price: string;
  status: 'ongoing' | 'completed';
  features: string;
  
  // Main Project Image
  imageFile?: File | null;
  imageUrl?: string;

  // Master Plan / Layout Image (NEW)
  layoutFile?: File | null;
  layoutImage?: string;
  
  plots?: string; // Optional: If you want to store plot data string directly
}

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectData) => void;
  initialData?: ProjectData | null;
  isLoading?: boolean;
}

const defaultFormData: ProjectData = {
  title: '',
  location: 'Tiruvannamalai',
  price: '',
  status: 'ongoing',
  features: '',
  imageFile: null,
  layoutFile: null,
};

const ProjectForm = ({ open, onClose, onSubmit, initialData, isLoading = false }: ProjectFormProps) => {
  const [formData, setFormData] = useState<ProjectData>(defaultFormData);
  
  // Previews for both images
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [layoutPreview, setLayoutPreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      
      // Set Main Image Preview
      if (initialData.imageUrl) {
        setImagePreview(initialData.imageUrl);
      }
      // Set Layout Image Preview
      if (initialData.layoutImage) {
        setLayoutPreview(initialData.layoutImage);
      }
    } else {
      setFormData(defaultFormData);
      setImagePreview(null);
      setLayoutPreview(null);
    }
  }, [initialData, open]);

  const handleChange = (field: keyof ProjectData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- MAIN IMAGE HANDLERS ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, imageFile: null, imageUrl: undefined }));
    setImagePreview(null);
  };

  // --- LAYOUT IMAGE HANDLERS (NEW) ---
  const handleLayoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, layoutFile: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setLayoutPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLayout = () => {
    setFormData(prev => ({ ...prev, layoutFile: null, layoutImage: undefined }));
    setLayoutPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isEditing = !!initialData?.id;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update the project details below.' : 'Fill in the details to add a new project.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          
          {/* --- BASIC INFO --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                id="title"
                placeholder="e.g., Sunrise Valley Phase 2"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                id="location"
                placeholder="Tiruvannamalai"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                id="price"
                placeholder="e.g., Starts at 5 Lakhs"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                value={formData.status}
                onValueChange={(value: 'ongoing' | 'completed') => handleChange('status', value)}
                >
                <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
                </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Features (comma-separated)</Label>
            <Textarea
              id="features"
              placeholder="e.g., DTCP Approved, RERA Registered, 24/7 Security"
              value={formData.features}
              onChange={(e) => handleChange('features', e.target.value)}
              rows={2}
            />
          </div>

          {/* --- IMAGE UPLOADS SECTION --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-border">
            
            {/* 1. Main Project Thumbnail */}
            <div className="space-y-2">
                <Label>Main Project Image</Label>
                {imagePreview ? (
                <div className="relative group">
                    <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg border border-border"
                    />
                    <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-opacity"
                    >
                    <X className="w-3 h-3" />
                    </button>
                </div>
                ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors">
                    <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                    <span className="text-xs text-muted-foreground">Main Thumbnail</span>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    />
                </label>
                )}
            </div>

            {/* 2. Master Plan / Layout Image (NEW) */}
            <div className="space-y-2">
                <Label className="flex items-center gap-2">
                    <MapIcon className="w-4 h-4 text-secondary" />
                    Master Plan / Layout
                </Label>
                {layoutPreview ? (
                <div className="relative group">
                    <img
                    src={layoutPreview}
                    alt="Layout Preview"
                    className="w-full h-32 object-contain bg-gray-50 rounded-lg border border-border"
                    />
                    <button
                    type="button"
                    onClick={removeLayout}
                    className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-opacity"
                    >
                    <X className="w-3 h-3" />
                    </button>
                </div>
                ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors">
                    <MapIcon className="w-6 h-6 text-muted-foreground mb-2" />
                    <span className="text-xs text-muted-foreground">Upload Layout Map</span>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleLayoutChange}
                    className="hidden"
                    />
                </label>
                )}
            </div>

          </div>

          <div className="flex gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? 'Saving...' : isEditing ? 'Update Project' : 'Add Project'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectForm;