import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { ProjectData } from '@/components/admin/ProjectForm';
import { useToast } from '@/hooks/use-toast';
import { PlotStatus } from '@/components/admin/PlotManager'; 

// --- FIREBASE IMPORTS ---
// (auth imports removed, only database imports remain)
import { db } from '@/lib/firebase'; 
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// ---------------------------------------------------------
// 🔐 CHANGE YOUR USERNAME AND PASSWORD HERE
// ---------------------------------------------------------
const ADMIN_EMAIL = "admin@thamizharuvi.com"; 
const ADMIN_PASSWORD = "admin123"; 
// ---------------------------------------------------------

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [loginError, setLoginError] = useState('');
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const { toast } = useToast();

  // 1. CHECK LOCAL STORAGE ON LOAD (PERSISTENCE)
  useEffect(() => {
    const initAuth = async () => {
      // Check browser storage to see if admin logged in previously
      const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
      
      if (isLoggedIn) {
        setIsAuthenticated(true);
        await fetchProjects(); 
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // 2. HELPER: FETCH PROJECTS FROM FIRESTORE
  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectList: any[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectList);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({ title: "Error", description: "Failed to load projects.", variant: "destructive" });
    }
  };

  // 3. HELPER: UPLOAD IMAGE TO CLOUDINARY (WITH OPTIMIZATION)
  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    
    // Ensure this matches your Cloudinary settings exactly
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET || "real_estate_preset";
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    formData.append("upload_preset", uploadPreset);

    if (!cloudName) {
        console.error("Cloud Name is missing. Check .env file.");
        throw new Error("Configuration Error: Cloud Name missing");
    }

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
      );
      
      if (!response.ok) {
        const errData = await response.json();
        console.error("Cloudinary Error Details:", errData);
        throw new Error(`Upload failed: ${errData.error?.message || response.statusText}`);
      }
      
      const data = await response.json();
      
      // 🚀 MAGIC FIX: Add 'f_auto,q_auto' to the URL to instantly compress images
      // This will fix the slow loading speed your client mentioned!
      const optimizedUrl = data.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');
      
      console.log("Image uploaded and optimized successfully:", optimizedUrl);
      return optimizedUrl;
    } catch (error) {
      console.error("Upload function error:", error);
      throw error; 
    }
  };

  // --- HANDLERS ---

  // 🔐 HARDCODED LOGIN LOGIC
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setLoginError('');
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      // Save session to local storage
      localStorage.setItem("isAdminLoggedIn", "true");
      
      toast({ title: 'Welcome back!', description: 'Logged in successfully.' });
      await fetchProjects();
    } else {
      setLoginError('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  const handleLogout = async () => {
    // Clear session from local storage
    localStorage.removeItem("isAdminLoggedIn");
    setIsAuthenticated(false);
    setProjects([]);
    toast({ title: 'Logged out', description: 'See you soon!' });
  };

  // --- UPDATED: HANDLE ADD PROJECT ---
  const handleAddProject = async (data: ProjectData) => {
    setIsLoading(true);
    try {
      console.log("Starting Add Project...");

      // 1. Upload Main Thumbnail
      let imageUrl = data.imageUrl || ""; 
      if (data.imageFile) {
        console.log("Uploading Main Image...");
        imageUrl = await uploadToCloudinary(data.imageFile);
      }

      // 2. Upload Layout / Master Plan Image
      let layoutImageUrl = data.layoutImage || "";
      if (data.layoutFile) {
        console.log("Uploading Layout Image...");
        layoutImageUrl = await uploadToCloudinary(data.layoutFile);
      }

      // 3. --- NEW: Upload Gallery Images ---
      let galleryImageUrls: string[] = [];
      if (data.galleryFiles && data.galleryFiles.length > 0) {
         console.log(`Uploading ${data.galleryFiles.length} gallery images...`);
         const uploadPromises = data.galleryFiles.map(file => uploadToCloudinary(file));
         galleryImageUrls = await Promise.all(uploadPromises);
      }
      
      // Combine newly uploaded images
      const finalGalleryImages = [...(data.galleryImages || []), ...galleryImageUrls];

      // 4. Save to Firestore
      console.log("Saving to Firestore...", finalGalleryImages);
      const docRef = await addDoc(collection(db, "projects"), {
        title: data.title || "Untitled Project",
        location: data.location || "",
        price: data.price || "",
        status: data.status || "Ongoing",
        imageUrl: imageUrl,       
        layoutImage: layoutImageUrl, 
        galleryImages: finalGalleryImages, 
        plots: data.plots || "",
        createdAt: new Date().toISOString()
      });

      const newProject = { 
        ...data, 
        id: docRef.id, 
        imageUrl, 
        layoutImage: layoutImageUrl,
        galleryImages: finalGalleryImages 
      };
      
      setProjects(prev => [...prev, newProject]);
      toast({ title: 'Success', description: 'Project added successfully.' });
    } catch (error) {
      console.error("Add Project Error:", error);
      toast({ title: 'Error', description: 'Failed to add project. Check console.', variant: 'destructive' });
    }
    setIsLoading(false);
  };

  // --- UPDATED: HANDLE EDIT PROJECT ---
  const handleEditProject = async (data: ProjectData) => {
    if (!data.id) return;
    setIsLoading(true);
    
    try {
      console.log("Starting Edit Project...", data);

      // 1. Upload Main Thumbnail (if changed)
      let imageUrl = data.imageUrl;
      if (data.imageFile) {
        console.log("Uploading new Main Image...");
        imageUrl = await uploadToCloudinary(data.imageFile);
      }

      // 2. Upload Layout Image (if changed)
      let layoutImageUrl = data.layoutImage;
      if (data.layoutFile) {
        console.log("Uploading new Layout Image...");
        layoutImageUrl = await uploadToCloudinary(data.layoutFile);
      }

      // 3. --- NEW: Upload New Gallery Images ---
      let newGalleryUrls: string[] = [];
      if (data.galleryFiles && data.galleryFiles.length > 0) {
         console.log(`Uploading ${data.galleryFiles.length} new gallery files...`);
         const uploadPromises = data.galleryFiles.map(file => uploadToCloudinary(file));
         newGalleryUrls = await Promise.all(uploadPromises);
         console.log("New Gallery URLs uploaded:", newGalleryUrls);
      }
      
      // 4. --- MERGE: Combine old retained URLs + New uploaded URLs ---
      const oldGalleryImages = data.galleryImages || []; 
      const finalGalleryImages = [...oldGalleryImages, ...newGalleryUrls];

      console.log("Final Gallery Array to Save:", finalGalleryImages);

      // 5. Update Firestore
      const projectRef = doc(db, "projects", data.id);
      await updateDoc(projectRef, {
        title: data.title || "",
        location: data.location || "",
        price: data.price || "",
        status: data.status || "Ongoing",
        imageUrl: imageUrl || "",
        layoutImage: layoutImageUrl || "",
        galleryImages: finalGalleryImages, 
        plots: data.plots || ""
      });

      // 6. Update Local State (Immediate UI Refresh)
      setProjects(prev => prev.map(p => p.id === data.id ? { 
        ...data, 
        imageUrl, 
        layoutImage: layoutImageUrl,
        galleryImages: finalGalleryImages
      } : p));
      
      toast({ title: 'Updated', description: 'Project updated successfully.' });

    } catch (error) {
      console.error("Edit Project Error:", error);
      toast({ 
        title: 'Error', 
        description: 'Failed to update project. Check console for details.', 
        variant: 'destructive' 
      });
    }
    setIsLoading(false);
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteDoc(doc(db, "projects", id));
      setProjects(prev => prev.filter(p => p.id !== id));
      toast({ title: 'Deleted', description: 'Project removed.', variant: 'destructive' });
    } catch (error) {
      console.error("Delete error:", error);
      toast({ title: 'Error', description: 'Failed to delete project.', variant: 'destructive' });
    }
  };

  // --- NEW HANDLER: UPDATE PLOT STATUSES ---
  const handleUpdatePlots = async (projectId: string, plots: PlotStatus[]) => {
    setIsLoading(true);
    try {
      const projectRef = doc(db, "projects", projectId);
      
      await updateDoc(projectRef, {
        plotStatuses: plots
      });

      setProjects(prev => prev.map(p => 
        p.id === projectId ? { ...p, plotStatuses: plots } : p
      ));

      toast({ title: 'Success', description: 'Plot statuses updated.' });
    } catch (error) {
      console.error("Error updating plots:", error);
      toast({ title: 'Error', description: 'Failed to update plots.', variant: 'destructive' });
    }
    setIsLoading(false);
  };

  if (isLoading && !isAuthenticated && !loginError) {
      return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Admin Panel | Thamizh Aruvi Real Estate</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {isAuthenticated ? (
        <AdminDashboard
          onLogout={handleLogout}
          projects={projects}
          onAddProject={handleAddProject}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
          onUpdatePlots={handleUpdatePlots} 
        />
      ) : (
        <AdminLogin
          onLogin={handleLogin}
          isLoading={isLoading}
          error={loginError}
        />
      )}
    </>
  );
};

export default Admin;