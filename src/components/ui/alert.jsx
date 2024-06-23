import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
    "absolute w-72 rounded-lg border border-primary-200 p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-primary-950 dark:border-primary-800 dark:[&>svg]:text-primary-50",
    {
        variants: {
            variant: {
                default:
                    "bg-white text-primary-950 dark:bg-primary-950 dark:text-primary-50",
                destructive:
                    "border-danger/50 text-danger dark:border-danger [&>svg]:text-danger dark:border-danger/50 dark:text-danger dark:dark:border-danger dark:[&>svg]:text-danger",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
    <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
    />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn(
            "mb-1 font-medium leading-none tracking-tight",
            className
        )}
        {...props}
    />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm [&_p]:leading-relaxed", className)}
        {...props}
    />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
