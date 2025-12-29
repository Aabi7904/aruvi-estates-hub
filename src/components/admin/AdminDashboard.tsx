import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, LogOut, Building2, CheckCircle, Clock } from 'lucide-react';
import ProjectForm, { ProjectData } from './ProjectForm';

interface AdminDashboardProps {
  onLogout: () => void;
  // These props will be used when Firebase is connected
  projects?: ProjectData[];
  onAddProject?: (data: ProjectData) => void;
  onEditProject?: (data: ProjectData) => void;
  onDeleteProject?: (id: string) => void;
  isLoading?: boolean;
}

// Mock data for UI demonstration
const mockProjects: ProjectData[] = [
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
  {
    id: '3',
    title: 'Heritage Gardens',
    location: 'Tiruvannamalai',
    price: 'Starts at 6.5 Lakhs',
    status: 'ongoing',
    features: 'Near Highway, Clear Title, Bank Loan Available',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
  },
];

const AdminDashboard = ({
  onLogout,
  projects = mockProjects,
  onAddProject,
  onEditProject,
  onDeleteProject,
  isLoading = false,
}: AdminDashboardProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleEdit = (project: ProjectData) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: ProjectData) => {
    if (editingProject?.id) {
      onEditProject?.({ ...data, id: editingProject.id });
    } else {
      onAddProject?.(data);
    }
    setIsFormOpen(false);
    setEditingProject(null);
  };

  const handleDelete = () => {
    if (deleteId) {
      onDeleteProject?.(deleteId);
      setDeleteId(null);
    }
  };

  const ongoingCount = projects.filter(p => p.status === 'ongoing').length;
  const completedCount = projects.filter(p => p.status === 'completed').length;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your real estate projects</p>
          </div>
          <Button variant="outline" onClick={onLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Projects
              </CardTitle>
              <Building2 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{projects.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ongoing
              </CardTitle>
              <Clock className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{ongoingCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed
              </CardTitle>
              <CheckCircle className="w-4 h-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{completedCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Projects</CardTitle>
              <CardDescription>View and manage all your real estate projects</CardDescription>
            </div>
            <Button onClick={handleAdd} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Project
            </Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                        No projects found. Add your first project!
                      </TableCell>
                    </TableRow>
                  ) : (
                    projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>
                          {project.imageUrl ? (
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-16 h-12 object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-16 h-12 bg-muted rounded-md flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-muted-foreground" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell className="text-muted-foreground">{project.location}</TableCell>
                        <TableCell className="text-muted-foreground">{project.price}</TableCell>
                        <TableCell>
                          <Badge
                            variant={project.status === 'completed' ? 'secondary' : 'default'}
                            className={
                              project.status === 'completed'
                                ? 'bg-secondary/20 text-secondary border-secondary/30'
                                : 'bg-primary/20 text-primary border-primary/30'
                            }
                          >
                            {project.status === 'completed' ? 'Completed' : 'Ongoing'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(project)}
                              className="h-8 w-8"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeleteId(project.id!)}
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Add/Edit Project Modal */}
      <ProjectForm
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProject(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingProject}
        isLoading={isLoading}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
