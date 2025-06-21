import * as React from 'react';

import { cn } from '@/core/lib/utils';
import { useTheme } from '@/core/components/ThemeProvider';
import { Theme } from '@/core/models/theme.enum';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorMessage, ...props }, ref) => {
    const { theme } = useTheme();
    const isDarkTheme = theme === Theme.dark;

    return (
      <div className="flex flex-col gap-1">
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            errorMessage && 'border-red-500',
            isDarkTheme ? 'bg-slate-950' : 'bg-white',
            className
          )}
          ref={ref}
          {...props}
        />
        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
