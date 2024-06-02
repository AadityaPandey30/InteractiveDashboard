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
      backgroundColor: 'rgba(102, 255, 191, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const signaturesData = {
    labels: Object.keys(chartData.signatures),
    datasets: [{
      label: 'Signatures',
      data: Object.values(chartData.signatures),
      backgroundColor: 'rgba(102, 204, 255, 0.6)',
      borderColor: 'rgba(102, 204, 255, 1)',
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
      backgroundColor: 'rgba(255, 50, 100, 0.6)',
      borderColor: 'rgba(255, 50, 100, 1)',
      borderWidth: 1,
    }],
  };

  const destIpsData = {
    labels: Object.keys(chartData.destIps),
    datasets: [{
      label: 'Destination IPs',
      data: Object.values(chartData.destIps),
      backgroundColor: 'rgba(128, 255, 102, 0.6)',
      borderColor: 'rgba(128, 255, 102, 1)',
      borderWidth: 1,
    }],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl md:text-5xl font-bold mt-8 mb-12">Security Event Dashboard</h1>
      
      <div className="flex flex-col md:flex-row justify-between my-8">
  <div className='md:ml-2 mb-4 md:mb-0'>
    <label htmlFor="startDate" className="mr-2 mb-2 md:text-2xl text-1xl">Start Date:</label>
    <input
      type="date"
      id="startDate"
      name="startDate"
      className="text-black rounded-lg p-2 md:text-2xl text-1xl"
      onChange={handleDateChange}
    />
  </div>
  <p className='my-2 md:text-2xl text-1xl'>← Sorting Options →</p>
  <div className='md:mr-2'>
    <label htmlFor="endDate" className="mr-2 mb-2 md:text-2xl text-1xl">End Date:</label>
    <input
      type="date"
      id="endDate"
      name="endDate"
      className="text-black rounded-lg p-2 md:text-2xl text-1xl"
      onChange={handleDateChange}
    />
  </div>
</div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7">
        <div className="bg-gray-800 p-5 rounded-[20px] m-2 card">
          <h2 className="text-xl mb-4">Event Types</h2>
          <Bar data={eventTypesData} />
        </div>
        <div className="bg-gray-800 p-5 rounded-[20px] m-2 card">
          <h2 className="text-xl mb-4">Signatures</h2>
          <Pie data={signaturesData} />
        </div>
        <div className="bg-gray-800 p-5 rounded-[20px] m-2 card">
          <h2 className="text-xl mb-4">Severities</h2>
          <Line data={severitiesData} />
        </div>
        <div className="bg-gray-800 p-5 rounded-[20px] m-2 card">
          <h2 className="text-xl mb-4">Source IPs</h2>
          <Doughnut data={srcIpsData} />
        </div>
        <div className="bg-gray-800 p-5 rounded-[20px] m-2 card">
          <h2 className="text-xl mb-4">Destination IPs</h2>
          <Radar data={destIpsData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
