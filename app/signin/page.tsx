import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SignInForm } from "@/components/sign-in-form";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { signup?: string; error?: string; redirect?: string };
}) {
  // Use await Promise.resolve() to ensure searchParams are properly awaited
  const params = await Promise.resolve(searchParams);
  const showSignupSuccess = params?.signup === "success";
  const showError = params?.error === "auth";
  // Ensure redirectPath is properly decoded if it's URL-encoded
  const redirectPath = params?.redirect ? decodeURIComponent(params.redirect) : "/dashboard";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showSignupSuccess && (
              <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                <AlertDescription>
                  Account created successfully! Please sign in.
                </AlertDescription>
              </Alert>
            )}

            {showError && (
              <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
                <AlertDescription>
                  Invalid email or password. Please try again.
                </AlertDescription>
              </Alert>
            )}

            <SignInForm redirectPath={redirectPath} />
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
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

