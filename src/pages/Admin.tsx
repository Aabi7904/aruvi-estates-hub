import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { ProjectData } from '@/components/admin/ProjectForm';
import { useToast } from '@/hooks/use-toast';

// --- FIREBASE IMPORTS ---
import { auth, db } from '@/lib/firebase'; 
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [loginError, setLoginError] = useState('');
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const { toast } = useToast();

  // 1. CHECK AUTH STATUS & FETCH DATA ON LOAD
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        fetchProjects(); 
      } else {
        setIsAuthenticated(false);
        setProjects([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
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

  // 3. HELPER: UPLOAD IMAGE TO CLOUDINARY
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
      console.log("Image uploaded successfully:", data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("Upload function error:", error);
      throw error; 
    }
  };

  // --- HANDLERS ---

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: 'Welcome back!', description: 'Logged in successfully.' });
    } catch (error: any) {
      console.error("Login error:", error);
      setLoginError(error.message || 'Invalid email or password');
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: 'Logged out', description: 'See you soon!' });
    } catch (error) {
      console.error("Logout error", error);
    }
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
        galleryImages: finalGalleryImages, // <--- Save Gallery Array
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
         // Using Promise.all ensures we get all URLs before proceeding
         newGalleryUrls = await Promise.all(uploadPromises);
         console.log("New Gallery URLs uploaded:", newGalleryUrls);
      }
      
      // 4. --- MERGE: Combine old retained URLs + New uploaded URLs ---
      // IMPORTANT: Explicitly use empty array fallback to prevent crashes
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
        galleryImages: finalGalleryImages, // <--- Correctly saves the merged array
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
      // More descriptive error toast
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