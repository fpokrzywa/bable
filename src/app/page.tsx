
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LoginForm } from '@/components/LoginForm';
import { Card, CardDescription } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_LOGIN_SETTING === 'true') {
      const defaultEmail = process.env.NEXT_PUBLIC_DEFAULT_LOGIN;
      if (defaultEmail) {
        console.log('Auto-logging in with:', defaultEmail);
        localStorage.setItem('session', JSON.stringify({ loggedIn: true, email: defaultEmail }));
        router.push('/dashboard');
      }
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <Image
          src="/bablephish_logo.svg"
          alt="BabelPhish Logo"
          width={120}
          height={120}
          className="mx-auto"
        />
        <h1 className="text-4xl font-bold mt-6">
          <span className="text-foreground">I am </span>
          <span className="text-primary">BabelPhish</span>
        </h1>

        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
          <DialogTrigger asChild>
            <Button className="mt-8">Login</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Login</DialogTitle>
              <CardDescription>Enter your email below to login to your account.</CardDescription>
            </DialogHeader>
            <LoginForm onLoginSuccess={() => setIsLoginOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
