import { useEffect, useState } from 'react';

export function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');

  const fetchOrders = () => {
    let url = `http://localhost:8080/api/admin/orders?`;
    if (statusFilter) url += `orderStatus=${statusFilter}&`;
    if (paymentFilter) url += `paymentStatus=${paymentFilter}`;

    fetch(url, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
    })
    .then(res => res.json())
    .then(setOrders);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchOrders(); }, [statusFilter, paymentFilter]);

  const updateStatus = async (id, type, newStatus) => {
      await fetch(`http://localhost:8080/api/admin/orders/${id}/${type}`, {
          method: 'PUT',
          headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('adminToken')}` 
          },
          body: JSON.stringify({ status: newStatus })
      });
      fetchOrders(); // Refresh table
  };

  return (
    <div>
      <h1>Orders & Returns</h1>
      <div className="filters">
        <select onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All Order Status</option>
            <option value="ORDERED">Ordered</option>
            <option value="DELIVERED">Delivered</option>
            <option value="RETURN_REQUESTED">Return Requested</option>
            <option value="RETURN_WINDOW_CLOSED">Return Window Closed</option>
        </select>
        <select onChange={e => setPaymentFilter(e.target.value)}>
            <option value="">All Payment Status</option>
            <option value="PAID">Paid</option>
            <option value="COD">COD</option>
        </select>
      </div>

      <table>
        <thead>
            <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product Info</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {orders.map(order => (
                <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                        {order.customerName}<br/>
                        <small>{order.address}</small>
                    </td>
                    <td>
                        {order.items.map(item => (
                            <div key={item.id}>{item.productName} (x{item.quantity})</div>
                        ))}
                    </td>
                    <td>{order.orderStatus}</td>
                    <td>{order.paymentStatus}</td>
                    <td>
                        <select onChange={(e) => updateStatus(order.id, 'status', e.target.value)} value={order.orderStatus}>
                            <option value="ORDERED">Ordered</option>
                            <option value="SHIPPED">Shipped</option>
                            <option value="DELIVERED">Delivered</option>
                            <option value="RETURNED">Returned</option>
                        </select>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}