
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getCountries, getIndicatorDataForCountry } from '../services/api';
import { PREDEFINED_INDICATORS, happinessData } from '../constants';
import { type Country, type ChartData } from '../types';
import { LoadingSpinner } from './common/LoadingSpinner';
import { ErrorMessage } from './common/ErrorMessage';
import { CustomSelect } from './common/CustomSelect';
import { ChartCard } from './common/ChartCard';

export const CountryView: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('USA');
  const [selectedIndicator, setSelectedIndicator] = useState<string>(PREDEFINED_INDICATORS[1].id);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedCountries = await getCountries();
        setCountries(fetchedCountries);
      } catch (err) {
        setError('Failed to fetch list of countries. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!selectedCountry || !selectedIndicator) return;
    
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);
      try {
        const indicatorResponse = await getIndicatorDataForCountry(selectedCountry, selectedIndicator);
        const countryHappinessData = happinessData[selectedCountry] || [];
        
        const combinedData: Record<string, Partial<ChartData>> = {};

        indicatorResponse.forEach(d => {
            if(d.value !== null) {
                combinedData[d.date] = { ...combinedData[d.date], year: d.date, value: d.value };
            }
        });

        countryHappinessData.forEach(d => {
            const yearStr = d.year.toString();
            combinedData[yearStr] = { ...combinedData[yearStr], year: yearStr, happinessScore: d.score };
        });

        const sortedData = Object.values(combinedData)
            .filter(d => d.year)
            .sort((a, b) => parseInt(a.year!) - parseInt(b.year!)) as ChartData[];
            
        setChartData(sortedData);
      } catch (err) {
        setError(`Failed to fetch data for ${selectedIndicator}. Please try a different indicator or country.`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [selectedCountry, selectedIndicator]);

  const selectedCountryName = useMemo(() => countries.find(c => c.id === selectedCountry)?.name || '', [countries, selectedCountry]);
  const selectedIndicatorName = useMemo(() => PREDEFINED_INDICATORS.find(i => i.id === selectedIndicator)?.name || '', [selectedIndicator]);
  
  const handleCountryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCountry(e.target.value), []);
  const handleIndicatorChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setSelectedIndicator(e.target.value), []);

  return (
    <div className="space-y-6">
      <div className="p-6 bg-slate-800 rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomSelect
          label="Select a Country"
          value={selectedCountry}
          onChange={handleCountryChange}
          options={countries.map(c => ({ value: c.id, label: c.name }))}
        />
        <CustomSelect
          label="Select an Indicator"
          value={selectedIndicator}
          onChange={handleIndicatorChange}
          options={PREDEFINED_INDICATORS.map(i => ({ value: i.id, label: i.name }))}
        />
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && chartData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title={`${selectedIndicatorName} Trend in ${selectedCountryName}`}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="year" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                <Legend />
                <Line type="monotone" dataKey="value" name={selectedIndicatorName} stroke="#34d399" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title={`Indicator vs. Happiness in ${selectedCountryName}`}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="year" stroke="#9ca3af" />
                <YAxis yAxisId="left" stroke="#34d399" />
                <YAxis yAxisId="right" orientation="right" stroke="#60a5fa" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="value" name={selectedIndicatorName} stroke="#34d399" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="happinessScore" name="Happiness Score" stroke="#60a5fa" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}
       {!loading && !error && chartData.length === 0 && (
        <div className="text-center py-10 bg-slate-800 rounded-lg">
          <p className="text-slate-400">No data available for the selected criteria. Please make another selection.</p>
        </div>
       )}
    </div>
  );
};
