
'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';

interface SettingsProps {
    isPage?: boolean;
}

export function Settings({ isPage = false }: SettingsProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleSaveChanges = () => {
    // In a real application, you would save the settings here.
    console.log('Saving settings:', { darkMode, emailNotifications, pushNotifications });
  };

  const SettingsHeader = () => (
    <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings and set e-mail preferences.</CardDescription>
    </CardHeader>
  );

  return (
    <div className={cn(!isPage && "flex flex-col h-full")}>
      <div className={cn(!isPage && "flex-grow space-y-6 pb-6")}>
         {isPage && <SettingsHeader />}
        <Card>
          <CardHeader>
            <CardTitle>Display</CardTitle>
            <CardDescription>Manage your display and theme settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className={cn('transition-opacity', !darkMode && 'opacity-50')}>
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Enable dark theme for the application.</p>
              </div>
              <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} className={cn('transition-opacity', !darkMode && 'opacity-50')} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage how you receive notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className={cn('transition-opacity', !emailNotifications && 'opacity-50')}>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications about your account via email.</p>
              </div>
              <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} className={cn('transition-opacity', !emailNotifications && 'opacity-50')} />
            </div>
             <Separator />
             <div className="flex items-center justify-between">
              <div className={cn('transition-opacity', !pushNotifications && 'opacity-50')}>
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications on your devices.</p>
              </div>
              <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} className={cn('transition-opacity', !pushNotifications && 'opacity-50')} />
            </div>
          </CardContent>
        </Card>
      </div>
      {!isPage && (
        <div className="flex-shrink-0 flex justify-end gap-2 pt-4 border-t">
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
