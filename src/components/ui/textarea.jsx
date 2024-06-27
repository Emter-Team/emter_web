import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                "flex min-h-[80px] w-full rounded-md border border-secondary/50 focus:border-secondary bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/50 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary/50 dark:bg-primary dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Textarea.displayName = "Textarea";

export { Textarea };