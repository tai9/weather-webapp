import { useState } from 'react';

import './App.css';

import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import SearchInput from './components/SearchInput';
import { useCurrentWeather } from './hooks/useCurrentWeather';
import { useWeatherForecast } from './hooks/useWeatherForecast';
import type { Coordinates } from './types/weather';

const SG_COORD = { lat: 1.36666666, lon: 103.8 };

function App() {
  console.log(import.meta.env.VITE_VERCEL_API_URL);

  const [coord, setCoord] = useState<Coordinates>(SG_COORD);
  const currentWeather = useCurrentWeather(coord);
  const weatherForecast = useWeatherForecast(coord);

  const handleSearch = (coord?: Coordinates) => {
    setCoord(coord || SG_COORD);
  };
  return (
    <>
      <div className='flex flex-col gap-6'>
        <h1 className='text-5xl font-bold'>WEATHER APP</h1>
        <SearchInput handleSearch={handleSearch} />
        <CurrentWeather data={currentWeather.data} isLoading={currentWeather.isFetching} />
        <Forecast data={weatherForecast.data} isLoading={weatherForecast.isFetching} />
      </div>
    </>
  );
}

export default App;
