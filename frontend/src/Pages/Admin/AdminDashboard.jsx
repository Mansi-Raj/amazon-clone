import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

export function AdminDashboard() {
  const [data, setData] = useState(null);
  const [yearFilter, setYearFilter] = useState(1); // 1, 3, or 5 years

  useEffect(() => {
    fetch(`http://localhost:8080/api/admin/dashboard/analytics?years=${yearFilter}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
    })
    .then(res => res.json())
    .then(setData);
  }, [yearFilter]);

  if (!data) return <div>Loading Analytics...</div>;

  return (
    <div className="dashboard-page">
      <h1>Business Analytics</h1>
      
      <div className="stats-cards">
        <div className="card">Total Revenue: ${(data.totalRevenueCents / 100).toFixed(2)}</div>
        <div className="card">Total Orders: {data.totalOrders}</div>
        <div className="card">Pending Returns: {data.pendingReturns}</div>
      </div>

      <div className="filters">
        <label>Time Range: </label>
        <select onChange={(e) => setYearFilter(e.target.value)} value={yearFilter}>
          <option value="1">Last 1 Year</option>
          <option value="3">Last 3 Years</option>
          <option value="5">Last 5 Years</option>
        </select>
      </div>

      <div className="charts-container">
        <h3>Sales Performance</h3>
        <LineChart width={600} height={300} data={data.chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Sales ($)" />
        </LineChart>

        <h3>Customer Growth (New vs Repeat)</h3>
        <BarChart width={600} height={300} data={data.chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="newCustomers" fill="#82ca9d" name="New Customers" />
          <Bar dataKey="repeatCustomers" fill="#8884d8" name="Repeat Customers" />
        </BarChart>
      </div>
    </div>
  );
}