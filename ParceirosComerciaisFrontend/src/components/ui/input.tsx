import * as React from "react"

import { cn } from "@/libs/utils"
import { Label } from "./label";

interface AppInputProps {
  containerClassName?: string;
  label?: string;
  error?: string;
  info?: string;
}

function Input({ 
  className, 
  type, 
  containerClassName, 
  label, 
  info, 
  id, 
  required, 
  error, "aria-invalid": _, 
  ...props 
}: React.ComponentProps<"input"> & AppInputProps) {
  return (
    <div className={containerClassName}>
      {!!label?.length && (
        <Label
          {...(id && { htmlFor: id })} 
          aria-required={required}
          className="mb-1"
        >
          {label}
        </Label>
      )}

      <input
        type={type}
        data-slot="input" 
        aria-invalid={!!error?.length ? "true" : "false"}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-slate-200 flex h-10 w-full min-w-0 rounded-xl border bg-transparent px-3 py-1 text-base shadow transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-slate-300/30 focus-visible:ring-4",
          "aria-invalid:ring-red-400/20 aria-invalid:border-red-400",
          className
        )}
        {...props}
      />

      {!!info?.length && (
        <p className="text-xs text-slate-600 mt-1">{info}</p>
      )}

      {!!error?.length && (
        <p className="text-sm text-red-400 mt-1">{error}</p>
      )}
    </div>
  )
}

export { Input }
