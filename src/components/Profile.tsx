
'use client';

import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { cn } from '@/lib/utils';
import { updateUserProfile, getUserById } from '@/services/userService';
import type { User } from '@/lib/types';
import { Skeleton } from './ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Pencil, ChevronDown, ChevronRight, Settings, Bell, Shield } from 'lucide-react';

interface ProfileProps {
    user?: User | null;
    userId?: string;
    onProfileUpdate: () => void;
    isPage?: boolean;
}

export function Profile({ user, userId, onProfileUpdate, isPage = false }: ProfileProps) {
  const [profile, setProfile] = useState<User | null>(user || null);
  const [loading, setLoading] = useState(!user);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [displayOpen, setDisplayOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [securityOpen, setSecurityOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserData = async () => {
        if (user) {
        setProfile(user);
        setLoading(false);
        return;
      }
      
      if (userId) {
        setLoading(true);
        try {
          const userData = await getUserById(userId);
          setProfile(userData);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          toast({ 
            variant: 'destructive', 
            title: 'Error', 
            description: 'Failed to load user profile.' 
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user, userId, toast]);

  const handleSaveChanges = async () => {
    if (!profile) {
      toast({ variant: 'destructive', title: 'Error', description: 'No profile data to save.' });
      return;
    }

    // Check if we have essential data (email is required)
    if (!profile.email) {
      toast({ variant: 'destructive', title: 'Error', description: 'Email is required to update profile.' });
      return;
    }

    const success = await updateUserProfile(profile);
     if (success) {
      toast({ title: 'Success', description: 'Profile updated successfully!', duration: 3000 });
      // Now that the webhook is working properly, refresh the Dashboard's user data
      onProfileUpdate();
    } else {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to update profile.' });
    }
  };

  const handleSaveSettings = () => {
    // In a real application, you would save the settings here.
    console.log('Saving settings:', { darkMode, emailNotifications, pushNotifications });
    toast({ title: 'Success', description: 'Settings saved successfully!', duration: 3000 });
  };

  const handlePasswordChange = async () => {
    if (!profile) return;

    // Validate password fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({ 
        variant: 'destructive', 
        title: 'Error', 
        description: 'Please fill in all password fields.' 
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({ 
        variant: 'destructive', 
        title: 'Error', 
        description: 'New passwords do not match.' 
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({ 
        variant: 'destructive', 
        title: 'Error', 
        description: 'New password must be at least 6 characters long.' 
      });
      return;
    }

    try {
      // Update password using the same updateUserProfile function
      const passwordUpdate = {
        userId: profile.userId || profile.email,
        email: profile.email,
        password: newPassword
      };

      const success = await updateUserProfile(passwordUpdate);
      
      if (success) {
        // Clear password fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        
        toast({ 
          title: 'Success', 
          description: 'Password updated successfully!', 
          duration: 3000 
        });
      } else {
        toast({ 
          variant: 'destructive', 
          title: 'Error', 
          description: 'Failed to update password.' 
        });
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast({ 
        variant: 'destructive', 
        title: 'Error', 
        description: 'An error occurred while updating password.' 
      });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!profile) return;
    const { id, value } = e.target;
    setProfile({ ...profile, [id]: value });
  };
  
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (profile) {
          setProfile({ ...profile, avatar: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
      return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-2/5" />
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-24 w-24 rounded-full" />
                        <div className="grid gap-1.5">
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-9 w-24 mt-1" />
                        </div>
                    </div>
                     <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                         <div className="grid gap-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                         <div className="grid gap-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      );
  }

  if (!profile) {
    return <div>Failed to load profile. Please try again later.</div>;
  }
  
  const ProfileHeader = () => (
     <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>This is how others will see you on the site.</CardDescription>
    </CardHeader>
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Profile & Settings</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your profile information and account settings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveSettings} className="bg-blue-500 hover:bg-blue-600 text-white">
            <Settings className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
          <Button onClick={handleSaveChanges} className="bg-orange-500 hover:bg-orange-600">
            Save Profile
          </Button>
        </div>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>This is how others will see you on the site.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="relative group" onClick={handleAvatarClick}>
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar} alt="User avatar" />
                <AvatarFallback>{profile.first_name?.substring(0,1)}{profile.last_name?.substring(0,1)}</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Pencil className="text-white" size={32} />
              </div>
              <input type="file" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" />
            </div>
            <div className="grid gap-1.5">
              <p className="text-sm text-muted-foreground">{profile.Company || 'Company Name'}</p>
              <h2 className="text-2xl font-bold">{(profile.first_name && profile.last_name) ? `${profile.first_name} ${profile.last_name}` : (profile.username || 'User')}</h2>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input id="first_name" value={profile.first_name || ''} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" value={profile.last_name || ''} onChange={handleInputChange} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell us a little bit about yourself" value={profile.bio || ''} onChange={handleInputChange} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Display Settings */}
      <Card>
        <Collapsible open={displayOpen} onOpenChange={(open) => {
          setDisplayOpen(open);
          if (open) {
            setNotificationsOpen(false);
            setSecurityOpen(false);
          }
        }}>
          <CollapsibleTrigger asChild>
            <CardHeader className="hover:bg-gray-50 cursor-pointer transition-colors rounded-t-lg hover:rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Display Settings
                  </CardTitle>
                  <CardDescription>Manage your display and theme preferences</CardDescription>
                </div>
                {displayOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-6 pt-0">
              <div className="flex items-center justify-between">
                <div className={cn('transition-opacity', !darkMode && 'opacity-50')}>
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable dark theme for the application.</p>
                </div>
                <Switch 
                  id="dark-mode" 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode} 
                  className={cn('transition-opacity', !darkMode && 'opacity-50')} 
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Notification Settings */}
      <Card>
        <Collapsible open={notificationsOpen} onOpenChange={(open) => {
          setNotificationsOpen(open);
          if (open) {
            setDisplayOpen(false);
            setSecurityOpen(false);
          }
        }}>
          <CollapsibleTrigger asChild>
            <CardHeader className="hover:bg-gray-50 cursor-pointer transition-colors rounded-t-lg hover:rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </div>
                {notificationsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-6 pt-0">
              <div className="flex items-center justify-between">
                <div className={cn('transition-opacity', !emailNotifications && 'opacity-50')}>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications about your account via email.</p>
                </div>
                <Switch 
                  id="email-notifications" 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications} 
                  className={cn('transition-opacity', !emailNotifications && 'opacity-50')} 
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className={cn('transition-opacity', !pushNotifications && 'opacity-50')}>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications on your devices.</p>
                </div>
                <Switch 
                  id="push-notifications" 
                  checked={pushNotifications} 
                  onCheckedChange={setPushNotifications} 
                  className={cn('transition-opacity', !pushNotifications && 'opacity-50')} 
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Security Settings */}
      <Card>
        <Collapsible open={securityOpen} onOpenChange={(open) => {
          setSecurityOpen(open);
          if (open) {
            setDisplayOpen(false);
            setNotificationsOpen(false);
          }
        }}>
          <CollapsibleTrigger asChild>
            <CardHeader className="hover:bg-gray-50 cursor-pointer transition-colors rounded-t-lg hover:rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security
                  </CardTitle>
                  <CardDescription>Manage your account security and password</CardDescription>
                </div>
                {securityOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-6 pt-0">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Change Password</h4>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input 
                      id="current-password" 
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input 
                      id="new-password" 
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password (min 6 characters)"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </div>
                  <Button 
                    onClick={handlePasswordChange}
                    className="w-fit bg-red-500 hover:bg-red-600"
                    disabled={!currentPassword || !newPassword || !confirmPassword}
                  >
                    Update Password
                  </Button>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
}
