// useAutocomplete.ts
import { useQuery } from '@tanstack/react-query';

interface Suggestion {
  id: string;
  name: string;
  category: string;
  value: number | string;
}

const fetchSuggestions = async (query: string): Promise<Suggestion[]> => {
  const response = await fetch(`https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete?name=${query}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};


export const useAutocomplete = (query: string) => {
 return useQuery({
   queryKey: ['autocomplete', query],
   queryFn: () => fetchSuggestions(query),
   enabled: !!query,
 });
};