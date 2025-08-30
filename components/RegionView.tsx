import React, { useState, useEffect, useCallback } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getIndicatorDataForRegion, getCountriesForRegion } from '../services/api';
import { PREDEFINED_INDICATORS, PREDEFINED_REGIONS, happinessData } from '../constants';
import { LoadingSpinner } from './common/LoadingSpinner';
import { ErrorMessage } from './common/ErrorMessage';
import { CustomSelect } from './common/CustomSelect';
import { ChartCard } from './common/ChartCard';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 25 }, (_, i) => currentYear - i - 1);

interface CombinedRegionalData {
  country: string;
  indicatorValue: number | null;
  happinessScore: number | null;
}

export const RegionView: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>(PREDEFINED_REGIONS[2].code);
  const [selectedIndicator, setSelectedIndicator] = useState<string>(PREDEFINED_INDICATORS[1].id);
  const [selectedYear, setSelectedYear] = useState<string>(years[1].toString());

  const [chartData, setChartData] = useState<CombinedRegionalData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegionalData = async () => {
      if (!selectedRegion || !selectedIndicator || !selectedYear) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const [indicatorResponse, countriesFromApi] = await Promise.all([
            getIndicatorDataForRegion(selectedRegion, selectedIndicator, selectedYear),
            getCountriesForRegion(selectedRegion)
        ]);
        
        // --- DEBUGGING START ---
        console.log('--- Debug: Raw API Indicator Data ---', indicatorResponse);
        // --- DEBUGGING END ---

        // Use a map with the 3-letter ISO code as the key for robust merging
        const mergedData = new Map<string, { countryName: string; indicatorValue: number | null; happinessScore: number | null; }>();

        // 1. Initialize map with all countries from the region
        countriesFromApi.forEach(c => {
          if (c.region.iso2code !== 'NA') { // Filter out aggregate regions
            mergedData.set(c.id, { countryName: c.name, indicatorValue: null, happinessScore: null });
          }
        });

        // 2. Populate with indicator data using the 3-letter code
        indicatorResponse.forEach(d => {
            if (d.value !== null && d.countryiso3code && mergedData.has(d.countryiso3code)) {
                mergedData.get(d.countryiso3code)!.indicatorValue = d.value;
            }
        });

        // 3. Populate with happiness data using the 3-letter code
        Object.entries(happinessData).forEach(([countryCode, data]) => {
            if (mergedData.has(countryCode)) {
                const yearData = data.find(d => d.year.toString() === selectedYear);
                if (yearData) {
                    mergedData.get(countryCode)!.happinessScore = yearData.score;
                }
            }
        });
        
        // --- DEBUGGING START ---
        console.log('--- Debug: Mapped Data Before Filtering ---', Array.from(mergedData.entries()));
        // --- DEBUGGING END ---
        
        // 4. Convert map to array for the chart
        const finalChartData = Array.from(mergedData.values())
            .map(data => ({
                country: data.countryName,
                indicatorValue: data.indicatorValue,
                happinessScore: data.happinessScore,
            }))
            .filter(d => d.indicatorValue !== null || d.happinessScore !== null)
            .sort((a, b) => (b.indicatorValue || 0) - (a.indicatorValue || 0)); // Sort by indicator value
            
        // --- DEBUGGING START ---
        console.log('--- Debug: Final Chart Data ---', finalChartData);
        // --- DEBUGGING END ---

        setChartData(finalChartData);

      } catch (err) {
        setError('Failed to fetch regional data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRegionalData();
  }, [selectedRegion, selectedIndicator, selectedYear]);
  
  const handleRegionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setSelectedRegion(e.target.value), []);
  const handleIndicatorChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setSelectedIndicator(e.target.value), []);
  const handleYearChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setSelectedYear(e.target.value), []);


  const selectedRegionName = PREDEFINED_REGIONS.find(r => r.code === selectedRegion)?.name || '';
  const selectedIndicatorName = PREDEFINED_INDICATORS.find(i => i.id === selectedIndicator)?.name || '';

  return (
    <div className="space-y-6">
      <div className="p-6 bg-slate-800 rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-3 gap-4">
        <CustomSelect
          label="Select a Region"
          value={selectedRegion}
          onChange={handleRegionChange}
          options={PREDEFINED_REGIONS.map(r => ({ value: r.code, label: r.name }))}
        />
        <CustomSelect
          label="Select an Indicator"
          value={selectedIndicator}
          onChange={handleIndicatorChange}
          options={PREDEFINED_INDICATORS.map(i => ({ value: i.id, label: i.name }))}
        />
        <CustomSelect
          label="Select a Year"
          value={selectedYear}
          onChange={handleYearChange}
          options={years.map(y => ({ value: y.toString(), label: y.toString() }))}
        />
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <ChartCard title={`Indicator vs. Happiness in ${selectedRegionName} (${selectedYear})`}>
           {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={500}>
                <ComposedChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="country" stroke="#9ca3af" angle={-45} textAnchor="end" interval={0} />
                    <YAxis yAxisId="left" stroke="#34d399" label={{ value: selectedIndicatorName, angle: -90, position: 'insideLeft', fill: '#34d399' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#60a5fa" label={{ value: 'Happiness Score', angle: -90, position: 'insideRight', fill: '#60a5fa' }}/>
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                    <Legend wrapperStyle={{ paddingTop: '60px' }}/>
                    <Bar yAxisId="left" dataKey="indicatorValue" name={selectedIndicatorName} fill="#34d399" />
                    <Line yAxisId="right" type="monotone" dataKey="happinessScore" name="Happiness Score" stroke="#60a5fa" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            ) : <p className="text-slate-400 text-center p-8">No data available for the selected criteria.</p>}
        </ChartCard>
      )}
    </div>
  );
};