import { PARSE_API_BASE_URL, PARSE_APPLICATION_ID, PARSE_MASTER_KEY } from '@/config/const';

interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

/**
 * Fetch data from Parse API
 * @param urlPath
 * @param options
 */
export const fetchParseApi = async (urlPath: `/${string}`, options: FetchOptions = {}): Promise<Response> => {
  const { headers, ...restOptions } = options;
  const mergedHeaders = {
    ...headers,
    // override with headers
    'X-Parse-Application-Id': PARSE_APPLICATION_ID,
    'X-Parse-Master-Key': PARSE_MASTER_KEY
  };

  const response = await fetch(`${PARSE_API_BASE_URL}${urlPath}`, {
    ...restOptions,
    headers: mergedHeaders
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response;
};
