import { useState, useEffect } from 'react';

export interface UserPreferences {
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
}

export const defaultPreferences: UserPreferences = {
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
};

export function usePreferences() {
  const [preferences, setPreferencesState] = useState<UserPreferences>(defaultPreferences);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        setPreferencesState(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse preferences:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  const setPreferences = (newPreferences: UserPreferences) => {
    setPreferencesState(newPreferences);
    localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
  };

  const resetPreferences = () => {
    setPreferencesState(defaultPreferences);
    localStorage.removeItem('userPreferences');
  };

  return {
    preferences,
    setPreferences,
    resetPreferences,
    isLoaded,
  };
}
