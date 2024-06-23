import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-primary dark:focus-visible:ring-secondary",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-white hover:bg-primary/90 hover:bg-primary dark:bg-secondary dark:text-primary dark:hover:bg-primary/90",
                destructive:
                    "bg-danger text-white hover:bg-danger/90 dark:bg-danger dark:text-white dark:hover:bg-danger/90",
                outline:
                    "border border-secondary bg-white hover:bg-primary hover:text-primary dark:border-primary dark:bg-primary dark:hover:bg-primary dark:hover:text-secondary",
                secondary:
                    "bg-white text-primary border border-secondary hover:bg-primary hover:text-white dark:bg-primary dark:text-white dark:hover:bg-primary/80",
                ghost: "hover:bg-primary hover:text-primary dark:hover:bg-primary dark:hover:text-primary",
                link: "text-primary underline-offset-4 hover:underline dark:text-secondary",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
