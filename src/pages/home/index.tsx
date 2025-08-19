import CurrentWeather from '@/components/CurrentWeather';
import Forecast from '@/components/Forecast';
import Skeleton from '@/components/Skeleton';
import { ROUTES } from '@/constants';
import { useCountries } from '@/hooks/useCountries';
import { useCurrentWeather } from '@/hooks/useCurrentWeather';
import { useWeatherForecast } from '@/hooks/useWeatherForecast';
import type { Country } from '@/types/country';
import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const SG_COORD = { latlng: [1.36666666, 103.8], name: { common: 'Singapore' }, cca2: 'SG' };

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const { data: countries = [], isLoading } = useCountries();
  const currentCountry = useMemo(() => {
    if (!lat || !lng) {
      return SG_COORD as Country;
    }
    const country = countries.find((item) => item.latlng[0] === +lat && item.latlng[1] === +lng);
    return country || (SG_COORD as Country);
  }, [countries, lat, lng]);

  const currentWeather = useCurrentWeather({ lat: currentCountry.latlng[0], lng: currentCountry.latlng[1] });
  const weatherForecast = useWeatherForecast({ lat: currentCountry.latlng[0], lng: currentCountry.latlng[1] });

  if (isLoading) return <Skeleton />;

  return (
    <div className='flex flex-col gap-6'>
      <Link
        to={ROUTES.SEARCH}
        className='flex gap-2 items-center bg-white py-2 px-4 shadow-2xl rounded-xl cursor-pointer'
      >
        <img src='/icon_pin.png' alt='pin' width={18} />
        <span className='flex-1 text-left font-bold'>{`${currentCountry?.name.common}, ${currentCountry?.cca2}`}</span>
        <img src='/icon_search.png' alt='pin' width={18} />
      </Link>
      <CurrentWeather data={currentWeather.data} isLoading={currentWeather.isFetching} />
      <Forecast data={weatherForecast.data} isLoading={weatherForecast.isFetching} />
    </div>
  );
};
export default HomePage;
