"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function SignupPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    // Personal information
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    jobTitle: "",
    phoneNumber: "",
    twoFactorEnabled: false,

    // Company information
    companyName: "",
    industry: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    businessSize: "",
    numberOfLocations: 1,
    taxId: "",
    businessRegistration: "",

    // Plan information
    subscriptionPlan: "",
    expectedOrderVolume: "",

    // Terms acceptance
    acceptedTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for this field when user changes the value
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user changes the value
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateTab = (tab: string): boolean => {
    const newErrors: Record<string, string> = {};

    if (tab === "personal") {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    } else if (tab === "company") {
      if (!formData.companyName) newErrors.companyName = "Company name is required";
    } else if (tab === "plan") {
      if (!formData.subscriptionPlan) newErrors.subscriptionPlan = "Please select a plan";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (currentTab: string) => {
    if (validateTab(currentTab)) {
      switch (currentTab) {
        case "personal":
          setActiveTab("company");
          break;
        case "company":
          setActiveTab("plan");
          break;
        case "plan":
          setActiveTab("review");
          break;
      }
    }
  };

  const handlePrevious = (currentTab: string) => {
    switch (currentTab) {
      case "company":
        setActiveTab("personal");
        break;
      case "plan":
        setActiveTab("company");
        break;
      case "review":
        setActiveTab("plan");
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation before submission
    const isPersonalValid = validateTab("personal");
    const isCompanyValid = validateTab("company");
    const isPlanValid = validateTab("plan");

    if (!formData.acceptedTerms) {
      setErrors(prev => ({
        ...prev,
        acceptedTerms: "You must accept the terms and conditions"
      }));
      setActiveTab("review");
      return;
    }

    if (isPersonalValid && isCompanyValid && isPlanValid && formData.acceptedTerms) {
      setLoading(true);

      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            jobTitle: formData.jobTitle,
            phoneNumber: formData.phoneNumber,
            twoFactorEnabled: formData.twoFactorEnabled,
            company: {
              name: formData.companyName,
              industry: formData.industry,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              postalCode: formData.postalCode,
              country: formData.country,
              businessSize: formData.businessSize,
              numberOfLocations: Number(formData.numberOfLocations),
              taxId: formData.taxId,
              businessRegistration: formData.businessRegistration,
              expectedOrderVolume: formData.expectedOrderVolume,
            },
            acceptedTerms: formData.acceptedTerms,
            subscriptionPlan: formData.subscriptionPlan,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to register");
        }

        // Successful registration
        toast({
          title: "Account created successfully",
          description: "You can now sign in with your credentials",
          variant: "default",
        });

        router.push("/signin?signup=success");

      } catch (error) {
        console.error("Registration error:", error);
        toast({
          title: "Registration failed",
          description: error instanceof Error ? error.message : "An unknown error occurred",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    } else {
      // If there are validation errors, navigate to the first tab with errors
      if (!isPersonalValid) {
        setActiveTab("personal");
      } else if (!isCompanyValid) {
        setActiveTab("company");
      } else if (!isPlanValid) {
        setActiveTab("plan");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12 px-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create Your Account</CardTitle>
            <CardDescription className="text-center">
              Fill out the form below to get started with our services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="company">Company Details</TabsTrigger>
                  <TabsTrigger value="plan">Plan Selection</TabsTrigger>
                  <TabsTrigger value="review">Review & Submit</TabsTrigger>
                </TabsList>

                {/* Personal Information Tab */}
                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className={errors.name ? "text-destructive" : ""}>Full Name*</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title/Role</Label>
                      <Input
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        placeholder="Marketing Manager"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>Email Address*</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className={errors.password ? "text-destructive" : ""}>Password*</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className={errors.password ? "border-destructive" : ""}
                      />
                      {errors.password ? (
                        <p className="text-xs text-destructive">{errors.password}</p>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          Must be at least 8 characters long
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className={errors.confirmPassword ? "text-destructive" : ""}>
                        Confirm Password*
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className={errors.confirmPassword ? "border-destructive" : ""}
                      />
                      {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="twoFactorEnabled"
                        name="twoFactorEnabled"
                        checked={formData.twoFactorEnabled}
                        onCheckedChange={(checked) =>
                          setFormData(prev => ({ ...prev, twoFactorEnabled: checked === true }))
                        }
                      />
                      <Label htmlFor="twoFactorEnabled">Enable two-factor authentication for added security</Label>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => handleNext("personal")}
                      className="w-[100px]"
                    >
                      Next
                    </Button>
                  </div>
                </TabsContent>

                {/* Company Information Tab */}
                <TabsContent value="company" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className={errors.companyName ? "text-destructive" : ""}>
                        Company Name*
                      </Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Acme Inc."
                        className={errors.companyName ? "border-destructive" : ""}
                      />
                      {errors.companyName && <p className="text-xs text-destructive">{errors.companyName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select
                        value={formData.industry}
                        onValueChange={(value) => handleSelectChange("industry", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Business Ave."
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="New York"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="NY"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="10001"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="United States"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessSize">Business Size</Label>
                      <Select
                        value={formData.businessSize}
                        onValueChange={(value) => handleSelectChange("businessSize", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                          <SelectItem value="501+">501+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numberOfLocations">Number of Locations</Label>
                      <Input
                        id="numberOfLocations"
                        name="numberOfLocations"
                        type="number"
                        min="1"
                        value={formData.numberOfLocations}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="taxId">Tax ID/VAT Number</Label>
                      <Input
                        id="taxId"
                        name="taxId" the
                        value={formData.taxId}
                        onChange={handleInputChange}
                        placeholder="Tax ID"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessRegistration">Business Registration Number</Label>
                      <Input
                        id="businessRegistration"
                        name="businessRegistration"
                        value={formData.businessRegistration}
                        onChange={handleInputChange}
                        placeholder="Registration Number"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      onClick={() => handlePrevious("company")}
                      variant="outline"
                      className="w-[100px]"
                    >
                      Previous
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleNext("company")}
                      className="w-[100px]"
                    >
                      Next
                    </Button>
                  </div>
                </TabsContent>

                {/* Plan Selection Tab */}
                <TabsContent value="plan" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subscriptionPlan" className={errors.subscriptionPlan ? "text-destructive" : ""}>
                      Select a Plan*
                    </Label>
                    <Select
                      value={formData.subscriptionPlan}
                      onValueChange={(value) => handleSelectChange("subscriptionPlan", value)}
                    >
                      <SelectTrigger className={errors.subscriptionPlan ? "border-destructive" : ""}>
                        <SelectValue placeholder="Choose your plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic Plan</SelectItem>
                        <SelectItem value="professional">Professional Plan</SelectItem>
                        <SelectItem value="enterprise">Enterprise Plan</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.subscriptionPlan && (
                      <p className="text-xs text-destructive">{errors.subscriptionPlan}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expectedOrderVolume">Expected Monthly Order Volume</Label>
                    <Select
                      value={formData.expectedOrderVolume}
                      onValueChange={(value) => handleSelectChange("expectedOrderVolume", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select volume" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-50">1-50 orders</SelectItem>
                        <SelectItem value="51-200">51-200 orders</SelectItem>
                        <SelectItem value="201-500">201-500 orders</SelectItem>
                        <SelectItem value="501-1000">501-1000 orders</SelectItem>
                        <SelectItem value="1000+">1000+ orders</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      onClick={() => handlePrevious("plan")}
                      variant="outline"
                      className="w-[100px]"
                    >
                      Previous
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleNext("plan")}
                      className="w-[100px]"
                    >
                      Next
                    </Button>
                  </div>
                </TabsContent>

                {/* Review & Submit Tab */}
                <TabsContent value="review" className="space-y-4">
                  <div className="space-y-4 p-4 rounded border border-muted">
                    <h3 className="font-semibold">Terms and Conditions</h3>
                    <div className="h-40 overflow-y-auto p-4 text-sm border rounded bg-muted/20">
                      <p>By creating an account and using our services, you agree to be bound by the following terms and conditions:</p>
                      <ol className="list-decimal pl-5 space-y-2 mt-2">
                        <li>You agree to provide accurate and complete information during the registration process.</li>
                        <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                        <li>You agree to use our services in compliance with all applicable laws and regulations.</li>
                        <li>You acknowledge that your data will be processed in accordance with our Privacy Policy.</li>
                        <li>We reserve the right to modify or terminate services at our discretion.</li>
                        <li>Payment terms are subject to the subscription plan you select.</li>
                      </ol>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="acceptedTerms"
                        name="acceptedTerms"
                        checked={formData.acceptedTerms}
                        onCheckedChange={(checked) =>
                          setFormData(prev => ({ ...prev, acceptedTerms: checked === true }))
                        }
                        className={errors.acceptedTerms ? "border-destructive" : ""}
                      />
                      <Label
                        htmlFor="acceptedTerms"
                        className={`text-sm ${errors.acceptedTerms ? "text-destructive" : ""}`}
                      >
                        I accept the <Link href="/legal/terms" className="text-primary underline">Terms and Conditions</Link> and <Link href="/legal/privacy" className="text-primary underline">Privacy Policy</Link>
                      </Label>
                    </div>
                    {errors.acceptedTerms && (
                      <p className="text-xs text-destructive">{errors.acceptedTerms}</p>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      onClick={() => handlePrevious("review")}
                      variant="outline"
                      className="w-[100px]"
                    >
                      Previous
                    </Button>
                    <Button
                      type="submit"
                      className="w-[200px]"
                      disabled={loading}
                    >
                      {loading ? "Creating Account..." : "Create Account & Get Started"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/signin" className="text-primary font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

