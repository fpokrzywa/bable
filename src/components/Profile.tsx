
'use client';

import { useState } from 'react';
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

export function Profile() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleSaveChanges = () => {
    // In a real application, you would save the changes here.
    console.log('Saving changes...');
  };

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
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1.5">
                    <h2 className="text-2xl font-bold">John Doe</h2>
                    <p className="text-muted-foreground">john.doe@example.com</p>
                    <Button size="sm" variant="outline">
                        Change Avatar
                    </Button>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="john.doe" />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" placeholder="Tell us a little bit about yourself" defaultValue="I am a ServiceNow developer with a passion for creating efficient and user-friendly applications." />
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
