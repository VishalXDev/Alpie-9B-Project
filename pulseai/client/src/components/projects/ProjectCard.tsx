import { CheckCircle, Clock, Circle } from 'lucide-react';
import { Card } from '../ui/Card';
import { getStatusColor } from '../../utils';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'pending' | 'completed';
  progress: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusIcon = {
    active: <CheckCircle className="w-4 h-4" />,
    pending: <Clock className="w-4 h-4" />,
    completed: <Circle className="w-4 h-4" />,
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {project.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
            {project.description}
          </p>
        </div>
        <span className={getStatusColor(project.status)}>
          {statusIcon[project.status]}
        </span>
      </div>

      <div className="space-y-3">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Progress
            </span>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {project.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                project.status === 'completed'
                  ? 'bg-green-500'
                  : project.status === 'active'
                  ? 'bg-primary-500'
                  : 'bg-yellow-500'
              }`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Due Date */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4 mr-2" />
          <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
        </div>

        {/* Updated At */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Card>
  );
}
