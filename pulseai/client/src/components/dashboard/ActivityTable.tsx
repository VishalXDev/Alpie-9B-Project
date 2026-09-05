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
      return <User className="w-4 h-4" />;
    case 'system':
      return <Server className="w-4 h-4" />;
    case 'ai_generation':
      return <Activity className="w-4 h-4" />;
    case 'error':
      return <AlertCircle className="w-4 h-4" />;
    default:
      return <Activity className="w-4 h-4" />;
  }
}

export function ActivityTable({ logs }: ActivityTableProps) {
  return (
    <Card title="Recent Activity" subtitle="System events and user actions">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <div className="flex items-center justify-center">
                <Activity className="w-4 h-4 text-gray-400" />
              </div>
            </TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="w-20">Status</TableHead>
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
                <TableCell>
                  <div className="flex items-center justify-center">
                    {getActivityIcon(log.type)}
                  </div>
                </TableCell>
                <TableCell className="max-w-md">
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {log.message}
                  </p>
                  {log.metadata && Object.keys(log.metadata).length > 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {JSON.stringify(log.metadata)}
                    </p>
                  )}
                </TableCell>
                <TableCell className="text-gray-500 dark:text-gray-400">
                  {formatDateTime(log.timestamp)}
                </TableCell>
                <TableCell>
                  <span className={getStatusColor(log.type)}>
                    {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
