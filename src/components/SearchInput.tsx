import { useCallback, useEffect, useMemo, useState } from 'react';
import Autosuggest from 'react-autosuggest';

import { useCountries } from '@/hooks/useCountries';
import type { Country } from '@/types/country';
import type { Coordinates } from '@/types/weather';

const RECENT_KEY = 'RECENT';

type Props = {
  handleSearch: (coord?: Coordinates) => void;
};

const SearchInput = ({ handleSearch }: Props) => {
  const countries = useCountries();

  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  const [showRecents, setShowRecents] = useState(false);
  const [recentCountries, setRecentCountries] = useState<Country[]>([]);

  useEffect(() => {
    const recents = localStorage.getItem(RECENT_KEY);
    if (recents) {
      setRecentCountries(JSON.parse(recents));
    }
  }, []);

  const findCountry = useCallback(
    (search: string) => {
      const cca2 = search.split(', ')[1];
      const country = countries.data?.find((x) => x.cca2 === cca2);
      return country;
    },
    [countries.data]
  );

  const isError = useMemo(() => {
    const country = findCountry(value);
    return !country && suggestions.length === 0 && !!value;
  }, [value, suggestions, findCountry]);

  const onSearch = () => {
    if (!value) {
      handleSearch(undefined);
      return;
    }
    const country = findCountry(value);
    if (country) {
      const [lat, lon] = country.latlng;
      handleSearch({ lat, lon });
      setRecentCountries((prev) => {
        const arr = prev.filter((x) => x.cca2 !== country.cca2);
        const recents = [country, ...arr];
        localStorage.setItem('RECENT', JSON.stringify(recents));
        return recents;
      });
    }
  };

  const onChange = (_: unknown, { newValue }: { newValue: string }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(() => getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions(recentCountries);
  };

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? recentCountries
      : countries?.data?.filter((lang) => lang.name.common.toLowerCase().slice(0, inputLength) === inputValue) || [];
  };

  const getSuggestionValue = (suggestion: Country) => `${suggestion.name.common}, ${suggestion.cca2}`;

  const renderSuggestion = (suggestion: Country, clearable?: boolean) => (
    <div className='p-3  bg-white w-full border-1 shadow-md flex gap-4 cursor-pointer justify-between'>
      <div className='flex gap-3'>
        <img width={32} src={suggestion.flags.svg} alt='' />
        <span>
          {suggestion.name.common}, {suggestion.cca2}
        </span>
      </div>
      {clearable && (
        <div
          className=''
          onClick={() => {
            setRecentCountries((prev) => {
              const recents = prev.filter((x) => x.cca2 !== suggestion.cca2);
              localStorage.setItem('RECENT', JSON.stringify(recents));
              return recents;
            });
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='24' height='24' viewBox='0 0 48 48'>
            <path d='M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 14.640625 6 C 12.803372 6 11.082924 6.9194511 10.064453 8.4492188 L 7.6972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 8.2636719 15 A 1.50015 1.50015 0 0 0 8.6523438 15.007812 L 11.125 38.085938 C 11.423352 40.868277 13.795836 43 16.59375 43 L 31.404297 43 C 34.202211 43 36.574695 40.868277 36.873047 38.085938 L 39.347656 15.007812 A 1.50015 1.50015 0 0 0 39.728516 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 40.302734 12 L 37.935547 8.4492188 C 36.916254 6.9202798 35.196001 6 33.359375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 14.640625 9 L 33.359375 9 C 34.196749 9 34.974746 9.4162203 35.439453 10.113281 L 36.697266 12 L 11.302734 12 L 12.560547 10.113281 A 1.50015 1.50015 0 0 0 12.5625 10.111328 C 13.025982 9.4151428 13.801878 9 14.640625 9 z M 11.669922 15 L 36.330078 15 L 33.890625 37.765625 C 33.752977 39.049286 32.694383 40 31.404297 40 L 16.59375 40 C 15.303664 40 14.247023 39.049286 14.109375 37.765625 L 11.669922 15 z'></path>
          </svg>
        </div>
      )}
    </div>
  );
  return (
    <div className=' relative h-[40px] mb-2'>
      <div className='flex gap-4 justify-between absolute w-full'>
        <div className='flex flex-col w-full items-start'>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={(s) => renderSuggestion(s)}
            inputProps={{
              placeholder: 'Search country here...',
              value,
              onChange: onChange,
              onFocus() {
                setShowRecents(true);
              }
            }}
            theme={{
              container: 'w-full relative',
              input: 'p-2 bg-white w-full rounded-md focus:outline-none'
            }}
          />
          {showRecents && !value && (
            <div className=' bg-white rounded-md shadow w-full mt-2'>
              {recentCountries.map((x) => (
                <div key={x.cca2} onClick={() => setValue(getSuggestionValue(x))}>
                  {renderSuggestion(x, true)}
                </div>
              ))}
            </div>
          )}
          {isError && <p className='text-red-400 text-sm'>Invalid country</p>}
        </div>

        <button
          onClick={onSearch}
          disabled={isError || !value}
          className='relative disabled:bg-slate-300 max-h-[40px] bg-blue-500 text-white rounded-md py-2 px-4 font-bold'
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
