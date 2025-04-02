
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus,
  ArrowUp,
  ArrowDown,
  Edit,
  Trash,
  MoreHorizontal,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Employee {
  id: string;
  name: string;
  position: string;
  category: string;
  seniority: string;
  location: string;
  status: 'active' | 'inactive' | 'on-leave';
  imageUrl?: string;
}

const SAMPLE_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Carlos López',
    position: 'Senior Operator',
    category: 'Operations',
    seniority: '5 years',
    location: 'Buenos Aires',
    status: 'active',
  },
  {
    id: '2',
    name: 'María Rodriguez',
    position: 'Machine Operator',
    category: 'Production',
    seniority: '2 years',
    location: 'Córdoba',
    status: 'active',
  },
  {
    id: '3',
    name: 'Juan Gómez',
    position: 'Maintenance Technician',
    category: 'Maintenance',
    seniority: '3 years',
    location: 'Buenos Aires',
    status: 'on-leave',
  },
  {
    id: '4',
    name: 'Laura Fernandez',
    position: 'Production Supervisor',
    category: 'Operations',
    seniority: '7 years',
    location: 'Rosario',
    status: 'active',
  },
  {
    id: '5',
    name: 'Diego Martinez',
    position: 'Quality Inspector',
    category: 'Quality',
    seniority: '1 year',
    location: 'Buenos Aires',
    status: 'inactive',
  },
];

export const EmployeeList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState<Employee[]>(SAMPLE_EMPLOYEES);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Employee;
    direction: 'ascending' | 'descending';
  } | null>(null);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredEmployees = employees.filter((employee) => 
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const requestSort = (key: keyof Employee) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };
  
  const getSortedEmployees = (employees: Employee[]) => {
    if (!sortConfig) return employees;
    
    return [...employees].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };
  
  const sortedEmployees = getSortedEmployees(filteredEmployees);
  
  const SortIcon = ({ columnName }: { columnName: keyof Employee }) => {
    if (!sortConfig || sortConfig.key !== columnName) {
      return null;
    }
    
    return sortConfig.direction === 'ascending' ? 
      <ArrowUp size={14} /> : 
      <ArrowDown size={14} />;
  };
  
  const getStatusBadgeClass = (status: Employee['status']) => {
    switch (status) {
      case 'active':
        return 'badge-green';
      case 'inactive':
        return 'badge-gray';
      case 'on-leave':
        return 'badge-blue';
      default:
        return 'badge-gray';
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Input
            placeholder="Search employees..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus size={16} className="mr-2" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium col-span-1">Name</span>
                  <Input
                    placeholder="Full name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium col-span-1">Position</span>
                  <Input
                    placeholder="Job title"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium col-span-1">Category</span>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="quality">Quality</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium col-span-1">Location</span>
                  <Input
                    placeholder="City"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium col-span-1">Status</span>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="on-leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Employee</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('name')}>
                  <div className="flex items-center gap-1">
                    Name
                    <SortIcon columnName="name" />
                  </div>
                </th>
                <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('position')}>
                  <div className="flex items-center gap-1">
                    Position
                    <SortIcon columnName="position" />
                  </div>
                </th>
                <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('category')}>
                  <div className="flex items-center gap-1">
                    Category
                    <SortIcon columnName="category" />
                  </div>
                </th>
                <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('seniority')}>
                  <div className="flex items-center gap-1">
                    Seniority
                    <SortIcon columnName="seniority" />
                  </div>
                </th>
                <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('location')}>
                  <div className="flex items-center gap-1">
                    Location
                    <SortIcon columnName="location" />
                  </div>
                </th>
                <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('status')}>
                  <div className="flex items-center gap-1">
                    Status
                    <SortIcon columnName="status" />
                  </div>
                </th>
                <th className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.length > 0 ? (
                sortedEmployees.map((employee) => (
                  <tr key={employee.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {employee.name}
                    </td>
                    <td className="px-6 py-4">
                      {employee.position}
                    </td>
                    <td className="px-6 py-4">
                      <span className="badge badge-blue">
                        {employee.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {employee.seniority}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-gray-400" />
                        {employee.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${getStatusBadgeClass(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                          <Edit size={14} />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Assign Shift
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash size={14} className="mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b">
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
