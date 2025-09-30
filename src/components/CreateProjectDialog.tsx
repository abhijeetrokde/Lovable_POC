import React, { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { Upload } from 'lucide-react';

const industries = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing',
  'Retail', 'Construction', 'Agriculture', 'Transportation', 'Entertainment'
];

const accessRightsOptions = [
  'Read Only', 'Edit', 'Admin', 'View Reports', 'Manage Users', 'Export Data'
];

const CreateProjectDialog: React.FC = () => {
  const { isCreateDialogOpen, setIsCreateDialogOpen, addProject } = useProject();
  const [step, setStep] = useState(1);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [industry, setIndustry] = useState('');
  const [accessRights, setAccessRights] = useState<string[]>([]);
  const [revenue, setRevenue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const data = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim());
          const obj: any = {};
          headers.forEach((header, index) => {
            obj[header] = values[index] || '';
          });
          return obj;
        }).filter(row => Object.values(row).some(value => value !== ''));
        
        setCsvHeaders(headers);
        setCsvData(data);
      };
      reader.readAsText(file);
    }
  };

  const handleAccessRightToggle = (right: string) => {
    setAccessRights(prev => 
      prev.includes(right) 
        ? prev.filter(r => r !== right)
        : [...prev, right]
    );
  };

  const handleNext = () => {
    if (step === 1 && csvFile && industry && accessRights.length > 0 && revenue) {
      setStep(2);
    }
  };

  const handleCreate = () => {
    addProject({
      industry,
      accessRights,
      revenue,
      csvData,
      csvHeaders,
    });
    handleClose();
  };

  const handleClose = () => {
    setIsCreateDialogOpen(false);
    setStep(1);
    setCsvFile(null);
    setCsvData([]);
    setCsvHeaders([]);
    setIndustry('');
    setAccessRights([]);
    setRevenue('');
    setSearchTerm('');
    setSelectedColumn('');
  };

  const filteredIndustries = industries.filter(ind => 
    ind.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isCreateDialogOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Create New Project - Step {step} of 2</h2>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Upload Census File</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="flex h-10 w-full max-w-xs mx-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                  {csvFile && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Selected: {csvFile.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Industry</label>
                <input
                  placeholder="Search industries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <select 
                  value={industry} 
                  onChange={(e) => setIndustry(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select industry</option>
                  {filteredIndustries.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Access Rights</label>
                <div className="grid grid-cols-2 gap-2">
                  {accessRightsOptions.map((right) => (
                    <div key={right} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={right}
                        checked={accessRights.includes(right)}
                        onChange={() => handleAccessRightToggle(right)}
                        className="h-4 w-4 rounded border border-primary"
                      />
                      <label htmlFor={right} className="text-sm">{right}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Revenue</label>
                <input
                  placeholder="Enter revenue amount"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button 
                  onClick={handleClose}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleNext}
                  disabled={!csvFile || !industry || accessRights.length === 0 || !revenue}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">Column Selection</h3>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">Select Column</label>
                      <select 
                        value={selectedColumn} 
                        onChange={(e) => setSelectedColumn(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Choose a column</option>
                        {csvHeaders.map((header) => (
                          <option key={header} value={header}>
                            {header}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">Data Preview</h3>
                  </div>
                  <div className="p-6 pt-0 max-h-96 overflow-auto">
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                          <tr className="border-b transition-colors hover:bg-muted/50">
                            {csvHeaders.map((header) => (
                              <th key={header} className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          {csvData.slice(0, 10).map((row, index) => (
                            <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                              {csvHeaders.map((header) => (
                                <td key={header} className="p-4 align-middle">
                                  {row[header]}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {csvData.length > 10 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Showing 10 of {csvData.length} records
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => setStep(1)}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                  Back
                </button>
                <button 
                  onClick={handleClose}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreate}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Create Project
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProjectDialog;