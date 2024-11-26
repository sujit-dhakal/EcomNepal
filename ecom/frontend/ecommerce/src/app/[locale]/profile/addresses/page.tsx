import React from 'react';

const Addresses:React.FC = () => {
  const addresses = [
    { id: 1, label: 'Home', address: '123 Main St, Hometown, USA' },
    { id: 2, label: 'Work', address: '456 Office Blvd, Worktown, USA' },
  ];

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Addresses</h2>
      <ul className="space-y-4">
        {addresses.map(addr => (
          <li
            key={addr.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <p><strong>{addr.label}:</strong> {addr.address}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Addresses;
