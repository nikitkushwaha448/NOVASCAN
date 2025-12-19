'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../providers/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Cog6ToothIcon, 
  BellIcon, 
  MagnifyingGlassIcon, 
  ChartBarIcon,
  UserCircleIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

interface UserPreferences {
  notifications: {
    emailAlerts: boolean;
    trendingTopics: boolean;
    weeklyDigest: boolean;
  };
  search: {
    defaultPlatforms: string[];
    resultsPerPage: number;
    enableReranking: boolean;
  };
  analytics: {
    autoRefresh: boolean;
    refreshInterval: number;
    showCharts: boolean;
  };
  display: {
    compactView: boolean;
    showMetadata: boolean;
  };
  api: {
    elasticsearchUrl: string;
    googleCloudProjectId: string;
    googleCredentials: string;
    redditUserAgent: string;
  };
}

const defaultPreferences: UserPreferences = {
  notifications: {
    emailAlerts: true,
    trendingTopics: true,
    weeklyDigest: false,
  },
  search: {
    defaultPlatforms: ['reddit', 'hackernews', 'producthunt'],
    resultsPerPage: 20,
    enableReranking: false,
  },
  analytics: {
    autoRefresh: false,
    refreshInterval: 30,
    showCharts: true,
  },
  display: {
    compactView: false,
    showMetadata: true,
  },
  api: {
    elasticsearchUrl: '',
    googleCloudProjectId: '',
    googleCredentials: '',
    redditUserAgent: 'NovaScan/1.0',
  },
};

