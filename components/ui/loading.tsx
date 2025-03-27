import { cn } from "@/lib/utils";

interface LoadingProps {
    size?: "sm" | "md" | "lg";
    text?: string;
    fullScreen?: boolean;
    className?: string;
}

export function Loading({
    size = "md",
    text,
    fullScreen = false,
    className,
}: LoadingProps) {
    const sizeClasses = {
        sm: "h-4 w-4 border-2",
        md: "h-8 w-8 border-3",
        lg: "h-12 w-12 border-4",
    };

    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center",
                fullScreen && "fixed inset-0 bg-background/80 backdrop-blur-sm z-50",
                !fullScreen && "py-6",
                className
            )}
        >
            <div className={cn("animate-spin rounded-full border-t-transparent border-primary", sizeClasses[size])} />
            {text && <p className="mt-4 text-sm text-muted-foreground">{text}</p>}
        </div>
    );
} 