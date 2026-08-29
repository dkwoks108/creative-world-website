import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-mono font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#00CFFF] focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border border-white/10 bg-white/10 text-[#00CFFF]",
                secondary:
                    "border border-white/15 bg-slate-900 text-slate-300",
                destructive:
                    "border border-rose-500/30 bg-rose-500/10 text-rose-400",
                outline:
                    "border border-white/20 text-slate-200 bg-transparent",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
