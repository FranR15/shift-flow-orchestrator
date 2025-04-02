
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Settings: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Settings" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="company">
            <TabsList className="mb-6">
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="rules">Shift Rules</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="api">API Integration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="company">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>
                    Manage your company details and organization settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <Input defaultValue="ACME Industries" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Industry</label>
                    <Select defaultValue="manufacturing">
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="logistics">Logistics</SelectItem>
                        <SelectItem value="hospitality">Hospitality</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Address</label>
                    <Textarea defaultValue="123 Business Street, Córdoba, Argentina" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Administrator Email</label>
                      <Input type="email" defaultValue="admin@acme.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input defaultValue="+54 11 1234 5678" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="rules">
              <Card>
                <CardHeader>
                  <CardTitle>Shift Rules Configuration</CardTitle>
                  <CardDescription>
                    Configure the rules for shift assignments and employee scheduling.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Minimum Rest Hours Between Shifts</label>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="12" className="w-24" />
                      <span className="text-sm text-gray-500">hours</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Maximum Consecutive Working Days</label>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="6" className="w-24" />
                      <span className="text-sm text-gray-500">days</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Overtime Threshold</label>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="8" className="w-24" />
                      <span className="text-sm text-gray-500">hours/day</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Shift Length</label>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="8" className="w-24" />
                      <span className="text-sm text-gray-500">hours</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Prioritize Employee Preferences</label>
                    <Select defaultValue="high">
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="low">Low Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset to Default</Button>
                  <Button>Save Rules</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure how notifications are sent to employees.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Send shift assignments via email</p>
                      </div>
                      <div className="flex items-center h-6">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked={true}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">WhatsApp Notifications</p>
                        <p className="text-sm text-gray-500">Send shift assignments via WhatsApp</p>
                      </div>
                      <div className="flex items-center h-6">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked={true}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Shift Reminders</p>
                        <p className="text-sm text-gray-500">Send reminders before shifts</p>
                      </div>
                      <div className="flex items-center h-6">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked={true}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Replacement Requests</p>
                        <p className="text-sm text-gray-500">Notify employees of replacement requests</p>
                      </div>
                      <div className="flex items-center h-6">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked={true}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <label className="text-sm font-medium">Twilio WhatsApp Integration</label>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-gray-500">Twilio Account SID</label>
                        <Input type="password" defaultValue="AC1234567890abcdef1234567890abcdef" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-gray-500">Twilio Auth Token</label>
                        <Input type="password" defaultValue="••••••••••••••••••••••••" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-gray-500">WhatsApp From Number</label>
                        <Input defaultValue="+14155238886" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle>API Integration</CardTitle>
                  <CardDescription>
                    Manage API keys and external service integrations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">API Key</label>
                    <div className="flex items-center gap-2">
                      <Input type="password" defaultValue="sk_test_1234567890abcdefghijklmnopqrstuvwxyz" readOnly />
                      <Button variant="outline">Regenerate</Button>
                    </div>
                    <p className="text-xs text-gray-500">Use this key to access the ShiftMaster API</p>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <label className="text-sm font-medium">Webhook URL</label>
                    <Input defaultValue="https://your-domain.com/api/webhook" />
                    <p className="text-xs text-gray-500">Receive real-time updates about shift changes</p>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <label className="text-sm font-medium">Allowed Origins</label>
                    <Textarea defaultValue="https://your-domain.com" />
                    <p className="text-xs text-gray-500">Domains that are allowed to access your API (one per line)</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset</Button>
                  <Button>Save Integration Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Settings;
