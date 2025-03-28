import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function DownloadsPage() {
    // Documentation resources
    const documentation = [
        {
            id: "doc-1",
            title: "Restaurant AI User Guide",
            description: "Complete guide to using the Restaurant AI platform",
            type: "PDF",
            size: "2.4 MB",
            date: "Updated April 10, 2023",
            category: "User Guides",
            url: "#",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-500"
                >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                </svg>
            ),
        },
        {
            id: "doc-2",
            title: "Integration API Documentation",
            description: "Technical documentation for API integration",
            type: "PDF",
            size: "1.8 MB",
            date: "Updated March 25, 2023",
            category: "Technical",
            url: "#",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-500"
                >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                </svg>
            ),
        },
        {
            id: "doc-3",
            title: "Mobile App Setup Guide",
            description: "How to set up and configure the mobile application",
            type: "PDF",
            size: "3.1 MB",
            date: "Updated April 5, 2023",
            category: "User Guides",
            url: "#",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-500"
                >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                </svg>
            ),
        },
        {
            id: "doc-4",
            title: "Staff Training Manual",
            description: "Training resources for restaurant staff",
            type: "PDF",
            size: "4.2 MB",
            date: "Updated March 15, 2023",
            category: "Training",
            url: "#",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-500"
                >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                </svg>
            ),
        },
    ];

    // Software resources
    const software = [
        {
            id: "sw-1",
            title: "Restaurant AI Desktop App",
            description: "Desktop application for Windows and macOS",
            type: "Application",
            size: "48.2 MB",
            date: "Version 2.1.0 - April 1, 2023",
            category: "Software",
            platforms: ["Windows", "macOS"],
            url: "#",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500"
                >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <rect x="8" y="11" width="8" height="7" />
                    <path d="M10 11v-2a2 2 0 1 1 4 0v2" />
                </svg>
            ),
        },
        {
            id: "sw-2",
            title: "POS Connector Utility",
            description: "Tool for integrating with popular POS systems",
            type: "Application",
            size: "12.5 MB",
            date: "Version 1.3.4 - March 20, 2023",
            category: "Utilities",
            platforms: ["Windows"],
            url: "#",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500"
                >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
            ),
        },
    ];

    // Marketing materials
    const marketingMaterials = [
        {
            id: "mkt-1",
            title: "Restaurant AI Marketing Kit",
            description: "Logos, banners, and marketing materials",
            type: "ZIP",
            size: "15.7 MB",
            date: "Updated March 10, 2023",
            category: "Marketing",
            url: "#",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-500"
                >
                    <path d="M2 12a5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5 5 5 0 0 0-5 5Z" />
                    <path d="M12 7a5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5 5 5 0 0 0-5 5Z" />
                    <path d="M12 17a5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5 5 5 0 0 0-5 5Z" />
                </svg>
            ),
        },
        {
            id: "mkt-2",
            title: "Menu Design Templates",
            description: "Customizable menu templates for print and digital",
            type: "ZIP",
            size: "22.3 MB",
            date: "Updated February 28, 2023",
            category: "Templates",
            url: "#",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-500"
                >
                    <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M3 15h6" />
                    <path d="M3 18h6" />
                    <path d="M3 21h6" />
                </svg>
            ),
        },
    ];

    // Recent downloads
    const recentDownloads = [
        {
            id: "doc-1",
            title: "Restaurant AI User Guide",
            downloadDate: "April 12, 2023",
            type: "PDF",
        },
        {
            id: "sw-1",
            title: "Restaurant AI Desktop App",
            downloadDate: "April 10, 2023",
            type: "Application",
        },
        {
            id: "mkt-1",
            title: "Restaurant AI Marketing Kit",
            downloadDate: "April 5, 2023",
            type: "ZIP",
        },
    ];

    return (
        <div>
            {/* Page header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div className="mb-4 md:mb-0">
                    <h1 className="text-2xl font-bold">Downloads</h1>
                    <p className="text-gray-500">Access documentation, software, and resources</p>
                </div>
                <div>
                    <Input
                        placeholder="Search resources..."
                        className="w-full md:w-[250px]"
                    />
                </div>
            </div>

            {/* Recent Downloads */}
            {recentDownloads.length > 0 && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Recent Downloads</CardTitle>
                        <CardDescription>Files you've recently downloaded</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {recentDownloads.map((download) => (
                                <Card key={download.id} className="border border-gray-200">
                                    <CardContent className="p-4 flex items-center">
                                        <div className="mr-3">
                                            {download.type === "PDF" && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="text-red-500"
                                                >
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                    <path d="M14 2v6h6" />
                                                    <path d="M16 13H8" />
                                                    <path d="M16 17H8" />
                                                    <path d="M10 9H8" />
                                                </svg>
                                            )}
                                            {download.type === "Application" && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="text-blue-500"
                                                >
                                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                                    <rect x="8" y="11" width="8" height="7" />
                                                    <path d="M10 11v-2a2 2 0 1 1 4 0v2" />
                                                </svg>
                                            )}
                                            {download.type === "ZIP" && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="text-purple-500"
                                                >
                                                    <path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5Z" />
                                                    <path d="M11 3v8h8" />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">{download.title}</p>
                                            <p className="text-xs text-gray-500">Downloaded on {download.downloadDate}</p>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-blue-600">
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
                                                className="mr-1"
                                            >
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                <polyline points="7 10 12 15 17 10" />
                                                <line x1="12" y1="15" x2="12" y2="3" />
                                            </svg>
                                            Download Again
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Resources Tabs */}
            <Tabs defaultValue="documentation">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="documentation">Documentation</TabsTrigger>
                    <TabsTrigger value="software">Software</TabsTrigger>
                    <TabsTrigger value="marketing">Marketing Materials</TabsTrigger>
                </TabsList>

                {/* Documentation Tab */}
                <TabsContent value="documentation">
                    <div className="grid grid-cols-1 gap-6">
                        {documentation.map((doc) => (
                            <Card key={doc.id} className="overflow-hidden">
                                <div className="flex flex-col md:flex-row">
                                    <div className="bg-gray-50 p-6 flex items-center justify-center md:w-24">
                                        {doc.icon}
                                    </div>
                                    <CardContent className="p-6 flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                            <div>
                                                <h3 className="text-lg font-medium">{doc.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
                                                <div className="flex items-center mt-2 text-xs text-gray-500">
                                                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mr-2">
                                                        {doc.type}
                                                    </span>
                                                    <span>{doc.size}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{doc.date}</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 md:mt-0">
                                                <Button asChild>
                                                    <Link href={doc.url}>
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
                                                            className="mr-2"
                                                        >
                                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                            <polyline points="7 10 12 15 17 10" />
                                                            <line x1="12" y1="15" x2="12" y2="3" />
                                                        </svg>
                                                        Download
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Software Tab */}
                <TabsContent value="software">
                    <div className="grid grid-cols-1 gap-6">
                        {software.map((sw) => (
                            <Card key={sw.id} className="overflow-hidden">
                                <div className="flex flex-col md:flex-row">
                                    <div className="bg-gray-50 p-6 flex items-center justify-center md:w-24">
                                        {sw.icon}
                                    </div>
                                    <CardContent className="p-6 flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                            <div>
                                                <h3 className="text-lg font-medium">{sw.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{sw.description}</p>
                                                <div className="flex items-center mt-2 text-xs text-gray-500">
                                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mr-2">
                                                        {sw.type}
                                                    </span>
                                                    <span>{sw.size}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{sw.date}</span>
                                                </div>
                                                <div className="mt-2 flex flex-wrap gap-1">
                                                    {sw.platforms.map((platform) => (
                                                        <span
                                                            key={platform}
                                                            className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                                                        >
                                                            {platform}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="mt-4 md:mt-0">
                                                <Button asChild>
                                                    <Link href={sw.url}>
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
                                                            className="mr-2"
                                                        >
                                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                            <polyline points="7 10 12 15 17 10" />
                                                            <line x1="12" y1="15" x2="12" y2="3" />
                                                        </svg>
                                                        Download
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Marketing Materials Tab */}
                <TabsContent value="marketing">
                    <div className="grid grid-cols-1 gap-6">
                        {marketingMaterials.map((material) => (
                            <Card key={material.id} className="overflow-hidden">
                                <div className="flex flex-col md:flex-row">
                                    <div className="bg-gray-50 p-6 flex items-center justify-center md:w-24">
                                        {material.icon}
                                    </div>
                                    <CardContent className="p-6 flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                            <div>
                                                <h3 className="text-lg font-medium">{material.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{material.description}</p>
                                                <div className="flex items-center mt-2 text-xs text-gray-500">
                                                    <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 mr-2">
                                                        {material.type}
                                                    </span>
                                                    <span>{material.size}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{material.date}</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 md:mt-0">
                                                <Button asChild>
                                                    <Link href={material.url}>
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
                                                            className="mr-2"
                                                        >
                                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                            <polyline points="7 10 12 15 17 10" />
                                                            <line x1="12" y1="15" x2="12" y2="3" />
                                                        </svg>
                                                        Download
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
} 