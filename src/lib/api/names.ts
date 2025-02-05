import { fetchParseApi } from '@/lib/api/fetchParseApi';
import { useQuery } from '@tanstack/react-query';

interface NameRecord {
  objectId: string;
  Name: string;
  Gender: 'male' | 'female';
  createdAt: string;
  updatedAt: string;
}

interface NamesResponse {
  results: NameRecord[];
}

const fetchNames = async (max: number): Promise<NamesResponse> => {
  const limit = Number.isInteger(max) && max > 0 ? max : 10;
  const response = await fetchParseApi(`/classes/Complete_List_Names?limit=${limit}`);
  return await response.json();
};

/**
 * Fetch names from Parse API hook
 * @param limit
 */
export const useNames = (limit: number = 10) => {
  return useQuery({
    queryFn: () => fetchNames(limit),
    queryKey: ['names']
  });
};
