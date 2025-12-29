import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { ProjectData } from '@/components/admin/ProjectForm';
import { useToast } from '@/hooks/use-toast';

// Simulated auth state - Replace with Firebase Auth
const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { toast } = useToast();

  // Mock projects state - Replace with Firestore
  const [projects, setProjects] = useState<ProjectData[]>([
    {
      id: '1',
      title: 'Sunrise Valley Phase 1',
      location: 'Tiruvannamalai',
      price: 'Starts at 5 Lakhs',
      status: 'completed',
      features: 'DTCP Approved, RERA Registered, 24/7 Security',
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400',
    },
    {
      id: '2',
      title: 'Green Meadows',
      location: 'Tiruvannamalai',
      price: 'Starts at 8 Lakhs',
      status: 'ongoing',
      features: 'Gated Community, Temple View, Wide Roads',
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400',
    },
  ]);

  // TODO: Replace with Firebase Auth signInWithEmailAndPassword
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setLoginError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation - Replace with Firebase Auth
    if (email === 'admin@example.com' && password === 'admin123') {
      setIsAuthenticated(true);
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
    } else {
      setLoginError('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  // TODO: Replace with Firebase Auth signOut
  const handleLogout = () => {
    setIsAuthenticated(false);
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    });
  };

  // TODO: Replace with Firestore addDoc
  const handleAddProject = (data: ProjectData) => {
    const newProject = {
      ...data,
      id: Date.now().toString(),
      imageUrl: data.imageFile 
        ? URL.createObjectURL(data.imageFile) 
        : 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400',
    };
    setProjects(prev => [...prev, newProject]);
    toast({
      title: 'Project added',
      description: `"${data.title}" has been added successfully.`,
    });
  };

  // TODO: Replace with Firestore updateDoc
  const handleEditProject = (data: ProjectData) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === data.id
          ? {
              ...data,
              imageUrl: data.imageFile 
                ? URL.createObjectURL(data.imageFile) 
                : p.imageUrl,
            }
          : p
      )
    );
    toast({
      title: 'Project updated',
      description: `"${data.title}" has been updated successfully.`,
    });
  };

  // TODO: Replace with Firestore deleteDoc
  const handleDeleteProject = (id: string) => {
    const project = projects.find(p => p.id === id);
    setProjects(prev => prev.filter(p => p.id !== id));
    toast({
      title: 'Project deleted',
      description: project ? `"${project.title}" has been deleted.` : 'Project deleted.',
      variant: 'destructive',
    });
  };

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
