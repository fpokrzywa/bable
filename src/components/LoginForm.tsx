
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { performLogin } from '@/services/userService';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { BabelPhishFullScreenLoader } from '@/components/ui/babelphish-loader';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState("Logging you in...");
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setLoaderMessage("Logging you in...");
    
    try {
      const result = await performLogin(values.email, values.password);
      
      if (result.success) {
        // Update loader message for workspace building phase
        setLoaderMessage("Building your workspace...");
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${result.user?.first_name || 'User'}!`,
        });
        
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        
        // Add a small delay to let users see the "Building workspace" message
        // and ensure smooth transition to dashboard
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Don't hide loader on success - keep it visible during redirect
        router.push('/dashboard');
        
        // Fallback: hide loader after 10 seconds as a safety measure
        timeoutRef.current = setTimeout(() => {
          setIsLoading(false);
        }, 10000);
        
        // Loader will stay visible until the page actually changes
        return;
      } else {
        toast({
          title: "Login Failed",
          description: result.error || "Please check your credentials and try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <BabelPhishFullScreenLoader message={loaderMessage} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </Button>
        </form>
      </Form>
    </>
  );
}
