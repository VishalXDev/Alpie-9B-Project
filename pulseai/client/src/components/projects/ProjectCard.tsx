import { CheckCircle, Clock, Circle, Trash2, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../ui/Card';
import { getStatusColor } from '../../utils';
import { useDeleteProject, useUpdateProject } from '../../hooks/useData';
import { Project } from '../../types';
import toast from 'react-hot-toast';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const deleteMutation = useDeleteProject();
  const updateMutation = useUpdateProject();

  const statusIcon = {
    active: <CheckCircle className="w-3.5 h-3.5 mr-1" />,
    pending: <Clock className="w-3.5 h-3.5 mr-1" />,
    completed: <Circle className="w-3.5 h-3.5 mr-1" />,
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(project.id);
      toast.success(`Project "${project.title}" deleted`);
    } catch {
      toast.error('Failed to delete project');
    }
  };

  const handleStatusChange = async (newStatus: 'active' | 'pending' | 'completed') => {
    setShowMenu(false);
    try {
      await updateMutation.mutateAsync({
        id: project.id,
        updates: {
          status: newStatus,
          progress: newStatus === 'completed' ? 100 : project.progress,
        },
      });
      toast.success(`Status updated to ${newStatus}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 flex flex-col justify-between relative group !p-5">
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 truncate">
              {project.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
              {project.description || 'No description provided.'}
            </p>
          </div>

          <div className="flex items-center space-x-1 flex-shrink-0">
            {/* Status Badge */}
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(project.status)}`}>
              {statusIcon[project.status]}
              {project.status}
            </span>

            {/* Actions Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                title="Options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setShowMenu(false)}
                  />
                  <div className="absolute right-0 top-6 z-30 w-36 bg-white dark:bg-dark-900 rounded-lg shadow-xl border border-gray-200 dark:border-dark-700 py-1 text-xs">
                    <div className="px-3 py-1 text-gray-400 font-semibold uppercase text-[10px]">
                      Change Status
                    </div>
                    <button
                      onClick={() => handleStatusChange('active')}
                      className="w-full text-left px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-700 dark:text-gray-200"
                    >
                      Active
                    </button>
                    <button
                      onClick={() => handleStatusChange('pending')}
                      className="w-full text-left px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-700 dark:text-gray-200"
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => handleStatusChange('completed')}
                      className="w-full text-left px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-700 dark:text-gray-200"
                    >
                      Completed
                    </button>
                    <div className="my-1 border-t border-gray-200 dark:border-dark-700" />
                    <button
                      onClick={handleDelete}
                      disabled={deleteMutation.isPending}
                      className="w-full text-left px-3 py-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center space-x-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Progress
            </span>
            <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
              {project.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                project.status === 'completed'
                  ? 'bg-emerald-500'
                  : project.status === 'active'
                  ? 'bg-primary-500'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-gray-100 dark:border-dark-700/60 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center">
          <Clock className="w-3.5 h-3.5 mr-1 text-gray-400" />
          <span>Due {new Date(project.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>

        <span className="text-[11px] text-gray-400">
          {new Date(project.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
        </span>
      </div>
    </Card>
  );
}
