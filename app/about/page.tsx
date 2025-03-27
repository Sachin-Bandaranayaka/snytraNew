import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="bg-[#f8f5eb] min-h-screen">
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Who We Are Section */}
        <section className="mb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#e85c2c] mb-4">Who We Are and What We Do</h1>
          <p className="max-w-3xl mx-auto text-lg">
            We are committed to helping restaurants operate smarter, faster, and better with our integrated management
            tools.
          </p>
        </section>

        {/* Vision and Mission Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-[#e85c2c] mb-12">Our Vision and Mission</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-[#e85c2c] p-3 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.663 17h4.673M12 3v1M3.412 7l.7.7M3.412 17l.7-.7M20.587 17l-.7-.7M20.587 7l-.7.7M5 12H4M12 20v1M20 12h-1M16.9 16.9l-.7-.7M7.1 7.1l.7.7M16.9 7.1l-.7.7M7.1 16.9l.7-.7M12 6.5a5.5 5.5 0 1 0 5.5 5.5"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Vision</h3>
              </div>
              <p className="text-gray-700">
                To empower restaurants with cutting-edge technology for seamless operations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-[#e85c2c] p-3 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Mission</h3>
              </div>
              <p className="text-gray-700">
                Deliver reliable, easy-to-use solutions that boost efficiency and customer satisfaction.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-[#e85c2c] mb-12">Why Choose Us</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-[#e85c2c] w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 10a7 7 0 1 0 14 0 7 7 0 1 0-14 0M21 21h-3.4c-.8 0-1.4-.6-1.4-1.4v-1.2c0-.8-.6-1.4-1.4-1.4h-6.4c-.8 0-1.4.6-1.4 1.4v1.2c0 .8-.6 1.4-1.4 1.4H3"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-1">All-in-One Platform</h3>
            </div>

            <div className="text-center">
              <div className="bg-[#e85c2c] w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-1">Customizable to Your Needs</h3>
            </div>

            <div className="text-center">
              <div className="bg-[#e85c2c] w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-1">User-Friendly Dashboards</h3>
            </div>

            <div className="text-center">
              <div className="bg-[#e85c2c] w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-1">Exceptional Support and Scalability</h3>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

