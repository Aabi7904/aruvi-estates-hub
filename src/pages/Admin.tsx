import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
// Ensure your ProjectForm exports this interface, or update it locally if needed
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
        console.error("Cloudinary Error:", errData);
        throw new Error(`Upload failed: ${errData.error?.message || response.statusText}`);
      }
      
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Upload failed:", error);
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

  const handleAddProject = async (data: ProjectData) => {
    setIsLoading(true);
    try {
      // 1. Upload Main Thumbnail
      let imageUrl = data.imageUrl || ""; 
      if (data.imageFile) {
        imageUrl = await uploadToCloudinary(data.imageFile);
      }

      // 2. Upload Layout / Master Plan Image (NEW)
      let layoutImageUrl = data.layoutImage || "";
      if (data.layoutFile) {
        layoutImageUrl = await uploadToCloudinary(data.layoutFile);
      }

      const docRef = await addDoc(collection(db, "projects"), {
        title: data.title,
        location: data.location,
        price: data.price,
        status: data.status,
        features: data.features,
        imageUrl: imageUrl,       // Main Image
        layoutImage: layoutImageUrl, // Master Plan Image
        plots: data.plots || "",
        createdAt: new Date().toISOString()
      });

      const newProject = { ...data, id: docRef.id, imageUrl, layoutImage: layoutImageUrl };
      setProjects(prev => [...prev, newProject]);

      toast({ title: 'Success', description: 'Project added successfully.' });
    } catch (error) {
      console.error("Add error:", error);
      toast({ title: 'Error', description: 'Failed to add project.', variant: 'destructive' });
    }
    setIsLoading(false);
  };

  const handleEditProject = async (data: ProjectData) => {
    if (!data.id) return;
    setIsLoading(true);
    try {
      // 1. Upload Main Thumbnail (if changed)
      let imageUrl = data.imageUrl;
      if (data.imageFile) {
        imageUrl = await uploadToCloudinary(data.imageFile);
      }

      // 2. Upload Layout Image (if changed)
      let layoutImageUrl = data.layoutImage;
      if (data.layoutFile) {
        layoutImageUrl = await uploadToCloudinary(data.layoutFile);
      }

      const projectRef = doc(db, "projects", data.id);
      await updateDoc(projectRef, {
        title: data.title,
        location: data.location,
        price: data.price,
        status: data.status,
        features: data.features,
        imageUrl: imageUrl,
        layoutImage: layoutImageUrl,
        plots: data.plots || ""
      });

      setProjects(prev => prev.map(p => p.id === data.id ? { ...data, imageUrl, layoutImage: layoutImageUrl } : p));
      toast({ title: 'Updated', description: 'Project updated successfully.' });

    } catch (error) {
      console.error("Edit error:", error);
      toast({ title: 'Error', description: 'Failed to update project.', variant: 'destructive' });
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