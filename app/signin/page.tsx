"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SignInForm } from "@/components/sign-in-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function SignInContent() {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';
  const [userRole, setUserRole] = useState<string | null>(null);

  // Debugging function to check current user role
  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUserRole(data.user.role);
            console.log('Current user role:', data.user.role);
          }
        }
      } catch (error) {
        console.error('Error checking user role:', error);
      }
    };

    checkUserRole();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1 p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl font-bold text-center">Sign in</CardTitle>
            <CardDescription className="text-center text-sm sm:text-base">
              Enter your credentials to access your account
            </CardDescription>
            {userRole && (
              <div className="p-2 bg-green-50 rounded text-xs sm:text-sm">
                Debug: Current user role is <span className="font-bold">{userRole}</span>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <SignInForm redirectPath={redirectPath} />
          </CardContent>
          <CardFooter className="flex justify-center p-4 sm:p-6 text-xs sm:text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="space-y-1 p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-center">Sign in</CardTitle>
              <CardDescription className="text-center text-sm sm:text-base">
                Loading...
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-6 sm:py-8">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-t-2 border-b-2 border-[#e85c2c]"></div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}

