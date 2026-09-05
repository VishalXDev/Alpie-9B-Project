import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { useProjects } from '../../hooks/useData';
import { Card } from '../ui/Card';
import { cn } from '../../utils';

type ProjectStatus = 'active' | 'pending' | 'completed' | '';

interface ProjectsViewProps {
  title?: string;
}

export function ProjectsView({ title = 'Projects' }: ProjectsViewProps) {
  const [statusFilter, setStatusFilter] = useState<ProjectStatus>('');
  const [searchQuery, setSearchQuery] = useState('');

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        
        {/* Filters */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ProjectStatus)}
              className="pl-10 pr-8 py-2 w-40 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-gray-100 appearance-none cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              title="Clear filters"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <Card>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-200 dark:bg-dark-700 rounded w-1/2 mb-4" />
                <div className="h-2 bg-gray-200 dark:bg-dark-700 rounded w-full mb-2" />
                <div className="h-2 bg-gray-200 dark:bg-dark-700 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">Failed to load projects</p>
          </div>
        ) : projects?.data.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No projects found</p>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="mt-4 text-primary-600 dark:text-primary-400 hover:underline"
              >
                Clear filters
              </button>
            )}
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
      {projects?.data.length > 0 && (
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>Showing {projects.data.length} of {projects.meta.total} projects</span>
          <span>
            Status: {statusFilter || 'All'} | Search: {searchQuery || 'None'}
          </span>
        </div>
      )}
    </div>
  );
}
