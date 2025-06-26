import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
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

const HistoricalDataChart = () => {
  const [chartData, setChartData] = useState(null);
  const [timeRange, setTimeRange] = useState('24h'); // Default to 24 hours
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://YOUR_BACKEND_IP:5000/api/sensor-data/history?range=${timeRange}`);
        formatChartData(response.data);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoricalData();
  }, [timeRange]);

  const formatChartData = (data) => {
    const chartData = {
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
        }
      ]
    };

    setChartData(chartData);
  };

  const options = {
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
            day: 'MMM dd'
          }
        },
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'pH / Temperature (°C)'
        }
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
          text: 'Ammonia (ppm) / Turbidity (NTU)'
        }
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.dataset.label.includes('Temperature') || 
                       context.dataset.label.includes('pH') ?
                       context.parsed.y.toFixed(2) : context.parsed.y.toFixed(1);
            }
            return label;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Historical Water Quality Data</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeRange('24h')}
            className={`px-3 py-1 rounded-md text-sm ${timeRange === '24h' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            24 Hours
          </button>
          <button 
            onClick={() => setTimeRange('7d')}
            className={`px-3 py-1 rounded-md text-sm ${timeRange === '7d' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            7 Days
          </button>
          <button 
            onClick={() => setTimeRange('30d')}
            className={`px-3 py-1 rounded-md text-sm ${timeRange === '30d' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            30 Days
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : chartData ? (
        <div className="h-96">
          <Line data={chartData} options={options} />
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