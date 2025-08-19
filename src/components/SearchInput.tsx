import { useCallback, useMemo, useState } from 'react';
import Autosuggest from 'react-autosuggest';

import { useCountries } from '@/hooks/useCountries';
import type { Country } from '@/types/country';
import SearchItem from './SearchItem';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { updateRecentHistories } from '@/utils/history';

const SearchInput = () => {
  const countries = useCountries();

  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<Country[]>([]);

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

  const navigate = useNavigate();

  const onSearch = () => {
    if (!value) {
      return;
    }
    const country = findCountry(value);
    if (country) {
      const [lat, lng] = country.latlng;
      updateRecentHistories(country);
      navigate(`${ROUTES.HOME}?lat=${lat}&lng=${lng}`);
    }
  };

  const onChange = (_: unknown, { newValue }: { newValue: string }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(() => getSuggestions(value));
  };

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    if (inputLength === 0) return [];
    return countries?.data?.filter((lang) => lang.name.common.toLowerCase().slice(0, inputLength) === inputValue) || [];
  };

  const getSuggestionValue = (suggestion: Country) => `${suggestion.name.common}, ${suggestion.cca2}`;

  return (
    <div className='relative h-[40px]'>
      <div className='flex gap-4 justify-between absolute w-full'>
        <div className='flex flex-col w-full items-start gap-1'>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={(country) => <SearchItem country={country} />}
            inputProps={{
              placeholder: 'Search country here...',
              value,
              onChange: onChange
            }}
            theme={{
              container: 'w-full relative',
              input: 'p-2 bg-white w-full rounded-md focus:outline-none'
            }}
          />
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
