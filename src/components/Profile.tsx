
'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { DialogClose } from './ui/dialog';
import { cn } from '@/lib/utils';
import { getUserProfile, updateUserProfile } from '@/services/userService';
import type { User } from '@/lib/types';
import { Skeleton } from './ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const userProfile = await getUserProfile();
      setProfile(userProfile);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSaveChanges = async () => {
    if (!profile) return;
    const success = await updateUserProfile(profile);
     if (success) {
      toast({ title: 'Success', description: 'Profile updated successfully!' });
    } else {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to update profile.' });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!profile) return;
    const { id, value } = e.target;
    setProfile({ ...profile, [id]: value });
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

  return (
    <div className="flex flex-col h-full">
        <div className="flex-grow space-y-6 pb-6">
            <Card>
                <CardHeader>
                <CardDescription>This is how others will see you on the site.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                <div className="flex items-center gap-4">
                    <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar} alt="User avatar" />
                    <AvatarFallback>{profile.username?.substring(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1.5">
                    <h2 className="text-2xl font-bold">{profile.username}</h2>
                    <p className="text-muted-foreground">{profile.email}</p>
                    <Button size="sm" variant="outline">
                        Change Avatar
                    </Button>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" value={profile.username} onChange={handleInputChange} />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={profile.email} onChange={handleInputChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" placeholder="Tell us a little bit about yourself" value={profile.bio} onChange={handleInputChange} />
                    </div>
                </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Manage your account preferences and settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className={cn('transition-opacity', !darkMode && 'opacity-50')}>
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable dark theme for the application.</p>
                    </div>
                    <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} className={cn('transition-opacity', !darkMode && 'opacity-50')} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                    <div className={cn('transition-opacity', !emailNotifications && 'opacity-50')}>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about your account via email.</p>
                    </div>
                    <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} className={cn('transition-opacity', !emailNotifications && 'opacity-50')} />
                </div>
                </CardContent>
            </Card>
        </div>
      <div className="flex-shrink-0 flex justify-end gap-2 pt-4 border-t">
        <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
        </DialogClose>
      </div>
    </div>
  );
}
