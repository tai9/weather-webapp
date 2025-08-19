import { useQuery } from '@tanstack/react-query';

import axiosClient from '@/configs/axiosClient';
import type { Coordinates, ForecastData } from '@/types/weather';

export const useWeatherForecast = (coord: Coordinates) => {
  const query = useQuery({
    queryKey: ['WEATHER_FORECAST', coord],
    queryFn: async () => {
      const res = await axiosClient.get<ForecastData>(`/forecast?lat=${coord.lat}&lon=${coord.lon}&units=metric`);
      return res.data;
    }
  });
  return query;
};
