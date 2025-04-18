"use client"

import {
    ManagementPageLayout,
    PrimaryButton,
    SecondaryButton,
    Card,
    Badge
} from "@/components/ui/management-page-layout"

export default function ManagementReservationsPage() {
    return (
        <ManagementPageLayout
            title="Table Reservations Management"
            description="Manage all restaurant reservations"
            headerAction={
                <div className="flex gap-3">
                    <PrimaryButton>
                        New Reservation
                    </PrimaryButton>
                    <SecondaryButton>
                        Manage Tables
                    </SecondaryButton>
                </div>
            }
        >
            <Card title="Reservation Calendar" className="mb-6">
                <div className="bg-gray-100 p-4 rounded-md text-center">
                    Calendar view will be loaded here
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card title="Today's Reservations">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b">
                                    <th className="pb-3">Name</th>
                                    <th className="pb-3">Time</th>
                                    <th className="pb-3">Table</th>
                                    <th className="pb-3">Guests</th>
                                    <th className="pb-3">Status</th>
                                    <th className="pb-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-3">John Doe</td>
                                    <td className="py-3">18:00 - 20:00</td>
                                    <td className="py-3">Table 1</td>
                                    <td className="py-3">2</td>
                                    <td className="py-3">
                                        <Badge variant="success">Confirmed</Badge>
                                    </td>
                                    <td className="py-3">
                                        <button className="text-[#e85c2c] hover:underline">View</button>
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3">Jane Smith</td>
                                    <td className="py-3">19:00 - 21:00</td>
                                    <td className="py-3">Table 2</td>
                                    <td className="py-3">4</td>
                                    <td className="py-3">
                                        <Badge variant="success">Confirmed</Badge>
                                    </td>
                                    <td className="py-3">
                                        <button className="text-[#e85c2c] hover:underline">View</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3">Michael Johnson</td>
                                    <td className="py-3">18:30 - 20:30</td>
                                    <td className="py-3">Table 3</td>
                                    <td className="py-3">6</td>
                                    <td className="py-3">
                                        <Badge variant="success">Confirmed</Badge>
                                    </td>
                                    <td className="py-3">
                                        <button className="text-[#e85c2c] hover:underline">View</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                </div>

                <div>
                    <Card title="Today's Summary" className="mb-6">
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Reservations</span>
                                <span className="font-semibold">3</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Guests</span>
                                <span className="font-semibold">12</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Available Tables</span>
                                <span className="font-semibold">8 / 11</span>
                            </div>
                        </div>
                    </Card>

                    <Card title="Quick Actions">
                        <div className="space-y-2">
                            <button className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md text-left flex items-center gap-2 hover:bg-gray-50">
                                <span className="text-[#e85c2c]">+</span> New Reservation
                            </button>
                            <button className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md text-left flex items-center gap-2 hover:bg-gray-50">
                                <span className="text-[#e85c2c]">⬇️</span> Export Reservations
                            </button>
                            <button className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md text-left flex items-center gap-2 hover:bg-gray-50">
                                <span className="text-[#e85c2c]">⚙️</span> Reservation Settings
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </ManagementPageLayout>
    )
} 