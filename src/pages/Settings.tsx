import { User, Bell, Shield, Building2, Palette, Database, Key, Globe, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Settings() {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in max-w-4xl">
      {/* Page Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <Tabs defaultValue="organization" className="space-y-4 sm:space-y-6">
        <TabsList className="bg-muted/50 w-full sm:w-auto grid grid-cols-3 sm:grid-cols-6 sm:flex gap-1">
          <TabsTrigger value="organization" className="gap-1 sm:gap-2 text-xs sm:text-sm">
            <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Organization</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1 sm:gap-2 text-xs sm:text-sm">
            <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-1 sm:gap-2 text-xs sm:text-sm">
            <Palette className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-1 sm:gap-2 text-xs sm:text-sm">
            <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="gap-1 sm:gap-2 text-xs sm:text-sm">
            <Database className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Data</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-1 sm:gap-2 text-xs sm:text-sm">
            <Key className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">API</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="organization" className="space-y-4 sm:space-y-6">
          <Card className="shadow-card">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Organization Profile</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Manage your organization's information and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0 sm:pt-0">
              <div className="space-y-2">
                <Label htmlFor="orgName" className="text-xs sm:text-sm flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Organization Name
                </Label>
                <Input id="orgName" defaultValue="BlockNexa Labs" className="text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline" className="text-xs sm:text-sm">Tagline</Label>
                <Input id="tagline" defaultValue="Building the Future of Finance" className="text-sm" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-xs sm:text-sm">Industry</Label>
                  <Select defaultValue="fintech">
                    <SelectTrigger id="industry" className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fintech">Financial Technology</SelectItem>
                      <SelectItem value="banking">Banking & Lending</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="software">Software Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size" className="text-xs sm:text-sm">Organization Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="size" className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">1-50 employees</SelectItem>
                      <SelectItem value="medium">51-200 employees</SelectItem>
                      <SelectItem value="large">201-1000 employees</SelectItem>
                      <SelectItem value="enterprise">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs sm:text-sm">Description</Label>
                <Textarea 
                  id="description" 
                  defaultValue="BlockNexa Labs is a cutting-edge fintech company specializing in AI-powered credit risk analysis and financial technology solutions."
                  className="text-sm min-h-[80px]"
                />
              </div>
              <Separator />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs sm:text-sm flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Contact Email
                  </Label>
                  <Input id="email" type="email" defaultValue="contact@blocknexalabs.com" className="text-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs sm:text-sm flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-xs sm:text-sm flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Website
                  </Label>
                  <Input id="website" type="url" defaultValue="https://blocknexalabs.com" className="text-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-xs sm:text-sm flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </Label>
                  <Input id="location" defaultValue="San Francisco, CA" className="text-sm" />
                </div>
              </div>
              <Separator />
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="text-sm">Cancel</Button>
                <Button className="gradient-primary text-primary-foreground hover:opacity-90 text-sm">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 sm:space-y-6">
          <Card className="shadow-card">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Notification Preferences</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Configure how you receive alerts and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0 sm:pt-0">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm">Covenant Breach Alerts</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Receive immediate notifications for breaches</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm">Document Upload Notifications</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Get notified when new documents are uploaded</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm">Weekly Summary Reports</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Receive weekly portfolio summary via email</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm">Review Reminders</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Get reminded about upcoming loan reviews</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4 sm:space-y-6">
          <Card className="shadow-card">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Appearance Settings</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Customize the look and feel of your workspace</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0 sm:pt-0">
              <div className="space-y-2">
                <Label htmlFor="theme" className="text-xs sm:text-sm">Theme</Label>
                <Select defaultValue="system">
                  <SelectTrigger id="theme" className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System Default</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="accentColor" className="text-xs sm:text-sm">Accent Color</Label>
                <Select defaultValue="indigo">
                  <SelectTrigger id="accentColor" className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indigo">Indigo</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="fontSize" className="text-xs sm:text-sm">Font Size</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="fontSize" className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm">Compact Mode</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Reduce spacing and padding for more content</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm">Show Animations</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Enable smooth transitions and animations</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 sm:space-y-6">
          <Card className="shadow-card">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Security Settings</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Manage your account security and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0 sm:pt-0">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-xs sm:text-sm">Current Password</Label>
                <Input id="currentPassword" type="password" className="text-sm" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-xs sm:text-sm">New Password</Label>
                  <Input id="newPassword" type="password" className="text-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-xs sm:text-sm">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" className="text-sm" />
                </div>
              </div>
              <Separator />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm">Two-Factor Authentication</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">Enable 2FA</Button>
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button className="gradient-primary text-primary-foreground hover:opacity-90 text-sm">
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4 sm:space-y-6">
          <Card className="shadow-card">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Data Management</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Manage your data storage and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0 sm:pt-0">
              <Alert>
                <Database className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Your data is encrypted and stored securely. You have full control over your information.
                </AlertDescription>
              </Alert>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="dataRetention" className="text-xs sm:text-sm">Data Retention Period</Label>
                <Select defaultValue="1year">
                  <SelectTrigger id="dataRetention" className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="2years">2 Years</SelectItem>
                    <SelectItem value="forever">Forever</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm">Auto-Backup</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Automatically backup data daily</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm">Data Analytics</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Allow anonymous usage data for improvements</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="space-y-3">
                <Label className="text-xs sm:text-sm">Data Export</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                    Export All Data
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                    Download Reports
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs sm:text-sm text-destructive font-semibold">Danger Zone</Label>
                  <p className="text-xs text-muted-foreground">Permanently delete all data associated with your organization</p>
                </div>
                <Button variant="destructive" size="sm" className="text-xs sm:text-sm">
                  Delete All Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4 sm:space-y-6">
          <Card className="shadow-card">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">API Configuration</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Manage API keys and integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0 sm:pt-0">
              <Alert>
                <Key className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Keep your API keys secure. Never share them publicly or commit them to version control.
                </AlertDescription>
              </Alert>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="apiKey" className="text-xs sm:text-sm">API Key</Label>
                <div className="flex gap-2">
                  <Input 
                    id="apiKey" 
                    type="password" 
                    defaultValue="sk_live_1234567890abcdef" 
                    className="text-sm font-mono"
                    readOnly
                  />
                  <Button variant="outline" size="sm" className="shrink-0 text-xs">
                    Copy
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm">API Key Status</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Active since Jan 1, 2026</p>
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-success shadow-sm shadow-success/50" />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="webhookUrl" className="text-xs sm:text-sm">Webhook URL</Label>
                <Input 
                  id="webhookUrl" 
                  type="url" 
                  placeholder="https://your-domain.com/webhook" 
                  className="text-sm"
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="rateLimit" className="text-xs sm:text-sm">Rate Limit</Label>
                <Select defaultValue="1000">
                  <SelectTrigger id="rateLimit" className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100 requests/hour</SelectItem>
                    <SelectItem value="500">500 requests/hour</SelectItem>
                    <SelectItem value="1000">1,000 requests/hour</SelectItem>
                    <SelectItem value="5000">5,000 requests/hour</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm">IP Whitelisting</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Restrict API access to specific IPs</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex justify-between gap-2">
                <Button variant="outline" className="text-sm">
                  View Documentation
                </Button>
                <Button variant="destructive" className="text-sm">
                  Regenerate Key
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
