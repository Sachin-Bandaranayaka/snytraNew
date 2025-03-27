import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <AlertTriangle className="h-16 w-16 text-amber-500" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
                    <p className="text-lg text-muted-foreground mb-6">
                        You don't have permission to access this page. Please contact your administrator if you
                        believe this is an error.
                    </p>
                    <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
                        <Button asChild>
                            <Link href="/">Go Home</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/signin">Sign In</Link>
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
} 