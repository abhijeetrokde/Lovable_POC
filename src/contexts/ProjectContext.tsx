import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Project {
  id: string;
  industry: string;
  accessRights: string[];
  revenue: string;
  csvData: any[];
  csvHeaders: string[];
  createdAt: Date;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (open: boolean) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    setProjects(prev => [...prev, newProject]);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        isCreateDialogOpen,
        setIsCreateDialogOpen,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};