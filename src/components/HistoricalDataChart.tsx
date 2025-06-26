import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios, { AxiosError } from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartOptions,
  ChartData,
  TimeUnit,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

// Type definitions for sensor data
interface SensorData {
  pH: number;
  ammonia: number;
  temperature: number;
  turbidity: number;
  timestamp: string | Date;
}

// Type for time range options
type TimeRange = '24h' | '7d' | '30d';

// Extended ChartData type with specific dataset types
interface HistoricalChartData extends ChartData<'line'> {
  labels: Date[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
    yAxisID: string;
  }[];
}

// Extended ChartOptions type with time scale configuration
interface HistoricalChartOptions extends ChartOptions<'line'> {
  scales: {
    x: {
      type: 'time';
      time: {
        unit: TimeUnit;
        tooltipFormat: string;
        displayFormats: {
          hour: string;
          day: string;
        };
      };
      title: {
        display: boolean;
        text: string;
      };
    };
    y: {
      type: 'linear';
      display: boolean;
      position: 'left';
      title: {
        display: boolean;
        text: string;
      };
    };
    y1: {
      type: 'linear';
      display: boolean;
      position: 'right';
      grid: {
        drawOnChartArea: boolean;
      };
      title: {
        display: boolean;
        text: string;
      };
    };
  };
}

const HistoricalDataChart: React.FC = () => {
  const [chartData, setChartData] = useState<HistoricalChartData | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistoricalData = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get<SensorData[]>(
          `https://aquafix-backend.onrender.com/api/sensor-data/history?range=${timeRange}`
        );
        formatChartData(response.data);
      } catch (err) {
        const error = err as AxiosError;
        console.error('Error fetching historical data:', error);
        setError('Failed to load historical data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoricalData();
  }, [timeRange]);

  const formatChartData = (data: SensorData[]): void => {
    try {
      const formattedData: HistoricalChartData = {
        labels: data.map(item => new Date(item.timestamp)),
        datasets: [
          {
            label: 'pH Level',
            data: data.map(item => item.pH),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
            yAxisID: 'y',
          },
          {
            label: 'Ammonia (ppm)',
            data: data.map(item => item.ammonia),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.1,
            yAxisID: 'y1',
          },
          {
            label: 'Temperature (°C)',
            data: data.map(item => item.temperature),
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.1,
            yAxisID: 'y',
          },
          {
            label: 'Turbidity (NTU)',
            data: data.map(item => item.turbidity),
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            tension: 0.1,
            yAxisID: 'y1',
          },
        ],
      };
      setChartData(formattedData);
    } catch (formatError) {
      console.error('Error formatting chart data:', formatError);
      setError('Data formatting error');
    }
  };

  const chartOptions: HistoricalChartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: timeRange === '24h' ? 'hour' : 'day',
          tooltipFormat: 'PPpp',
          displayFormats: {
            hour: 'HH:mm',
            day: 'MMM dd',
          },
        },
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'pH / Temperature (°C)',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Ammonia (ppm) / Turbidity (NTU)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label +=
                (context.dataset.label && context.dataset.label.includes('Temperature')) ||
                (context.dataset.label && context.dataset.label.includes('pH'))
                  ? context.parsed.y.toFixed(2)
                  : context.parsed.y.toFixed(1);
            }
            return label;
          },
        },
      },
    },
  };

  const handleTimeRangeChange = (newRange: TimeRange): void => {
    setTimeRange(newRange);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Historical Water Quality Data</h2>
        <div className="flex space-x-2">
          {(['24h', '7d', '30d'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => handleTimeRangeChange(range)}
              className={`px-3 py-1 rounded-md text-sm ${
                timeRange === range ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {range === '24h' ? '24 Hours' : range === '7d' ? '7 Days' : '30 Days'}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <div className="text-center py-10 text-red-500">
          {error} - Please try again later
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : chartData ? (
        <div className="h-96">
          <Line data={chartData} options={chartOptions} />
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          No historical data available
        </div>
      )}
    </div>
  );
};

export default HistoricalDataChart;