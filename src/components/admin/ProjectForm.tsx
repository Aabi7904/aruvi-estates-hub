import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImagePlus, Map, X, Loader2, Images, Trash2 } from 'lucide-react';

export interface ProjectData {
  id?: string;
  title: string;
  location: string;
  price: string;
  status: string;
  imageUrl?: string;
  imageFile?: File;
  layoutImage?: string;
  layoutFile?: File;
  // --- ADDED: Gallery Fields ---
  galleryImages?: string[]; // Array of URLs (existing images)
  galleryFiles?: File[];    // Array of Files (new uploads)
  plots?: string; 
}

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectData) => void;
  initialData?: ProjectData | null;
  isSubmitting?: boolean;
}

const ProjectForm = ({ isOpen, onClose, onSubmit, initialData, isSubmitting = false }: ProjectFormProps) => {
  const [formData, setFormData] = useState<ProjectData>({
    title: '',
    location: '',
    price: '',
    status: 'Ongoing',
    imageUrl: '',
    layoutImage: '',
    galleryImages: [], // Initialize empty
    galleryFiles: [],  // Initialize empty
    plots: '' 
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [layoutPreview, setLayoutPreview] = useState<string>('');
  
  // --- ADDED: State for new gallery file previews ---
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        galleryImages: initialData.galleryImages || [],
        galleryFiles: [],
      });
      setImagePreview(initialData.imageUrl || '');
      setLayoutPreview(initialData.layoutImage || '');
      setGalleryPreviews([]); // Reset new file previews on edit load
    } else {
      setFormData({
        title: '',
        location: '',
        price: '',
        status: 'Ongoing',
        imageUrl: '',
        layoutImage: '',
        galleryImages: [],
        galleryFiles: [],
        plots: ''
      });
      setImagePreview('');
      setLayoutPreview('');
      setGalleryPreviews([]);
    }
  }, [initialData, isOpen]);

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      galleryPreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [galleryPreviews]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, status: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'layout') => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (field === 'image') {
        setFormData(prev => ({ ...prev, imageFile: file }));
        setImagePreview(previewUrl);
      } else {
        setFormData(prev => ({ ...prev, layoutFile: file }));
        setLayoutPreview(previewUrl);
      }
    }
  };

  // --- ADDED: Handle Multiple Gallery Uploads ---
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));

      setFormData(prev => ({
        ...prev,
        galleryFiles: [...(prev.galleryFiles || []), ...newFiles]
      }));

      setGalleryPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  // --- ADDED: Remove Existing Gallery Image (URL) ---
  const removeExistingGalleryImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages?.filter((_, index) => index !== indexToRemove)
    }));
  };

  // --- ADDED: Remove New Gallery File (File + Preview) ---
  const removeNewGalleryImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      galleryFiles: prev.galleryFiles?.filter((_, index) => index !== indexToRemove)
    }));
    setGalleryPreviews(prev => {
      const newPreviews = prev.filter((_, index) => index !== indexToRemove);
      // Revoke the URL of the removed item to free memory
      URL.revokeObjectURL(prev[indexToRemove]); 
      return newPreviews;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Project' : 'Add New Project'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Sunrise Valley Phase 2"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Tiruvannamalai"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                placeholder="e.g., Starts at 5 Lakhs"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select value={formData.status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main Image Upload */}
            <div className="space-y-2">
              <Label>Main Project Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors relative h-40 flex items-center justify-center">
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-contain rounded-md" 
                    />
                    <button 
                      type="button"
                      onClick={() => { setImagePreview(''); setFormData(prev => ({ ...prev, imageUrl: '', imageFile: undefined })); }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                    <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Main Thumbnail</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleImageChange(e, 'image')} 
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Layout Image Upload */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Map className="w-4 h-4 text-orange-500" /> 
                Master Plan / Layout
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors relative h-40 flex items-center justify-center">
                {layoutPreview ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={layoutPreview} 
                      alt="Layout Preview" 
                      className="w-full h-full object-contain rounded-md" 
                    />
                    <button 
                      type="button"
                      onClick={() => { setLayoutPreview(''); setFormData(prev => ({ ...prev, layoutImage: '', layoutFile: undefined })); }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                    <Map className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Upload Layout Map</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleImageChange(e, 'layout')} 
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* --- ADDED: Gallery Section --- */}
          <div className="space-y-3 pt-2 border-t">
            <Label className="flex items-center gap-2 text-base font-semibold">
              <Images className="w-5 h-5 text-blue-500" />
              Project Gallery
            </Label>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-2">
               {/* 1. Show Existing Images (from backend) */}
               {formData.galleryImages && formData.galleryImages.map((url, index) => (
                <div key={`existing-${index}`} className="relative group aspect-square rounded-lg border overflow-hidden">
                  <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingGalleryImage(index)}
                    className="absolute top-1 right-1 bg-red-500/90 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {/* 2. Show New Upload Previews */}
              {galleryPreviews.map((url, index) => (
                <div key={`new-${index}`} className="relative group aspect-square rounded-lg border overflow-hidden">
                  <img src={url} alt={`New Upload ${index}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeNewGalleryImage(index)}
                    className="absolute top-1 right-1 bg-red-500/90 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {/* 3. Add Button */}
              <label className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center aspect-square hover:bg-gray-50 hover:border-blue-400 transition-colors">
                <ImagePlus className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-500 mt-1">Add Photos</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  className="hidden" 
                  onChange={handleGalleryChange}
                />
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary-dark" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData ? 'Update Project' : 'Add Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectForm;