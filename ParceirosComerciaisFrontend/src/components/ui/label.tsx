import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/libs/utils"

function Label({
  className, 
  "aria-required": required, 
  children, 
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm text-slate-600 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )} 
      {...(required && {
        ["aria-required"]: required
      })}
      children={(
        <>
          {children} 
          {required && <span className="-ml-1 text-red-400">*</span>}
        </>
      )}
      {...props}
    />
  )
}

export { Label }
