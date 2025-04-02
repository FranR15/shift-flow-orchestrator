
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  LayoutDashboard, 
  Users, 
  Settings, 
  Menu, 
  X, 
  MessageSquare, 
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, active }) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "sidebar-item",
        active && "active"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getIsActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className={cn(
      "h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
      isCollapsed ? "w-[80px]" : "w-[250px]"
    )}>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="bg-brand-600 h-8 w-8 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">SM</span>
            </div>
            <span className="font-bold text-gray-900">ShiftMaster</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-auto" 
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1.5">
        <SidebarLink 
          to="/dashboard" 
          icon={<LayoutDashboard size={20} />} 
          label="Dashboard" 
          active={getIsActive('/dashboard')}
        />
        <SidebarLink 
          to="/employees" 
          icon={<Users size={20} />} 
          label="Employees" 
          active={getIsActive('/employees')}
        />
        <SidebarLink 
          to="/shifts" 
          icon={<Calendar size={20} />} 
          label="Shift Calendar" 
          active={getIsActive('/shifts')}
        />
        <SidebarLink 
          to="/bot" 
          icon={<MessageSquare size={20} />} 
          label="Bot Assistant" 
          active={getIsActive('/bot')}
        />
        <SidebarLink 
          to="/notifications" 
          icon={<Bell size={20} />} 
          label="Notifications" 
          active={getIsActive('/notifications')}
        />
        <SidebarLink 
          to="/settings" 
          icon={<Settings size={20} />} 
          label="Settings" 
          active={getIsActive('/settings')}
        />
      </nav>

      <div className="p-4 border-t border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">JD</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Admin User</span>
              <span className="text-xs text-gray-500">admin@company.com</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
