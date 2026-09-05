import { formatDateTime, getStatusColor } from '../../utils';
import { Card } from '../ui/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/Table';
import { Activity, User, Server, AlertCircle } from 'lucide-react';

interface ActivityLog {
  id: string;
  timestamp: string;
  type: 'user_action' | 'system' | 'ai_generation' | 'error';
  message: string;
  metadata?: Record<string, unknown>;
}

interface ActivityTableProps {
  logs: ActivityLog[];
}

function getActivityIcon(type: ActivityLog['type']) {
  switch (type) {
    case 'user_action':
      return <User className="w-4 h-4 text-blue-500" />;
    case 'system':
      return <Server className="w-4 h-4 text-purple-500" />;
    case 'ai_generation':
      return <Activity className="w-4 h-4 text-emerald-500" />;
    case 'error':
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    default:
      return <Activity className="w-4 h-4 text-gray-500" />;
  }
}

export function ActivityTable({ logs }: ActivityTableProps) {
  return (
    <Card title="Recent Activity" subtitle="System events and user actions">
      <div className="overflow-x-auto -mx-6 -mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">Type</TableHead>
              <TableHead>Event</TableHead>
              <TableHead className="w-40 hidden sm:table-cell">Time</TableHead>
              <TableHead className="w-28 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No activity recorded yet
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center p-1 rounded-md bg-gray-50 dark:bg-dark-700/50">
                      {getActivityIcon(log.type)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                      {log.message}
                    </p>
                    <p className="sm:hidden text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatDateTime(log.timestamp)}
                    </p>
                  </TableCell>
                  <TableCell className="text-gray-500 dark:text-gray-400 text-xs hidden sm:table-cell">
                    {formatDateTime(log.timestamp)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(log.type)}`}>
                      {log.type.replace('_', ' ')}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
