import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { Country } from '@/types/country';

export const useCountries = () => {
  const query = useQuery({
    queryKey: ['COUNTRIES'],
    queryFn: async () => {
      const url = import.meta.env.VITE_COUNTRIES_API_URL;

      const res = await axios.get<Country[]>(`${url}/all?fields=name,flags,latlng,cca2`);
      return res.data;
    },
    staleTime: Infinity
  });
  return query;
};
