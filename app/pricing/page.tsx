"use client";

import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useState, useEffect } from "react";
import { redirectToCheckout } from "@/lib/stripe";
import { useToast } from "@/components/ui/use-toast";

export default function PricingPage() {
  const [pricingPackages, setPricingPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<number | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const { toast } = useToast();

  useEffect(() => {
    async function fetchPricingPackages() {
      try {
        const res = await fetch('/api/pricing/packages', {
          next: { revalidate: 60 } // Cache for 60 seconds
        });
        const data = await res.json();
        setPricingPackages(data);
      } catch (error) {
        console.error('Error fetching pricing packages:', error);
        toast({
          title: "Error",
          description: "Failed to load pricing packages. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchPricingPackages();
  }, [toast]);

  const handleCheckout = async (packageId: number) => {
    setCheckoutLoading(packageId);
    try {
      await redirectToCheckout(packageId, billingPeriod);
    } catch (error) {
      console.error('Error during checkout:', error);
      toast({
        title: "Checkout Failed",
        description: "There was a problem with the checkout process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setCheckoutLoading(null);
    }
  };

  // Calculate price based on billing period
  const calculatePrice = (price: number) => {
    if (billingPeriod === 'yearly') {
      // 5% discount for yearly billing
      const annualPrice = price * 12 * 0.95;
      return (annualPrice / 12).toFixed(2); // Show monthly equivalent price
    }
    return (price / 100).toFixed(2);
  };

  return (
    <div className="bg-[#f8f5eb] min-h-screen">
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Pricing Header */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#e85c2c] mb-4">
            Choose the Right Plan <br /> for Your Restaurant
          </h1>
          <p className="max-w-3xl mx-auto text-lg mb-2">
            Select from our flexible plans, ensuring a perfect match for your business needs.
          </p>
          <p className="max-w-3xl mx-auto text-lg">
            All plans include 1 Admin, 1 Staff, and 1 Kitchen account by default.
          </p>
          <div className="mt-6 inline-block bg-white rounded-full p-1 shadow-sm">
            <div className="flex items-center">
              <button
                className={`px-6 py-2 rounded-full ${billingPeriod === 'monthly' ? 'bg-[#e85c2c] text-white' : 'text-gray-700'}`}
                onClick={() => setBillingPeriod('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-full ${billingPeriod === 'yearly' ? 'bg-[#e85c2c] text-white' : 'text-gray-700'}`}
                onClick={() => setBillingPeriod('yearly')}
              >
                Yearly (5% off)
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="mb-20">
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e85c2c]"></div>
            </div>
          ) : pricingPackages.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {pricingPackages.map((tier, index) => (
                <div
                  key={tier.id}
                  className={`bg-white rounded-lg shadow-sm relative ${tier.isPopular ? 'border-2 border-[#e85c2c]' : ''}`}
                >
                  {tier.isPopular && (
                    <div className="absolute top-0 right-0 bg-[#e85c2c] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                      Most Popular
                    </div>
                  )}
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="bg-[#fff0eb] p-2 rounded-lg mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#e85c2c"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {index === 0 && <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>}
                          {index === 1 && <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>}
                          {index === 2 && <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>}
                          {index === 2 && <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>}
                          {index === 2 && <path d="M4 22h16"></path>}
                          {index === 2 && <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>}
                          {index === 2 && <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>}
                          {index === 2 && <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>}
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold">{tier.name}</h3>
                    </div>

                    <p className="text-gray-600 text-sm mb-6">{tier.description || 'Perfect solution for your restaurant'}</p>

                    <div className="mb-6">
                      <span className="text-4xl font-bold">${calculatePrice(tier.price)}</span>
                      <span className="text-gray-500">/month</span>
                      {billingPeriod === 'yearly' && (
                        <div className="text-xs text-green-600 mt-1">
                          Billed annually (5% discount)
                        </div>
                      )}
                    </div>

                    <Button
                      className={`w-full ${tier.isPopular
                        ? 'bg-[#e85c2c] hover:bg-[#d04a1d] text-white'
                        : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300'
                        }`}
                      onClick={() => handleCheckout(tier.id)}
                      disabled={checkoutLoading === tier.id}
                    >
                      {checkoutLoading === tier.id ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : tier.price === 0 ? 'Start Free Trial' : 'Get Started'}
                    </Button>

                    <div className="mt-6">
                      <p className="font-medium text-sm mb-3">Default account allocation:</p>
                      <div className="flex items-center mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-400 mr-2"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span className="text-sm text-gray-600">1 Admin account</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-400 mr-2"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                        </svg>
                        <span className="text-sm text-gray-600">1 Staff account</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-400 mr-2"
                        >
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        <span className="text-sm text-gray-600">1 Kitchen account</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        Additional accounts: $5 per account per month
                      </div>
                    </div>

                    <div className="mt-6 border-t border-gray-200 pt-6">
                      <p className="font-medium text-sm mb-3">What's included:</p>
                      <ul className="space-y-3">
                        {tier.features && (() => {
                          try {
                            // Try to parse as JSON
                            const featuresArray = JSON.parse(tier.features);
                            if (Array.isArray(featuresArray)) {
                              return featuresArray.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 mt-1"
                                  >
                                    <path d="M20 6 9 17l-5-5"></path>
                                  </svg>
                                  <span className="text-sm text-gray-600">{feature}</span>
                                </li>
                              ));
                            }
                          } catch (e) {
                            // If it's not valid JSON, treat it as a string and split by newlines
                            return tier.features.split('\n').map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#10b981"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="mr-2 mt-1"
                                >
                                  <path d="M20 6 9 17l-5-5"></path>
                                </svg>
                                <span className="text-sm text-gray-600">{feature.trim()}</span>
                              </li>
                            ));
                          }
                          return null;
                        })()}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600">No pricing packages found</p>
            </div>
          )}
        </section>

        {/* Additional Products Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">Standalone Products</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Explore our other powerful products designed to help your restaurant succeed
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">AI Calling</h3>
              <p className="text-gray-600 text-sm mb-4">
                Automate reservations and customer inquiries with our intelligent AI calling system.
              </p>
              <Button variant="outline" className="w-full border-[#e85c2c] text-[#e85c2c] hover:bg-orange-50">
                View Details
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">AI WhatsApp</h3>
              <p className="text-gray-600 text-sm mb-4">
                Engage with customers through WhatsApp using our advanced AI messaging system.
              </p>
              <Button variant="outline" className="w-full border-[#e85c2c] text-[#e85c2c] hover:bg-orange-50">
                View Details
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">AI SMS Messaging</h3>
              <p className="text-gray-600 text-sm mb-4">
                Connect with customers via SMS using intelligent automated messaging.
              </p>
              <Button variant="outline" className="w-full border-[#e85c2c] text-[#e85c2c] hover:bg-orange-50">
                View Details
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" x2="22" y1="12" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Lead Generation</h3>
              <p className="text-gray-600 text-sm mb-4">
                Attract new customers with our advanced lead generation and nurturing system.
              </p>
              <Button variant="outline" className="w-full border-[#e85c2c] text-[#e85c2c] hover:bg-orange-50">
                View Details
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
              <h3 className="font-bold mb-2">Can I switch plans later?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. When upgrading, the new pricing will be prorated for the remainder of your billing cycle.</p>
            </div>
            <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
              <h3 className="font-bold mb-2">How do additional accounts work?</h3>
              <p className="text-gray-600">All plans include 1 Admin, 1 Staff, and 1 Kitchen account by default. Additional accounts of any type can be added for $5 per account per month.</p>
            </div>
            <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
              <h3 className="font-bold mb-2">Is there a contract or commitment?</h3>
              <p className="text-gray-600">No long-term contracts required. You can pay monthly or yearly (with a 5% discount), and you can cancel at any time.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold mb-2">Do you offer a free trial?</h3>
              <p className="text-gray-600">Yes, we offer a full-featured 14-day free trial so you can test our platform before committing to a paid plan.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#1e1e1e] text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Restaurant?</h2>
          <p className="mb-8 max-w-2xl mx-auto">Join thousands of restaurants using our platform to increase efficiency and grow their business</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white px-8 py-6 text-lg">Start Your Free Trial</Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#1e1e1e] px-8 py-6 text-lg">Contact Sales</Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

