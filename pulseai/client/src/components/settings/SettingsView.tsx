import { useState } from 'react';
import { Switch } from '../ui/Switch';
import { Card } from '../ui/Card';
import { useTheme } from '../../hooks/useTheme';
import { Bell, Moon, Sun, Mail, Shield } from 'lucide-react';

interface SettingsViewProps {
  title?: string;
}

export function SettingsView({ title = 'Settings' }: SettingsViewProps) {
  const { isDark, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(isDark);

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
    toggleTheme();
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">{title}</h2>

      <div className="space-y-6">
        {/* Appearance Settings */}
        <Card title="Appearance" subtitle="Customize your dashboard appearance">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  {darkMode ? (
                    <Moon className="w-5 h-5 text-primary-500" />
                  ) : (
                    <Sun className="w-5 h-5 text-primary-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Dark Mode
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Toggle between light and dark themes
                  </p>
                </div>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={handleToggleTheme}
              />
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card title="Notifications" subtitle="Manage your notification preferences">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Bell className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Enable Notifications
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive push notifications for important updates
                  </p>
                </div>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive email summaries of your activity
                  </p>
                </div>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card title="Security" subtitle="Manage your account security">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Shield className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Add an extra layer of security to your account
                  </p>
                </div>
              </div>
              <Switch
                checked={false}
                onCheckedChange={() => {}}
                disabled
              />
            </div>
          </div>
        </Card>

        {/* About */}
        <Card title="About PulseAI" subtitle="Application information">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-gray-100">Version</span>
              <span className="text-gray-500 dark:text-gray-400">1.0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-gray-100">Build</span>
              <span className="text-gray-500 dark:text-gray-400">2024.01.15</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-gray-100">Status</span>
              <span className="text-green-600 dark:text-green-400 font-medium">
                Operational
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
