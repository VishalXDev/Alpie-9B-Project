import { useState } from 'react';
import { Search, Filter, X, Plus } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { CreateProjectModal } from './CreateProjectModal';
import { useProjects } from '../../hooks/useData';
import { Card } from '../ui/Card';

type ProjectStatus = 'active' | 'pending' | 'completed' | '';

interface ProjectsViewProps {
  title?: string;
}

export function ProjectsView({ title = 'Projects' }: ProjectsViewProps) {
  const [statusFilter, setStatusFilter] = useState<ProjectStatus>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: projects, isLoading, error } = useProjects({
    status: statusFilter || undefined,
    search: searchQuery || undefined,
  });

  const handleClearFilters = () => {
    setStatusFilter('');
    setSearchQuery('');
  };

  const hasActiveFilters = statusFilter !== '' || searchQuery !== '';

  return (
    <div className="space-y-6">
      {/* Top Header & Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Manage, track, and create analytics and SaaS projects
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-200 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-gray-100 text-sm shadow-sm"
          />
        </div>

        {/* Status Filter Dropdown */}
        <div className="relative w-full sm:w-44">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ProjectStatus)}
            className="pl-10 pr-8 py-2 w-full bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-gray-100 text-sm appearance-none cursor-pointer shadow-sm"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors self-start sm:self-auto"
            title="Clear filters"
          >
            <X className="w-4 h-4" />
            <span>Clear filters</span>
          </button>
        )}
      </div>

      {/* Projects Grid */}
      <Card className="!p-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-gray-50 dark:bg-dark-700/50 p-5 rounded-xl border border-gray-100 dark:border-dark-700">
                <div className="h-4 bg-gray-200 dark:bg-dark-600 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-200 dark:bg-dark-600 rounded w-1/2 mb-4" />
                <div className="h-2 bg-gray-200 dark:bg-dark-600 rounded w-full mb-2" />
                <div className="h-2 bg-gray-200 dark:bg-dark-600 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">Failed to load projects</p>
          </div>
        ) : projects?.data && projects.data.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-500 mx-auto flex items-center justify-center mb-4">
              <Plus className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">No projects found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
              {hasActiveFilters
                ? 'Try adjusting your search criteria or clear your active filters.'
                : 'Get started by creating your first project now.'}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              {hasActiveFilters ? (
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Clear filters
                </button>
              ) : (
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors shadow-sm"
                >
                  Create Project
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.data.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </Card>

      {/* Meta Info */}
      {projects && projects.data && projects.data.length > 0 && (
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
          <span>Showing {projects.data.length} of {projects.meta?.total ?? projects.data.length} projects</span>
          <span>
            Status: {statusFilter || 'All'} | Search: {searchQuery || 'None'}
          </span>
        </div>
      )}

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
