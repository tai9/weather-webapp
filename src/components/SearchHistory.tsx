import { useEffect, useState } from 'react';
import Card from './Card';
import type { Country } from '@/types/country';
import SearchItem from './SearchItem';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { clearRecentHistories } from '@/utils/history';
const RECENT_SEARCH_KEY = 'RECENT_SEARCH';

const SearchHistory = () => {
  const [recentCountries, setRecentCountries] = useState<Country[]>([]);

  useEffect(() => {
    const recents = localStorage.getItem(RECENT_SEARCH_KEY);
    if (recents) {
      setRecentCountries(JSON.parse(recents));
    }
  }, []);

  const handleDeleteHistory = (country: Country) => {
    setRecentCountries((prev) => {
      const recents = prev.filter((x) => x.cca2 !== country.cca2);
      localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(recents));
      return recents;
    });
  };

  const onClearAll = () => {
    setRecentCountries(() => {
      clearRecentHistories();
      return [];
    });
  };

  return (
    <div className='flex flex-col items-start gap-2'>
      <div className='flex justify-between w-full items-center'>
        <span className='font-semibold'>Search History</span>
        <span className='cursor-pointer text-xs text-gray-500 font-semibold' onClick={onClearAll}>
          Clear all
        </span>
      </div>
      <Card className='w-full gap-0'>
        {recentCountries.length > 0 ? (
          recentCountries.map((country) => (
            <Link to={`${ROUTES.HOME}?lat=${country.latlng[0]}&lng=${country.latlng[1]}`} className='w-full'>
              <SearchItem key={country.cca2} country={country} allowClear onClear={handleDeleteHistory} />
            </Link>
          ))
        ) : (
          <div className='text-sm text-gray-500'>No Data</div>
        )}
      </Card>
    </div>
  );
};
export default SearchHistory;
