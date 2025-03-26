import React from 'react';

const DamagedProductDetail = () => {
  // Product data structured from your input
  const product = {
    id: '67', // Assuming this is a product ID
    categoryId: '2', // Assuming this is a category ID
    name: 'Awei Y669 Bluetooth TWS Waterproof Outdoor Dual Speaker (31W)',
    images: [
      'image-1700642260901-240399882.jpg',
      'image-1700642260901-305866201.jpg',
      'image-1700642260902-232406435.jpg'
    ],
    isActive: '0', // Assuming 0 means inactive
    specs: {
      model: 'Y669',
      batteryCapacity: '2200mAh',
      chargingTime: '4 hours',
      musicPlayTime: '12 Hours (IPX7 Level)',
      bluetoothDistance: '8 ~ 12 M'
    },
    prices: [3050, 3150, 3250, 3250], // Price variants or history
    stockLevels: [7, 5], // Assuming these are stock-related numbers
    unknownFields: [null, null, '1', '0', '0', '2', '0', '1', '2'] // Remaining fields with unclear meaning
  };

  return (
    <div className="product-detail" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Product Title */}
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>{product.name}</h1>

      {/* Product ID and Category */}
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Product ID:</strong> {product.id}</p>
        <p><strong>Category ID:</strong> {product.categoryId}</p>
        <p><strong>Active Status:</strong> {product.isActive === '0' ? 'Inactive' : 'Active'}</p>
      </div>

      {/* Image Gallery */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {product.images.map((image, index) => (
          <img
            key={index}
            src={`/${image}`} // Adjust path as needed
            alt={`${product.name} - View ${index + 1}`}
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
        ))}
      </div>

      {/* Product Specifications */}
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Specifications</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}><strong>Model:</strong> {product.specs.model}</li>
          <li style={{ marginBottom: '10px' }}><strong>Battery Capacity:</strong> {product.specs.batteryCapacity}</li>
          <li style={{ marginBottom: '10px' }}><strong>Charging Time:</strong> {product.specs.chargingTime}</li>
          <li style={{ marginBottom: '10px' }}><strong>Music Play Time:</strong> {product.specs.musicPlayTime}</li>
          <li style={{ marginBottom: '10px' }}><strong>Bluetooth Range:</strong> {product.specs.bluetoothDistance}</li>
        </ul>
      </div>

      {/* Pricing */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Pricing</h2>
        <p style={{ fontSize: '18px', color: '#2ecc71' }}>
          Price Range: ${Math.min(...product.prices).toLocaleString()} 
          {product.prices.length > 1 && ` - $${Math.max(...product.prices).toLocaleString()}`}
        </p>
      </div>

      {/* Stock Levels */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Stock Information</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {product.stockLevels.map((stock, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <strong>Stock Level {index + 1}:</strong> {stock}
            </li>
          ))}
        </ul>
      </div>

      {/* Unknown Fields */}
      <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Additional Data</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {product.unknownFields.map((field, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <strong>Field {index + 1}:</strong> {field === null ? 'N/A' : field}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DamagedProductDetail;