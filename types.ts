export interface Country {
  id: string;
  iso2Code: string;
  name: string;
  // FIX: Add 'region' property to match World Bank API response and fix type error in services/api.ts
  region: {
    id: string;
    iso2code: string;
    value: string;
  };
}

export interface Region {
  code: string;
  name: string;
}

export interface Indicator {
  id: string;
  name: string;
}

export interface DataPoint {
  country: {
    id: string;
    value: string;
  };
  countryiso3code: string;
  date: string;
  value: number | null;
  unit: string;
  obs_status: string;
  decimal: number;
}

export interface ChartData {
  year: string;
  value: number | null;
  happinessScore?: number | null;
}

export interface RegionalChartData {
  country: string;
  value: number | null;
}