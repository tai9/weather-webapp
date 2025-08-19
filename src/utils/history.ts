import type { Country } from '@/types/country';

export const RECENT_SEARCH_KEY = 'RECENT_SEARCH';

export const getRecentHistory = () => {
  const currentData = localStorage.getItem(RECENT_SEARCH_KEY);
  return currentData ? (JSON.parse(currentData) as Country[]) : [];
};

export const updateRecentHistories = (country: Country) => {
  const currentData = getRecentHistory();
  const arr = currentData.filter((x) => x.cca2 !== country.cca2);
  const recents = [country, ...arr];
  localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(recents));
  return recents;
};

export const clearRecentHistories = () => {
  localStorage.removeItem(RECENT_SEARCH_KEY);
};
