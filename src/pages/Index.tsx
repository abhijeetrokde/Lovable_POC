import React from 'react';
import { ProjectProvider, useProject } from '@/contexts/ProjectContext';
import ProjectTable from '@/components/ProjectTable';
import CreateProjectDialog from '@/components/CreateProjectDialog';
import DataTable from '@/components/DataTable';
import { Plus } from 'lucide-react';

// Sample data for the datatable
const sampleData = [
  { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'Engineering', salary: '$120,000', experience: '5 years' },
  { id: 2, name: 'Jane Smith', position: 'Product Manager', department: 'Product', salary: '$135,000', experience: '7 years' },
  { id: 3, name: 'Mike Johnson', position: 'UX Designer', department: 'Design', salary: '$95,000', experience: '3 years' },
  { id: 4, name: 'Sarah Wilson', position: 'Data Scientist', department: 'Data', salary: '$140,000', experience: '6 years' },
  { id: 5, name: 'Chris Brown', position: 'DevOps Engineer', department: 'Engineering', salary: '$125,000', experience: '4 years' },
  { id: 6, name: 'Emily Davis', position: 'Marketing Manager', department: 'Marketing', salary: '$110,000', experience: '8 years' },
  { id: 7, name: 'Alex Thompson', position: 'Sales Representative', department: 'Sales', salary: '$85,000', experience: '2 years' },
  { id: 8, name: 'Lisa Anderson', position: 'HR Specialist', department: 'Human Resources', salary: '$75,000', experience: '4 years' },
  { id: 9, name: 'David Lee', position: 'Backend Developer', department: 'Engineering', salary: '$115,000', experience: '5 years' },
  { id: 10, name: 'Rachel Green', position: 'Content Writer', department: 'Marketing', salary: '$65,000', experience: '3 years' },
];

const columns = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'position', label: 'Position', sortable: true },
  { key: 'department', label: 'Department', sortable: true },
  { key: 'salary', label: 'Salary', sortable: true },
  { key: 'experience', label: 'Experience', sortable: true },
];

const JobTitleMatchingApp: React.FC = () => {
  const { setIsCreateDialogOpen } = useProject();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Job Title Matching</h1>
            <p className="text-muted-foreground">Manage your job title matching projects</p>
          </div>
          <button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </button>
        </div>
        
        <DataTable 
          data={sampleData}
          columns={columns}
          title="Employee Directory"
          searchable={true}
          pageSize={5}
        />
        
        <ProjectTable />
        <CreateProjectDialog />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <ProjectProvider>
      <JobTitleMatchingApp />
    </ProjectProvider>
  );
};

export default Index;
