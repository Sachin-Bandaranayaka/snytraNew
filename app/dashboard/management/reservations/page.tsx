import { redirect } from "next/navigation";

export default function ReservationsPage() {
    // Server-side redirect
    redirect("/dashboard/reservations");
} 