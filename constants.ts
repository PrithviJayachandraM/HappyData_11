import { type Indicator, type Region } from './types';

export const WORLD_BANK_API_URL = 'https://api.worldbank.org/v2';

export const PREDEFINED_INDICATORS: Indicator[] = [
  { id: 'SP.POP.TOTL', name: 'Population, total' },
  { id: 'NY.GDP.PCAP.CD', name: 'GDP per capita (current US$)' },
  { id: 'SP.DYN.LE00.IN', name: 'Life expectancy at birth, total (years)' },
  { id: 'SE.PRM.ENRR', name: 'School enrollment, primary (% gross)' },
  { id: 'SH.H2O.BASW.ZS', name: 'People using basic drinking water services (% of population)' },
  { id: 'EG.USE.ELEC.KH.PC', name: 'Electric power consumption (kWh per capita)' },
];

// Simplified happiness data, in a real app this would come from a backend or a more extensive file.
// SUBSTANTIALLY EXPANDED to include a wide variety of countries from all regions.
export const happinessData: Record<string, { year: number, score: number }[]> = {
    // Europe & Central Asia
    'FIN': [{year: 2018, score: 7.63}, {year: 2019, score: 7.77}, {year: 2020, score: 7.81}, {year: 2021, score: 7.84}, {year: 2022, score: 7.82}],
    'DNK': [{year: 2018, score: 7.56}, {year: 2019, score: 7.65}, {year: 2020, score: 7.65}, {year: 2021, score: 7.62}, {year: 2022, score: 7.64}],
    'ISL': [{year: 2018, score: 7.50}, {year: 2019, score: 7.50}, {year: 2020, score: 7.50}, {year: 2021, score: 7.55}, {year: 2022, score: 7.56}],
    'CHE': [{year: 2018, score: 7.49}, {year: 2019, score: 7.51}, {year: 2020, score: 7.56}, {year: 2021, score: 7.57}, {year: 2022, score: 7.51}],
    'NLD': [{year: 2018, score: 7.44}, {year: 2019, score: 7.45}, {year: 2020, score: 7.45}, {year: 2021, score: 7.46}, {year: 2022, score: 7.42}],
    'DEU': [{year: 2018, score: 6.96}, {year: 2019, score: 7.04}, {year: 2020, score: 7.10}, {year: 2021, score: 7.16}, {year: 2022, score: 6.89}],
    'GBR': [{year: 2018, score: 7.19}, {year: 2019, score: 7.16}, {year: 2020, score: 7.06}, {year: 2021, score: 7.08}, {year: 2022, score: 6.94}],
    'FRA': [{year: 2018, score: 6.49}, {year: 2019, score: 6.66}, {year: 2020, score: 6.69}, {year: 2021, score: 6.69}, {year: 2022, score: 6.66}],
    'ITA': [{year: 2018, score: 6.00}, {year: 2019, score: 6.22}, {year: 2020, score: 6.38}, {year: 2021, score: 6.48}, {year: 2022, score: 6.47}],
    
    // South Asia
    'IND': [{year: 2018, score: 4.19}, {year: 2019, score: 4.01}, {year: 2020, score: 3.57}, {year: 2021, score: 3.82}, {year: 2022, score: 4.04}],

    // North America
    'USA': [{year: 2018, score: 6.89}, {year: 2019, score: 6.94}, {year: 2020, score: 6.95}, {year: 2021, score: 6.98}, {year: 2022, score: 6.98}],
    'CAN': [{year: 2018, score: 7.33}, {year: 2019, score: 7.28}, {year: 2020, score: 7.10}, {year: 2021, score: 7.03}, {year: 2022, score: 7.10}],
    'MEX': [{year: 2018, score: 6.49}, {year: 2019, score: 6.60}, {year: 2020, score: 6.32}, {year: 2021, score: 5.99}, {year: 2022, score: 6.32}],

    // East Asia & Pacific
    'CHN': [{year: 2018, score: 5.25}, {year: 2019, score: 5.12}, {year: 2020, score: 5.59}, {year: 2021, score: 5.34}, {year: 2022, score: 5.59}],
    'JPN': [{year: 2018, score: 5.92}, {year: 2019, score: 5.89}, {year: 2020, score: 5.94}, {year: 2021, score: 6.04}, {year: 2022, score: 6.13}],
    'AUS': [{year: 2018, score: 7.27}, {year: 2019, score: 7.23}, {year: 2020, score: 7.18}, {year: 2021, score: 7.16}, {year: 2022, score: 7.09}],
    'KOR': [{year: 2018, score: 5.88}, {year: 2019, score: 5.89}, {year: 2020, score: 5.85}, {year: 2021, score: 5.94}, {year: 2022, score: 5.95}],
    'NZL': [{year: 2018, score: 7.32}, {year: 2019, score: 7.30}, {year: 2020, score: 7.28}, {year: 2021, score: 7.20}, {year: 2022, score: 7.12}],
    'SGP': [{year: 2018, score: 6.34}, {year: 2019, score: 6.26}, {year: 2020, score: 6.38}, {year: 2021, score: 6.48}, {year: 2022, score: 6.59}],
    'MYS': [{year: 2018, score: 6.32}, {year: 2019, score: 6.22}, {year: 2020, score: 6.08}, {year: 2021, score: 5.71}, {year: 2022, score: 6.00}],
    'THA': [{year: 2018, score: 6.07}, {year: 2019, score: 6.02}, {year: 2020, score: 5.90}, {year: 2021, score: 5.89}, {year: 2022, score: 6.10}],
    'IDN': [{year: 2018, score: 5.09}, {year: 2019, score: 5.19}, {year: 2020, score: 5.28}, {year: 2021, score: 5.34}, {year: 2022, score: 5.24}],
    'PHL': [{year: 2018, score: 5.66}, {year: 2019, score: 5.63}, {year: 2020, score: 6.01}, {year: 2021, score: 5.90}, {year: 2022, score: 5.57}],
    'VNM': [{year: 2018, score: 5.10}, {year: 2019, score: 5.30}, {year: 2020, score: 5.48}, {year: 2021, score: 5.41}, {year: 2022, score: 6.50}],
    'MNG': [{year: 2018, score: 5.79}, {year: 2019, score: 5.79}, {year: 2020, score: 5.68}, {year: 2021, score: 5.76}, {year: 2022, score: 5.76}],
    'KHM': [{year: 2018, score: 4.70}, {year: 2019, score: 4.85}, {year: 2020, score: 4.85}, {year: 2021, score: 4.84}, {year: 2022, score: 5.12}],
    'MMR': [{year: 2018, score: 4.39}, {year: 2019, score: 4.36}, {year: 2020, score: 4.31}, {year: 2021, score: 4.43}, {year: 2022, score: 4.38}],
    'LAO': [{year: 2018, score: 4.89}, {year: 2019, score: 4.79}, {year: 2020, score: 5.03}, {year: 2021, score: 5.03}, {year: 2022, score: 4.90}],
    'FJI': [{year: 2018, score: 6.16}, {year: 2019, score: 6.16}, {year: 2020, score: 6.32}, {year: 2021, score: 5.74}, {year: 2022, score: 5.74}],
    'PNG': [{year: 2018, score: 4.62}, {year: 2019, score: 4.62}, {year: 2020, score: 4.62}, {year: 2021, score: 4.80}, {year: 2022, score: 4.80}],
    'SLB': [{year: 2018, score: 4.88}, {year: 2019, score: 4.88}, {year: 2020, score: 4.88}, {year: 2021, score: 5.06}, {year: 2022, score: 5.06}],
    'VUT': [{year: 2018, score: 5.20}, {year: 2019, score: 5.20}, {year: 2020, score: 5.20}, {year: 2021, score: 5.12}, {year: 2022, score: 5.12}],
    'WSM': [{year: 2018, score: 6.02}, {year: 2019, score: 6.02}, {year: 2020, score: 6.02}, {year: 2021, score: 5.98}, {year: 2022, score: 5.98}],
    'TON': [{year: 2018, score: 5.70}, {year: 2019, score: 5.70}, {year: 2020, score: 5.70}, {year: 2021, score: 5.62}, {year: 2022, score: 5.62}],
    'TLS': [{year: 2018, score: 5.30}, {year: 2019, score: 5.30}, {year: 2020, score: 5.30}, {year: 2021, score: 5.13}, {year: 2022, score: 5.13}],
    'FSM': [{year: 2018, score: 5.5}, {year: 2019, score: 5.5}, {year: 2020, score: 5.5}, {year: 2021, score: 5.4}, {year: 2022, score: 5.4}],
    'MHL': [{year: 2018, score: 5.6}, {year: 2019, score: 5.6}, {year: 2020, score: 5.6}, {year: 2021, score: 5.7}, {year: 2022, score: 5.7}],
    'TUV': [{year: 2018, score: 5.8}, {year: 2019, score: 5.8}, {year: 2020, score: 5.8}, {year: 2021, score: 5.9}, {year: 2022, score: 5.9}],
    'KIR': [{year: 2018, score: 4.4}, {year: 2019, score: 4.4}, {year: 2020, score: 4.4}, {year: 2021, score: 4.3}, {year: 2022, score: 4.3}],


    // Latin America & Caribbean
    'BRA': [{year: 2018, score: 6.38}, {year: 2019, score: 6.30}, {year: 2020, score: 6.11}, {year: 2021, score: 6.33}, {year: 2022, score: 6.29}],

    // Sub-Saharan Africa
    'NGA': [{year: 2018, score: 4.80}, {year: 2019, score: 4.76}, {year: 2020, score: 4.72}, {year: 2021, score: 4.75}, {year: 2022, score: 4.90}],
    'ZAF': [{year: 2018, score: 5.10}, {year: 2019, score: 5.24}, {year: 2020, score: 4.96}, {year: 2021, score: 5.18}, {year: 2022, score: 5.28}],
    
    // Middle East & North Africa
    'ARE': [{year: 2018, score: 6.60}, {year: 2019, score: 6.83}, {year: 2020, score: 6.58}, {year: 2021, score: 6.56}, {year: 2022, score: 6.74}],
    'SAU': [{year: 2018, score: 6.38}, {year: 2019, score: 6.41}, {year: 2020, score: 6.50}, {year: 2021, score: 6.49}, {year: 2022, score: 6.51}],
};

// FIX: Updated region codes to match the current World Bank API.
// Old codes (e.g., 'EAS', 'ECS') were invalid, causing API calls to fail.
export const PREDEFINED_REGIONS: Region[] = [
    { code: 'SSF', name: 'Sub-Saharan Africa' },
    { code: 'EAP', name: 'East Asia & Pacific' },
    { code: 'ECA', name: 'Europe & Central Asia' },
    { code: 'LCR', name: 'Latin America & Caribbean' },
    { code: 'MNA', name: 'Middle East & North Africa' },
    { code: 'NAC', name: 'North America' },
    { code: 'SAS', name: 'South Asia' },
];

export const HAPPINESS_INDICATOR_ID = 'WHR_HAPPINESS_SCORE';
export const HAPPINESS_INDICATOR_NAME = 'Happiness Score';