import { cn } from "@/lib/utils";
import { AlertTriangle, XCircle } from "lucide-react";
import { Button } from "./button";

interface ErrorMessageProps {
    title?: string;
    message: string;
    retry?: () => void;
    variant?: "alert" | "error";
    className?: string;
}

export function ErrorMessage({
    title,
    message,
    retry,
    variant = "error",
    className,
}: ErrorMessageProps) {
    const Icon = variant === "error" ? XCircle : AlertTriangle;
    const colorClasses = variant === "error"
        ? "text-destructive border-destructive/20 bg-destructive/10"
        : "text-warning border-warning/20 bg-warning/10";

    return (
        <div className={cn("rounded-md border p-4", colorClasses, className)}>
            <div className="flex items-start gap-4">
                <Icon className="h-5 w-5 mt-0.5" />
                <div className="space-y-1 flex-1">
                    {title && <p className="font-medium leading-none">{title}</p>}
                    <p className="text-sm">{message}</p>
                    {retry && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={retry}
                        >
                            Try again
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
} 