
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { Calendar } from '@/components/dashboard/Calendar';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Dashboard" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <StatsCards />
          
          <div className="mb-6">
            <Calendar />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Recent Absences</h2>
              </div>
              <div className="card-content">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <p className="font-medium">Juan Gómez</p>
                      <p className="text-sm text-gray-500">Maintenance Technician</p>
                    </div>
                    <span className="badge badge-red">Medical Leave</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <p className="font-medium">Ana Suárez</p>
                      <p className="text-sm text-gray-500">Quality Inspector</p>
                    </div>
                    <span className="badge badge-blue">Vacation</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Pablo Ramírez</p>
                      <p className="text-sm text-gray-500">Machine Operator</p>
                    </div>
                    <span className="badge badge-red">Unplanned</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Upcoming Shifts</h2>
              </div>
              <div className="card-content">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <p className="font-medium">Morning Shift</p>
                      <p className="text-sm text-gray-500">Today, 6:00 - 14:00</p>
                    </div>
                    <span className="badge badge-green">Full Staff</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <p className="font-medium">Afternoon Shift</p>
                      <p className="text-sm text-gray-500">Today, 14:00 - 22:00</p>
                    </div>
                    <span className="badge badge-red">2 Vacancies</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Night Shift</p>
                      <p className="text-sm text-gray-500">Today, 22:00 - 06:00</p>
                    </div>
                    <span className="badge badge-green">Full Staff</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
