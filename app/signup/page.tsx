import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image src="/placeholder.svg?height=1000&width=800" alt="Restaurant" fill className="object-cover" />
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full md:w-1/2 bg-[#f8f5eb] p-8 md:p-16 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <Image src="/logo.svg" alt="Restaurant Management Logo" width={50} height={50} />
          </div>

          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Sign Up</h1>
          <p className="text-center text-gray-600 mb-8">Fill in the required fields to create your account</p>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">
                Name
              </label>
              <Input id="name" type="text" placeholder="Enter your name" className="w-full" />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                E-mail
              </label>
              <Input id="email" type="email" placeholder="Enter your e-mail" className="w-full" />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 font-medium">
                Password
              </label>
              <Input id="password" type="password" placeholder="Enter your password" className="w-full" />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block mb-2 font-medium">
                Confirm Password
              </label>
              <Input id="confirm-password" type="password" placeholder="Enter your password" className="w-full" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the Terms & Conditions
              </label>
            </div>

            <Button className="w-full bg-[#e85c2c] hover:bg-[#d04a1d] text-white">Sign Up</Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300"></span>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#f8f5eb] px-4 text-gray-500">Or</span>
              </div>
            </div>

            <Button variant="outline" className="w-full mb-3 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign Up with Google
            </Button>

            <Button variant="outline" className="w-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
              Sign Up with Apple
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

