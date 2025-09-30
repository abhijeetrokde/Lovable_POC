import React from 'react';
import { useProject } from '@/contexts/ProjectContext';

const ProjectTable: React.FC = () => {
  const { projects } = useProject();

  if (projects.length === 0) {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Projects</h3>
          <p className="text-sm text-muted-foreground">No projects created yet. Create your first project to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Projects</h3>
        <p className="text-sm text-muted-foreground">Manage your job title matching projects</p>
      </div>
      <div className="p-6 pt-0">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Project ID</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Industry</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Access Rights</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Revenue</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Records</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Created</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {projects.map((project) => (
                <tr key={project.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-mono text-sm">{project.id}</td>
                  <td className="p-4 align-middle">{project.industry}</td>
                  <td className="p-4 align-middle">
                    <div className="flex flex-wrap gap-1">
                      {project.accessRights.map((right) => (
                        <span key={right} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/80">
                          {right}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 align-middle">{project.revenue}</td>
                  <td className="p-4 align-middle">{project.csvData.length} records</td>
                  <td className="p-4 align-middle">{project.createdAt.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectTable;