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


const LogInInput = React.forwardRef(({ className, type, label, icon, ...props }, ref) => {
  return (
    <div className="space-y-1">
      {label && <label className="text-xl font-bold">{label}</label>}
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full bg-gray-200 rounded text-sm p-4 pr-10", // Ensure space for the icon
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {icon}
          </button>
        )}
      </div>
    </div>
  );
});


Input.displayName = "LogInInput";

export { Input,LogInInput }
