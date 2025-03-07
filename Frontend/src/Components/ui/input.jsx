import * as React from "react"

import {cn} from '../../lib/utils'

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props} />
  );
})
Input.displayName = "Input"


const LogInInput = React.forwardRef(({ className, type, label, ...props }, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-xl font-bold">
          {label}
        </label>
      )}
      <input
        type={type}
        className={cn(
          "flex h-9 w-full bg-gray-200 border border-gray-600 rounded text-sm p-4",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = "LogInInput";

export { Input,LogInInput }
