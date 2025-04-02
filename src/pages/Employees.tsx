
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { EmployeeList } from '@/components/employees/EmployeeList';

const Employees: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Employee Management" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <EmployeeList />
        </main>
      </div>
    </div>
  );
};

export default Employees;
