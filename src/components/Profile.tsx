
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
import { updateUserProfile } from '@/services/userService';
import type { User } from '@/lib/types';
import { Skeleton } from './ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface ProfileProps {
    user: User | null;
}

export function Profile({ user }: ProfileProps) {
  const [profile, setProfile] = useState<User | null>(user);
  const [loading, setLoading] = useState(!user);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setProfile(user);
    if (user) {
      setLoading(false);
    }
  }, [user]);

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
        <div className="flex-grow space-y-6 pb-6 overflow-y-auto no-scrollbar">
            <Card>
                <CardHeader>
                <CardDescription>This is how others will see you on the site.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                <div className="flex items-center gap-4">
                    <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar} alt="User avatar" />
                    <AvatarFallback>{profile.first_name?.substring(0,1)}{profile.last_name?.substring(0,1)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1.5">
                    <h2 className="text-2xl font-bold">{profile.first_name} {profile.last_name}</h2>
                    <p className="text-muted-foreground">{profile.email}</p>
                    <Button size="sm" variant="outline">
                        Change Avatar
                    </Button>
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
      <div className="flex-shrink-0 flex justify-end items-center gap-2 pt-4 border-t">
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
