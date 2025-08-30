import { WORLD_BANK_API_URL } from '../constants';
import { type Country, type DataPoint, type Region } from '../types';

const fetchData = async <T,>(url: string): Promise<T | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
    const data = await response.json();
    // World Bank API returns metadata in the first element and data in the second
    if (Array.isArray(data) && data.length > 1) {
      return data[1] as T;
    }
    // Handle cases where API returns just metadata (e.g. no results)
    if (Array.isArray(data) && data.length <=1) {
        return null;
    }
    throw new Error('Invalid API response format');
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

export const getCountries = async (): Promise<Country[]> => {
  const url = `${WORLD_BANK_API_URL}/country?format=json&per_page=300`;
  const countries = await fetchData<Country[]>(url);
  // Filter out aggregates and regions which have non-country region codes
  return (countries || []).filter(c => c.region.iso2code !== 'NA');
};

export const getCountriesForRegion = async (regionCode: string): Promise<Country[]> => {
    const url = `${WORLD_BANK_API_URL}/country?region=${regionCode}&format=json&per_page=300`;
    const countries = await fetchData<Country[]>(url);
    return countries || [];
}

export const getRegions = async (): Promise<Region[]> => {
    const url = `${WORLD_BANK_API_URL}/region?format=json`;
    return (await fetchData<Region[]>(url)) || [];
}

export const getIndicatorDataForCountry = async (countryCode: string, indicatorId: string, startDate: string = '2000', endDate: string = '2023'): Promise<DataPoint[]> => {
  const url = `${WORLD_BANK_API_URL}/country/${countryCode}/indicator/${indicatorId}?format=json&per_page=100&date=${startDate}:${endDate}`;
  const result = await fetchData<DataPoint[]>(url);
  return result || []; // Ensure we always return an array
};

export const getIndicatorDataForRegion = async (regionCode: string, indicatorId: string, year: string): Promise<DataPoint[]> => {
    // Step 1: Fetch the list of countries for the selected region.
    const countriesInRegion = await getCountriesForRegion(regionCode);
    if (!countriesInRegion || countriesInRegion.length === 0) {
        return [];
    }
    
    // Step 2: Chunk country codes to avoid creating a URL that is too long.
    const allCountryCodes = countriesInRegion.map(c => c.id);
    const CHUNK_SIZE = 30; // Max number of countries per API request
    const chunkedCountryCodes: string[][] = [];
    for (let i = 0; i < allCountryCodes.length; i += CHUNK_SIZE) {
        chunkedCountryCodes.push(allCountryCodes.slice(i, i + CHUNK_SIZE));
    }

    // Step 3: Create and execute a fetch promise for each chunk.
    const promises = chunkedCountryCodes.map(chunk => {
        const countryCodesString = chunk.join(';');
        const indicatorDataUrl = `${WORLD_BANK_API_URL}/country/${countryCodesString}/indicator/${indicatorId}?format=json&per_page=500&date=${year}`;
        return fetchData<DataPoint[]>(indicatorDataUrl);
    });

    try {
        // Await all chunk requests to complete in parallel.
        const results = await Promise.all(promises);
        
        // Step 4: Combine the results from all chunks into a single array.
        const combinedData: DataPoint[] = [];
        for (const result of results) {
            if (result) {
                combinedData.push(...result);
            }
        }
        return combinedData;
    } catch (error) {
        console.error("One or more chunked API requests failed for regional indicator data:", error);
        throw error; // Propagate the error to be handled by the UI
    }
}