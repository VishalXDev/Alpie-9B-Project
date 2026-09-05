import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardView } from './views/DashboardView';
import { AnalyticsView } from './views/AnalyticsView';
import { ProjectsView } from './components/projects/ProjectsView';
import { ChatInterface } from './components/assistant/ChatInterface';
import { SettingsView } from './components/settings/SettingsView';
import { useDashboardStats } from './hooks/useData';

function App() {
  const { data: stats, isLoading } = useDashboardStats();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading PulseAI...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(17, 24, 39, 0.9)',
            color: '#fff',
          },
        }}
      />
      
      <MainLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardView stats={stats?.data || null} />} />
          <Route path="/analytics" element={<AnalyticsView />} />
          <Route path="/projects" element={<ProjectsView />} />
          <Route path="/assistant" element={<ChatInterface />} />
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
