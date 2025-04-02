
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CalendarEvent = {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  type: 'morning' | 'afternoon' | 'night';
  employeeIds: string[];
};

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const HOURS = Array.from({ length: 24 }, (_, i) => `${i}:00`);

// Sample events data
const SAMPLE_EVENTS: Record<string, CalendarEvent[]> = {
  'Monday': [
    {
      id: '1',
      title: 'Morning Shift',
      startTime: '06:00',
      endTime: '14:00',
      type: 'morning',
      employeeIds: ['1', '2', '3'],
    },
    {
      id: '2',
      title: 'Afternoon Shift',
      startTime: '14:00',
      endTime: '22:00',
      type: 'afternoon',
      employeeIds: ['4', '5', '6'],
    },
    {
      id: '3',
      title: 'Night Shift',
      startTime: '22:00',
      endTime: '06:00',
      type: 'night',
      employeeIds: ['7', '8'],
    },
  ],
  'Tuesday': [
    {
      id: '4',
      title: 'Morning Shift',
      startTime: '06:00',
      endTime: '14:00',
      type: 'morning',
      employeeIds: ['9', '10', '11'],
    },
    {
      id: '5',
      title: 'Afternoon Shift',
      startTime: '14:00',
      endTime: '22:00',
      type: 'afternoon',
      employeeIds: ['12', '13', '14'],
    },
    {
      id: '6',
      title: 'Night Shift',
      startTime: '22:00',
      endTime: '06:00',
      type: 'night',
      employeeIds: ['15', '16'],
    },
  ],
};

export const Calendar: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  
  const goToPreviousWeek = () => {
    const prevWeek = new Date(currentWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeek(prevWeek);
  };
  
  const goToNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };

  const formatWeekRange = () => {
    const start = new Date(currentWeek);
    start.setDate(start.getDate() - start.getDay() + 1);
    
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    
    const startMonth = start.toLocaleString('default', { month: 'short' });
    const endMonth = end.toLocaleString('default', { month: 'short' });
    
    if (startMonth === endMonth) {
      return `${startMonth} ${start.getDate()} - ${end.getDate()}, ${end.getFullYear()}`;
    }
    
    return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${end.getFullYear()}`;
  };

  const getEventForDay = (day: string) => {
    return SAMPLE_EVENTS[day] || [];
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center gap-2">
          <h2 className="card-title">Week Schedule</h2>
          <span className="text-sm text-gray-500">{formatWeekRange()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
            <ChevronLeft size={16} />
          </Button>
          <Button variant="outline" size="sm" onClick={goToNextWeek}>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 border-b">
            <div className="py-3 px-4 text-sm font-medium text-gray-500 border-r">
              Hours
            </div>
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="py-3 px-4 text-sm font-medium text-center">
                {day}
              </div>
            ))}
          </div>
          
          <div className="relative">
            {HOURS.map((hour, hourIndex) => (
              <div key={hour} className="grid grid-cols-8 border-b min-h-[60px]">
                <div className="py-2 px-4 text-xs text-gray-500 border-r">
                  {hour}
                </div>
                {DAYS_OF_WEEK.map((day) => {
                  // Get events for this day that include this hour
                  const events = getEventForDay(day).filter((event) => {
                    const startHour = parseInt(event.startTime.split(':')[0]);
                    const endHour = parseInt(event.endTime.split(':')[0]);
                    const currentHour = parseInt(hour.split(':')[0]);
                    
                    if (endHour < startHour) { // Overnight shift
                      return currentHour >= startHour || currentHour < endHour;
                    }
                    
                    return currentHour >= startHour && currentHour < endHour;
                  });
                  
                  return (
                    <div 
                      key={`${day}-${hour}`} 
                      className="py-2 px-2 border-r border-dashed"
                    >
                      {events.map((event) => {
                        const startHour = parseInt(event.startTime.split(':')[0]);
                        const currentHour = parseInt(hour.split(':')[0]);
                        
                        // Only render at the start hour
                        if (startHour === currentHour) {
                          return (
                            <div 
                              key={event.id}
                              className={cn(
                                "px-2 py-1 rounded text-xs font-medium",
                                event.type === 'morning' && "bg-blue-100 text-blue-800 border border-blue-200",
                                event.type === 'afternoon' && "bg-amber-100 text-amber-800 border border-amber-200",
                                event.type === 'night' && "bg-indigo-100 text-indigo-800 border border-indigo-200",
                              )}
                            >
                              <div className="font-medium">{event.title}</div>
                              <div className="text-xs opacity-70">
                                {event.startTime} - {event.endTime}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
