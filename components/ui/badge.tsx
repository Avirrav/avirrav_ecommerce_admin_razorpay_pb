import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-caption font-medium polaris-transition focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-border bg-surface text-foreground",
        primary: "border-primary bg-primary text-primary-foreground",
        secondary: "border-secondary bg-secondary text-secondary-foreground",
        destructive: "border-destructive bg-destructive text-destructive-foreground",
        outline: "border-border text-foreground",
        success: "border-success bg-success-subdued text-success",
        warning: "border-warning bg-warning-subdued text-warning",
        info: "border-highlight bg-highlight-subdued text-highlight",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }