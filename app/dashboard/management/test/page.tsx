"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, RefreshCw, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

enum TestStatus {
    PENDING = "PENDING",
    RUNNING = "RUNNING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}

interface TestResult {
    status: TestStatus;
    data: any;
    error: string | null;
    time: number | null;
}

interface ApiTest {
    name: string;
    endpoint: string;
    description: string;
    result: TestResult;
}

export default function TestPage() {
    const { toast } = useToast();
    const [dbConnectionTest, setDbConnectionTest] = useState<TestResult>({
        status: TestStatus.PENDING,
        data: null,
        error: null,
        time: null
    });

    const [apiTests, setApiTests] = useState<ApiTest[]>([
        {
            name: "Database Connection",
            endpoint: "/api/test/db-connection",
            description: "Tests the basic database connection and table existence",
            result: {
                status: TestStatus.PENDING,
                data: null,
                error: null,
                time: null
            }
        },
        {
            name: "Menu API",
            endpoint: "/api/menu",
            description: "Tests fetching menu items from the database",
            result: {
                status: TestStatus.PENDING,
                data: null,
                error: null,
                time: null
            }
        },
        {
            name: "Orders API",
            endpoint: "/api/orders",
            description: "Tests fetching orders from the database",
            result: {
                status: TestStatus.PENDING,
                data: null,
                error: null,
                time: null
            }
        },
        {
            name: "Inventory API",
            endpoint: "/api/inventory",
            description: "Tests fetching inventory items from the database",
            result: {
                status: TestStatus.PENDING,
                data: null,
                error: null,
                time: null
            }
        },
        {
            name: "API Tests Summary",
            endpoint: "/api/test/management-apis",
            description: "Comprehensive test of all management APIs",
            result: {
                status: TestStatus.PENDING,
                data: null,
                error: null,
                time: null
            }
        }
    ]);

    const runTest = async (index: number) => {
        const test = apiTests[index];

        // Update status to running
        setApiTests(prev =>
            prev.map((t, i) =>
                i === index ? {
                    ...t,
                    result: {
                        ...t.result,
                        status: TestStatus.RUNNING,
                        data: null,
                        error: null,
                        time: null
                    }
                } : t
            )
        );

        const startTime = Date.now();

        try {
            const response = await fetch(test.endpoint);
            const data = await response.json();
            const endTime = Date.now();

            if (response.ok) {
                setApiTests(prev =>
                    prev.map((t, i) =>
                        i === index ? {
                            ...t,
                            result: {
                                status: TestStatus.SUCCESS,
                                data,
                                error: null,
                                time: endTime - startTime
                            }
                        } : t
                    )
                );
            } else {
                setApiTests(prev =>
                    prev.map((t, i) =>
                        i === index ? {
                            ...t,
                            result: {
                                status: TestStatus.FAILED,
                                data,
                                error: data.error || 'Unknown API error',
                                time: endTime - startTime
                            }
                        } : t
                    )
                );
            }
        } catch (error) {
            const endTime = Date.now();
            setApiTests(prev =>
                prev.map((t, i) =>
                    i === index ? {
                        ...t,
                        result: {
                            status: TestStatus.FAILED,
                            data: null,
                            error: error instanceof Error ? error.message : 'Unknown error',
                            time: endTime - startTime
                        }
                    } : t
                )
            );
        }
    };

    const runAllTests = async () => {
        // Run all tests in sequence
        for (let i = 0; i < apiTests.length; i++) {
            await runTest(i);
        }

        toast({
            title: "Tests completed",
            description: "All API tests have been completed"
        });
    };

    const getStatusIcon = (status: TestStatus) => {
        switch (status) {
            case TestStatus.PENDING:
                return <div className="w-4 h-4 bg-gray-200 rounded-full"></div>;
            case TestStatus.RUNNING:
                return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
            case TestStatus.SUCCESS:
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case TestStatus.FAILED:
                return <XCircle className="w-4 h-4 text-red-500" />;
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Database & API Tests</h1>
                <Button onClick={runAllTests}>Run All Tests</Button>
            </div>

            <Tabs defaultValue="tests" className="w-full">
                <TabsList>
                    <TabsTrigger value="tests">API Tests</TabsTrigger>
                    <TabsTrigger value="help">Troubleshooting Guide</TabsTrigger>
                </TabsList>

                <TabsContent value="tests" className="mt-4">
                    <div className="grid gap-4">
                        {apiTests.map((test, index) => (
                            <Card key={index} className={`${test.result.status === TestStatus.SUCCESS ? "border-green-200" :
                                    test.result.status === TestStatus.FAILED ? "border-red-200" :
                                        test.result.status === TestStatus.RUNNING ? "border-blue-200" :
                                            ""
                                }`}>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            {getStatusIcon(test.result.status)}
                                            {test.name}
                                        </CardTitle>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => runTest(index)}
                                            disabled={test.result.status === TestStatus.RUNNING}
                                        >
                                            {test.result.status === TestStatus.RUNNING ? "Running..." : "Run Test"}
                                        </Button>
                                    </div>
                                    <p className="text-sm text-gray-500">{test.description}</p>
                                    {test.result.time && (
                                        <span className="text-xs text-gray-400">
                                            Completed in {test.result.time}ms
                                        </span>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    {test.result.status === TestStatus.FAILED && (
                                        <div className="bg-red-50 p-3 rounded-md text-red-800 text-sm mb-3">
                                            <div className="font-semibold flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4" />
                                                Error:
                                            </div>
                                            <p className="ml-6">{test.result.error}</p>
                                        </div>
                                    )}

                                    {test.result.data && (
                                        <div className="bg-gray-50 p-3 rounded-md overflow-auto max-h-96">
                                            <pre className="text-xs">
                                                {JSON.stringify(test.result.data, null, 2)}
                                            </pre>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="help" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Troubleshooting Guide</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-semibold mb-2">Common Issues:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    <span className="font-medium">Database Connection Issues:</span>
                                    <ul className="list-circle pl-5 mt-1 space-y-1 text-sm text-gray-600">
                                        <li>Check that DATABASE_URL is properly configured in .env.local</li>
                                        <li>Verify that your database is running and accessible</li>
                                        <li>Test if your IP address is allowed to access the database</li>
                                    </ul>
                                </li>
                                <li>
                                    <span className="font-medium">SQL Errors:</span>
                                    <ul className="list-circle pl-5 mt-1 space-y-1 text-sm text-gray-600">
                                        <li>Verify that the tables exist in the database</li>
                                        <li>Check for SQL syntax errors in raw queries</li>
                                        <li>Ensure column names match between code and database schema</li>
                                    </ul>
                                </li>
                                <li>
                                    <span className="font-medium">Authentication Issues:</span>
                                    <ul className="list-circle pl-5 mt-1 space-y-1 text-sm text-gray-600">
                                        <li>Make sure you're logged in when testing protected APIs</li>
                                        <li>Check that your user has the correct permissions</li>
                                    </ul>
                                </li>
                                <li>
                                    <span className="font-medium">API Data Format Issues:</span>
                                    <ul className="list-circle pl-5 mt-1 space-y-1 text-sm text-gray-600">
                                        <li>Verify that the API is returning data in the expected format</li>
                                        <li>Check if frontend components are handling null or empty values correctly</li>
                                    </ul>
                                </li>
                            </ul>

                            <h3 className="font-semibold mt-6 mb-2">Recommended Actions:</h3>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>Run the database connection test to verify basic connectivity</li>
                                <li>Check API endpoints one by one to isolate the problem</li>
                                <li>Review server logs for detailed error messages</li>
                                <li>Verify that your database schema matches what the code expects</li>
                                <li>Try restarting the development server</li>
                            </ol>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
} 