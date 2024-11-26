import React from 'react';

const Orders: React.FC = () => {
  const orders = [
    { id: 1, date: '2024-11-01', total: '$200', status: 'Delivered' },
    { id: 2, date: '2024-10-20', total: '$150', status: 'Shipped' },
  ];

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <ul className="space-y-4">
        {orders.map(order => (
          <li
            key={order.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Total:</strong> {order.total}</p>
            <p><strong>Status:</strong> {order.status}</p>
          </li>
        ))}
      </ul>
    </section>
  )
};

export default Orders;
