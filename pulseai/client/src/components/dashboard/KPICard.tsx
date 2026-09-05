import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Users, DollarSign, FolderOpen, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { cn } from '../../utils';

interface KPICardProps {
  label: string;
  value: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

export function KPICard({ label, value, change, changePercent, trend, icon }: KPICardProps) {
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';

  return (
    <Card className="hover:scale-[1.02] transition-transform duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {typeof value === 'number' && !isNaN(value) ? value.toLocaleString() : value}
          </h3>
        </div>
        <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
          {icon}
        </div>
      </div>
      
      <div className="flex items-center mt-4 space-x-2">
        <span className={cn(
          'flex items-center text-sm font-medium',
          isPositive ? 'text-green-600 dark:text-green-400' : isNegative ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
        )}>
          {isPositive && <ArrowUp className="w-4 h-4 mr-1" />}
          {isNegative && <ArrowDown className="w-4 h-4 mr-1" />}
          {Math.abs(changePercent)}%
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {isPositive ? '+' : ''}{change.toLocaleString()}
        </span>
      </div>
    </Card>
  );
}
