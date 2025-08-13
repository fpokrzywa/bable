
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
import { cn } from '@/lib/utils';
import { updateUserProfile } from '@/services/userService';
import type { User } from '@/lib/types';
import { Skeleton } from './ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Pencil } from 'lucide-react';

interface ProfileProps {
    user: User | null;
    onProfileUpdate: () => void;
    isPage?: boolean;
}

export function Profile({ user, onProfileUpdate, isPage = false }: ProfileProps) {
  const [profile, setProfile] = useState<User | null>(user);
  const [loading, setLoading] = useState(!user);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      toast({ title: 'Success', description: 'Profile updated successfully!', duration: 3000 });
      onProfileUpdate();
    } else {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to update profile.' });
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
    <div className={cn(!isPage && "flex flex-col h-full overflow-hidden")}>
        <div className={cn(!isPage && "flex-grow overflow-y-auto no-scrollbar p-6 space-y-6")}>
            <Card>
                {isPage && <ProfileHeader />}
                <CardContent className={cn("space-y-8", isPage && "pt-6")}>
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
                        <h2 className="text-2xl font-bold">{profile.first_name} {profile.last_name}</h2>
                        <p className="text-muted-foreground">{profile.email}</p>
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
        </div>
        {!isPage && (
            <div className="flex-shrink-0 flex justify-end items-center gap-2 p-6 bg-background/80 backdrop-blur-sm">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
            </div>
        )}
         {isPage && (
            <div className="flex justify-end mt-6">
                <Button onClick={handleSaveChanges}>Save Changes</Button>
            </div>
        )}
    </div>
  );
}
