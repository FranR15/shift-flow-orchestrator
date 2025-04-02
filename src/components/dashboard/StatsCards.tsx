
import React from 'react';
import { Users, Clock, Calendar, AlertTriangle } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon, trend }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1 mb-1">{value}</h3>
            <p className="text-xs text-gray-500">{description}</p>
            
            {trend && (
              <div className={`flex items-center mt-2 text-xs font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                <span>
                  {trend.positive ? '+' : '-'}{Math.abs(trend.value)}%
                </span>
                <span className="ml-1">vs last week</span>
              </div>
            )}
          </div>
          
          <div className="p-3 bg-gray-100 rounded-full">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export const StatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard
        title="Total Employees"
        value={123}
        description="Active employees in the system"
        icon={<Users size={24} className="text-brand-600" />}
        trend={{
          value: 5.2,
          positive: true,
        }}
      />
      
      <StatCard
        title="Scheduled Hours"
        value="2,450"
        description="Total hours scheduled this month"
        icon={<Clock size={24} className="text-brand-600" />}
        trend={{
          value: 2.1,
          positive: true,
        }}
      />
      
      <StatCard
        title="Open Shifts"
        value={15}
        description="Shifts that need to be filled"
        icon={<Calendar size={24} className="text-brand-600" />}
        trend={{
          value: 3.4,
          positive: false,
        }}
      />
      
      <StatCard
        title="Absences"
        value={8}
        description="Today's unplanned absences"
        icon={<AlertTriangle size={24} className="text-amber-500" />}
        trend={{
          value: 1.5,
          positive: false,
        }}
      />
    </div>
  );
};
