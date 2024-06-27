import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-10 w-full rounded-md border border-secondary/50 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/50   focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary/50  dark:bg-primary dark:ring-offset-primary dark:placeholder:text-secondary dark:focus-visible:ring-secondary/50  ",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = "Input";

export { Input };