export default function SettingsPage() {
  const { theme } = useTheme();
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [saved, setSaved] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with default preferences to ensure all fields exist
      setPreferences({
        ...defaultPreferences,
        ...parsed,
        api: {
          ...defaultPreferences.api,
          ...(parsed.api || {}),
        },
      });
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setPreferences(defaultPreferences);
    localStorage.removeItem('userPreferences');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0f0a08]' : 'bg-[#faf8f5]'}`}>
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className={`rounded-xl border p-6 sm:p-8 ${
          theme === 'dark' 
            ? 'bg-[#1f1a17] border-[#4a3824]' 
            : 'bg-white border-[#e8dcc8]'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <Cog6ToothIcon className={`w-8 h-8 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-700'}`} />
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-amber-100' : 'text-gray-900'}`}>
              Settings
            </h1>
          </div>

          {/* Notifications Section */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BellIcon className={`w-6 h-6 ${theme === 'dark' ? 'text-amber-300' : 'text-amber-600'}`} />
              <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-amber-200' : 'text-gray-800'}`}>
                Notifications
              </h2>
            </div>
            <div className="space-y-3 ml-8">
              <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                preferences.notifications.emailAlerts
                  ? theme === 'dark' ? 'border-amber-600 bg-amber-900/20' : 'border-amber-600 bg-amber-50'
                  : theme === 'dark' ? 'border-[#4a3824] hover:border-amber-700' : 'border-gray-300 hover:border-amber-400'
              }`}>
                <input
                  type="checkbox"
                  checked={preferences.notifications.emailAlerts}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    notifications: { ...preferences.notifications, emailAlerts: e.target.checked }
                  })}
                  className="w-5 h-5 rounded border-gray-300"
                />
                <span className={`font-medium ${theme === 'dark' ? 'text-[#e8dcc8]' : 'text-gray-700'}`}>
                  Email alerts for important updates
                </span>
              </label>
              <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                preferences.notifications.trendingTopics
                  ? theme === 'dark' ? 'border-amber-600 bg-amber-900/20' : 'border-amber-600 bg-amber-50'
                  : theme === 'dark' ? 'border-[#4a3824] hover:border-amber-700' : 'border-gray-300 hover:border-amber-400'
              }`}>
                <input
                  type="checkbox"
                  checked={preferences.notifications.trendingTopics}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    notifications: { ...preferences.notifications, trendingTopics: e.target.checked }
                  })}
                  className="w-5 h-5 rounded border-gray-300"
                />
                <span className={`font-medium ${theme === 'dark' ? 'text-[#e8dcc8]' : 'text-gray-700'}`}>
                  Notify me about trending topics
                </span>
              </label>
              <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                preferences.notifications.weeklyDigest
                  ? theme === 'dark' ? 'border-amber-600 bg-amber-900/20' : 'border-amber-600 bg-amber-50'
                  : theme === 'dark' ? 'border-[#4a3824] hover:border-amber-700' : 'border-gray-300 hover:border-amber-400'
              }`}>
                <input
                  type="checkbox"
                  checked={preferences.notifications.weeklyDigest}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    notifications: { ...preferences.notifications, weeklyDigest: e.target.checked }
                  })}
                  className="w-5 h-5 rounded border-gray-300"
                />
                <span className={`font-medium ${theme === 'dark' ? 'text-[#e8dcc8]' : 'text-gray-700'}`}>
                  Weekly digest email
                </span>
              </label>
            </div>
          </section>

          {/* Search Preferences Section */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <MagnifyingGlassIcon className={`w-6 h-6 ${theme === 'dark' ? 'text-amber-300' : 'text-amber-600'}`} />
              <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-amber-200' : 'text-gray-800'}`}>
                Search Preferences
              </h2>
            </div>
            <div className="space-y-4 ml-8">
              <div>
                <label className={`block mb-3 font-medium ${theme === 'dark' ? 'text-amber-200' : 'text-gray-800'}`}>
                  Default Platforms
                </label>
                <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-[#d4c5ae]' : 'text-gray-600'}`}>
                  Select which platforms to search by default. You can always change this per search.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {['reddit', 'hackernews', 'producthunt', 'youtube'].map((platform) => (
                    <label 
                      key={platform} 
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        preferences.search.defaultPlatforms.includes(platform)
                          ? theme === 'dark'
                            ? 'border-amber-600 bg-amber-900/20'
                            : 'border-amber-600 bg-amber-50'
                          : theme === 'dark'
                            ? 'border-[#4a3824] hover:border-amber-700'
                            : 'border-gray-300 hover:border-amber-400'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={preferences.search.defaultPlatforms.includes(platform)}
                        onChange={(e) => {
                          const platforms = e.target.checked
                            ? [...preferences.search.defaultPlatforms, platform]
                            : preferences.search.defaultPlatforms.filter(p => p !== platform);
                          setPreferences({
                            ...preferences,
                            search: { ...preferences.search, defaultPlatforms: platforms }
                          });
                        }}
                        className="w-5 h-5 rounded border-gray-300"
                      />
                      <span className={`font-medium ${theme === 'dark' ? 'text-[#e8dcc8]' : 'text-gray-700'}`}>
                        {platform === 'hackernews' ? 'Hacker News' : 
                         platform === 'producthunt' ? 'Product Hunt' :
                         platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className={`block mb-3 font-medium ${theme === 'dark' ? 'text-amber-200' : 'text-gray-800'}`}>
                  Results per page
                </label>
                <select
                  value={preferences.search.resultsPerPage}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    search: { ...preferences.search, resultsPerPage: Number(e.target.value) }
                  })}
                  aria-label="Results per page"
                  className={`px-4 py-2.5 rounded-lg border font-medium w-full max-w-xs ${
                    theme === 'dark'
                      ? 'bg-[#2a2520] border-[#4a3824] text-[#e8dcc8]'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value={10}>10 results</option>
                  <option value={20}>20 results</option>
                  <option value={50}>50 results</option>
                  <option value={100}>100 results</option>
                </select>
              </div>
              <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                preferences.search.enableReranking
                  ? theme === 'dark' ? 'border-amber-600 bg-amber-900/20' : 'border-amber-600 bg-amber-50'
                  : theme === 'dark' ? 'border-[#4a3824] hover:border-amber-700' : 'border-gray-300 hover:border-amber-400'
              }`}>
                <input
                  type="checkbox"
                  checked={preferences.search.enableReranking}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    search: { ...preferences.search, enableReranking: e.target.checked }
                  })}
                  className="w-5 h-5 rounded border-gray-300"
                />
                <div>
                  <span className={`font-medium block ${theme === 'dark' ? 'text-[#e8dcc8]' : 'text-gray-700'}`}>
                    Enable AI-powered reranking
                  </span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-[#d4c5ae]' : 'text-gray-600'}`}>
                    Slower but more relevant results
                  </span>
                </div>
              </label>
            </div>
          </section>

          {/* Analytics Section */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <ChartBarIcon className={`w-6 h-6 ${theme === 'dark' ? 'text-amber-300' : 'text-amber-600'}`} />
              <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-amber-200' : 'text-gray-800'}`}>
                Analytics
              </h2>
            </div>
            <div className="space-y-4 ml-8">
              <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                preferences.analytics.autoRefresh
                  ? theme === 'dark' ? 'border-amber-600 bg-amber-900/20' : 'border-amber-600 bg-amber-50'
                  : theme === 'dark' ? 'border-[#4a3824] hover:border-amber-700' : 'border-gray-300 hover:border-amber-400'
              }`}>
                <input
                  type="checkbox"
                  checked={preferences.analytics.autoRefresh}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    analytics: { ...preferences.analytics, autoRefresh: e.target.checked }
                  })}
                  className="w-5 h-5 rounded border-gray-300"
                />
                <span className={`font-medium ${theme === 'dark' ? 'text-[#e8dcc8]' : 'text-gray-700'}`}>
                  Auto-refresh analytics
                </span>
              </label>
              {preferences.analytics.autoRefresh && (
                <div className="ml-8">
                  <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-amber-200' : 'text-gray-800'}`}>
                    Refresh interval (seconds)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="300"
                    value={preferences.analytics.refreshInterval}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      analytics: { ...preferences.analytics, refreshInterval: Number(e.target.value) }
                    })}
                    aria-label="Refresh interval in seconds"
                    className={`px-4 py-2.5 rounded-lg border w-full max-w-xs font-medium ${
                      theme === 'dark'
                        ? 'bg-[#2a2520] border-[#4a3824] text-[#e8dcc8]'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              )}
              <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                preferences.analytics.showCharts
                  ? theme === 'dark' ? 'border-amber-600 bg-amber-900/20' : 'border-amber-600 bg-amber-50'
                  : theme === 'dark' ? 'border-[#4a3824] hover:border-amber-700' : 'border-gray-300 hover:border-amber-400'
              }`}>
                <input
                  type="checkbox"
                  checked={preferences.analytics.showCharts}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    analytics: { ...preferences.analytics, showCharts: e.target.checked }
                  })}
                  className="w-5 h-5 rounded border-gray-300"
                />
                <span className={`font-medium ${theme === 'dark' ? 'text-[#e8dcc8]' : 'text-gray-700'}`}>
                  Show charts and visualizations
                </span>
              </label>
            </div>
          </section>

          {/* Display Preferences Section */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <UserCircleIcon className={`w-6 h-6 ${theme === 'dark' ? 'text-amber-300' : 'text-amber-600'}`} />
              <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-amber-200' : 'text-gray-800'}`}>
                Display
              </h2>
            </div>
            <div className="space-y-3 ml-8">
              <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                preferences.display.compactView
                  ? theme === 'dark' ? 'border-amber-600 bg-amber-900/20' : 'border-amber-600 bg-amber-50'
                  : theme === 'dark' ? 'border-[#4a3824] hover:border-amber-700' : 'border-gray-300 hover:border-amber-400'
              }`}>
                <input
                  type="checkbox"
                  checked={preferences.display.compactView}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    display: { ...preferences.display, compactView: e.target.checked }
                  })}
                  className="w-5 h-5 rounded border-gray-300"
                />
                <span className={`font-medium ${theme === 'dark' ? 'text-[#e8dcc8]' : 'text-gray-700'}`}>
                  Compact view for search results
                </span>
              </label>
              <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                preferences.display.showMetadata
                  ? theme === 'dark' ? 'border-amber-600 bg-amber-900/20' : 'border-amber-600 bg-amber-50'
                  : theme === 'dark' ? 'border-[#4a3824] hover:border-amber-700' : 'border-gray-300 hover:border-amber-400'
              }`}>
                <input
                  type="checkbox"
                  checked={preferences.display.showMetadata}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    display: { ...preferences.display, showMetadata: e.target.checked }
                  })}
                  className="w-5 h-5 rounded border-gray-300"
                />
                <span className={`font-medium ${theme === 'dark' ? 'text-[#e8dcc8]' : 'text-gray-700'}`}>
                  Show post metadata (date, score, comments)
                </span>
              </label>
            </div>
          </section>

          {/* API Configuration Section */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <KeyIcon className={`w-6 h-6 ${theme === 'dark' ? 'text-amber-300' : 'text-amber-600'}`} />
              <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-amber-200' : 'text-gray-800'}`}>
                API Configuration
              </h2>
            </div>
            <div className="space-y-4 ml-8">
              <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-[#d4c5ae]' : 'text-gray-600'}`}>
                Configure API credentials for external services. These are stored locally in your browser.
              </p>
              
              <div>
                <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-amber-200' : 'text-gray-800'}`}>
                  Elasticsearch URL
                </label>
                <input
                  type="text"
                  value={preferences.api.elasticsearchUrl}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    api: { ...preferences.api, elasticsearchUrl: e.target.value }
                  })}
                  placeholder="https://your-elasticsearch-instance.com"
                  className={`w-full px-4 py-2.5 rounded-lg border font-mono text-sm ${
                    theme === 'dark'
                      ? 'bg-[#2a2520] border-[#4a3824] text-[#e8dcc8] placeholder-[#6b5d4f]'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-amber-200' : 'text-gray-800'}`}>
                  Google Cloud Project ID
                </label>
                <input
                  type="text"
                  value={preferences.api.googleCloudProjectId}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    api: { ...preferences.api, googleCloudProjectId: e.target.value }
                  })}
                  placeholder="your-project-id"
                  className={`w-full px-4 py-2.5 rounded-lg border font-mono text-sm ${
                    theme === 'dark'
                      ? 'bg-[#2a2520] border-[#4a3824] text-[#e8dcc8] placeholder-[#6b5d4f]'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-amber-200' : 'text-gray-800'}`}>
                  Google Application Credentials (JSON)
                </label>
                <div className="relative">
                  <textarea
                    value={preferences.api.googleCredentials}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      api: { ...preferences.api, googleCredentials: e.target.value }
                    })}
                    placeholder='{"type": "service_account", "project_id": "..."}'
                    rows={4}
                    className={`w-full px-4 py-2.5 rounded-lg border font-mono text-sm ${
                      showCredentials ? '' : 'filter blur-sm'
                    } ${
                      theme === 'dark'
                        ? 'bg-[#2a2520] border-[#4a3824] text-[#e8dcc8] placeholder-[#6b5d4f]'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCredentials(!showCredentials)}
                    className={`absolute top-2 right-2 p-2 rounded-lg transition-colors ${
                      theme === 'dark'
                        ? 'hover:bg-[#3d2f1f] text-amber-200'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                    aria-label={showCredentials ? 'Hide credentials' : 'Show credentials'}
                  >
                    {showCredentials ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-[#a89888]' : 'text-gray-500'}`}>
                  Service account JSON or base64-encoded credentials
                </p>
              </div>

              <div>
                <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-amber-200' : 'text-gray-800'}`}>
                  Reddit User Agent
                </label>
                <input
                  type="text"
                  value={preferences.api.redditUserAgent}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    api: { ...preferences.api, redditUserAgent: e.target.value }
                  })}
                  placeholder="NovaScan/1.0"
                  className={`w-full px-4 py-2.5 rounded-lg border font-mono text-sm ${
                    theme === 'dark'
                      ? 'bg-[#2a2520] border-[#4a3824] text-[#e8dcc8] placeholder-[#6b5d4f]'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-[#a89888]' : 'text-gray-500'}`}>
                  User agent string for Reddit API requests
                </p>
              </div>

              <div className={`p-4 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-amber-900/10 border-amber-800/30' 
                  : 'bg-amber-50 border-amber-200'
              }`}>
                <p className={`text-sm ${theme === 'dark' ? 'text-amber-200' : 'text-amber-900'}`}>
                  ⚠️ <strong>Security Note:</strong> API credentials are stored locally in your browser. 
                  Never share your credentials or use them on untrusted devices.
                </p>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-[#4a3824]">
            <button
              onClick={handleSave}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-amber-700 hover:bg-amber-800 text-white'
              }`}
            >
              Save Preferences
            </button>
            <button
              onClick={handleReset}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-[#2a2520] hover:bg-[#3a3530] text-[#e8dcc8] border border-[#4a3824]'
                  : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
              }`}
            >
              Reset to Default
            </button>
          </div>

          {saved && (
            <div className={`mt-4 p-3 rounded-lg ${
              theme === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'
            }`}>
              ✓ Preferences saved successfully!
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
