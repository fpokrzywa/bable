
'use client';

import { useState, useEffect } from 'react';
import { LoginForm } from '@/components/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOverride = () => {
    localStorage.setItem('session', JSON.stringify({ loggedIn: true, email: 'override@example.com' }));
    router.push('/');
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your email below to login to your account.</CardDescription>
          </CardHeader>
          <CardContent>
            {isMounted ? <LoginForm /> : null}
          </CardContent>
        </Card>
      </div>
      <div className="absolute bottom-4 text-center">
        <button onClick={handleOverride} className="text-xs text-muted-foreground hover:underline">
          override
        </button>
      </div>
    </div>
  );
}
