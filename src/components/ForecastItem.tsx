import moment from 'moment';

import type { WeatherItem } from '@/types/weather';

type Props = {
  data: WeatherItem;
};
const ForecastItem = ({ data }: Props) => {
  return (
    <div key={data.dt} className='flex gap-4 flex-col w-full'>
      <div className='flex gap-8 justify-between items-center'>
        <div className='flex gap-4 items-center'>
          <div className='font-bold'>{moment(data.dt * 1000).format('HH:mm')}</div>
          <div className=' text-gray-500 text-sm font-medium flex items-center'>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt='' />
            {data.main.temp_min} / {data.main.temp_max}&deg;C
          </div>
        </div>
        <div className='font-bold'>{data.weather[0].description}</div>
      </div>
    </div>
  );
};

export default ForecastItem;
