import { cn } from '../../utils';

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export function Skeleton({ className = '', children }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 dark:bg-dark-700 rounded',
        className
      )}
    >
      {children}
    </div>
  );
}
