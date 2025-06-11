import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-border bg-surface px-3 py-2 text-body ring-offset-background file:border-0 file:bg-transparent file:text-body file:font-medium placeholder:text-muted-foreground focus-visible:polaris-focus disabled:cursor-not-allowed disabled:opacity-50 polaris-transition",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }