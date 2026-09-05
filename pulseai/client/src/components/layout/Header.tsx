import { Bell, Moon, Sun, Menu } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex-shrink-0 bg-white/95 dark:bg-dark-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-dark-700 transition-colors">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5">
        <div className="flex items-center space-x-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="lg:hidden flex items-center space-x-2">
            <div className="w-7 h-7 bg-gradient-to-br from-primary-500 to-primary-700 rounded flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-gray-100">PulseAI</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          <button
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-dark-900" />
          </button>
        </div>
      </div>
    </header>
  );
}
