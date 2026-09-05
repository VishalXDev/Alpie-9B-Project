import React from 'react';
import { cn } from '../../utils';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export function Table({ children, className = '' }: TableProps) {
  return (
    <div className={cn('w-full overflow-auto', className)}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-700">
        {children}
      </table>
    </div>
  );
}

interface TableHeaderProps {
  children: React.ReactNode;
}

export function TableHeader({ children }: TableHeaderProps) {
  return (
    <thead className="bg-gray-50 dark:bg-dark-800">
      {children}
    </thead>
  );
}

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
}

export function TableRow({ children, className = '' }: TableRowProps) {
  return (
    <tr className={cn('bg-white dark:bg-dark-800 hover:bg-gray-50 dark:hover:bg-dark-700/50', className)}>
      {children}
    </tr>
  );
}

interface TableHeadProps {
  children: React.ReactNode;
  className?: string;
}

export function TableHead({ children, className = '' }: TableHeadProps) {
  return (
    <th
      scope="col"
      className={cn(
        'px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
        className
      )}
    >
      {children}
    </th>
  );
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
}

export function TableCell({ children, className = '', colSpan, ...props }: TableCellProps) {
  return (
    <td
      colSpan={colSpan}
      className={cn(
        'px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}

interface TableBodyProps {
  children: React.ReactNode;
}

export function TableBody({ children }: TableBodyProps) {
  return <tbody>{children}</tbody>;
}
