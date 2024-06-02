import  { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, RadialLinearScale } from 'chart.js';
import { Bar, Line, Pie, Doughnut, Radar } from 'react-chartjs-2';
import 'tailwindcss/tailwind.css';
import data from './eve.json';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, RadialLinearScale);

const processData = (data, filter = {}) => {
  const eventTypes = {};
  const signatures = {};
  const severities = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const srcIps = {};
  const destIps = {};

  data.forEach((event) => {
    const eventType = event.event_type;
    const alert = event.alert;
    const date = new Date(event.timestamp);

    if (alert && (!filter.startDate || date >= filter.startDate) && (!filter.endDate || date <= filter.endDate)) {
      const signature = alert.signature;
      const severity = alert.severity;
      const srcIp = event.src_ip;
      const destIp = event.dest_ip;

      if (eventType) eventTypes[eventType] = (eventTypes[eventType] || 0) + 1;
      if (signature) signatures[signature] = (signatures[signature] || 0) + 1;
      if (severity) severities[severity] += 1;
      if (srcIp) srcIps[srcIp] = (srcIps[srcIp] || 0) + 1;
      if (destIp) destIps[destIp] = (destIps[destIp] || 0) + 1;
    }
  });

  return { eventTypes, signatures, severities, srcIps, destIps };
};

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [filter, setFilter] = useState({ startDate: null, endDate: null });

  useEffect(() => {
    const { eventTypes, signatures, severities, srcIps, destIps } = processData(data, filter);
    setChartData({ eventTypes, signatures, severities, srcIps, destIps });
  }, [filter]);

  if (!chartData) {
    return <div className="text-white">Loading...</div>;
  }

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value ? new Date(value) : null,
    }));
  };

  const eventTypesData = {
    labels: Object.keys(chartData.eventTypes),
    datasets: [{
      label: 'Event Types',
      data: Object.values(chartData.eventTypes),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const signaturesData = {
    labels: Object.keys(chartData.signatures),
    datasets: [{
      label: 'Signatures',
      data: Object.values(chartData.signatures),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    }],
  };

  const severitiesData = {
    labels: Object.keys(chartData.severities),
    datasets: [{
      label: 'Severities',
      data: Object.values(chartData.severities),
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
    }],
  };

  const srcIpsData = {
    labels: Object.keys(chartData.srcIps),
    datasets: [{
      label: 'Source IPs',
      data: Object.values(chartData.srcIps),
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    }],
  };

  const destIpsData = {
    labels: Object.keys(chartData.destIps),
    datasets: [{
      label: 'Destination IPs',
      data: Object.values(chartData.destIps),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Security Event Dashboard</h1>
      
      <div className="flex justify-between mb-4">
        <div>
          <label htmlFor="startDate" className="mr-2">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className="text-black"
            onChange={handleDateChange}
          />
        </div>
        <div>
          <label htmlFor="endDate" className="mr-2">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            className="text-black"
            onChange={handleDateChange}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <div className="bg-gray-800 p-5 rounded-lg">
          <h2 className="text-xl mb-4">Event Types</h2>
          <Bar data={eventTypesData} />
        </div>
        <div className="bg-gray-800 p-5 rounded-lg">
          <h2 className="text-xl mb-4">Signatures</h2>
          <Pie data={signaturesData} />
        </div>
        <div className="bg-gray-800 p-5 rounded-lg">
          <h2 className="text-xl mb-4">Severities</h2>
          <Line data={severitiesData} />
        </div>
        <div className="bg-gray-800 p-5 rounded-lg">
          <h2 className="text-xl mb-4">Source IPs</h2>
          <Doughnut data={srcIpsData} />
        </div>
        <div className="bg-gray-800 p-5 rounded-lg">
          <h2 className="text-xl mb-4">Destination IPs</h2>
          <Radar data={destIpsData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
