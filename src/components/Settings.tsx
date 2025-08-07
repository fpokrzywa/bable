
'use client';

import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { DialogClose } from './ui/dialog';

export function Settings() {
  const handleSaveChanges = () => {
    // In a real application, you would save the settings here.
    console.log('Saving settings...');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6 pb-6">
        <Card>
          <CardHeader>
            <CardTitle>Display</CardTitle>
            <CardDescription>Manage your display and theme settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Enable dark theme for the application.</p>
              </div>
              <Switch id="dark-mode" />
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
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications about your account via email.</p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
             <Separator />
             <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications on your devices.</p>
              </div>
              <Switch id="push-notifications" />
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
