import { AlignEndHorizontal } from 'lucide-react';
import React from 'react';
import Title from './Title';

const TopGainerProduct = () => {
  const product = {
    name: 'Bag',
    id: 'BAG123',
    sales: '150 units',
    price: '$49.99',
    image: 'https://imgs.search.brave.com/5Um9ZEGHcPxv4Pd4TWuGpdRU3zKASUb5PT6B4piL94I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg2/ODU5MjI0L3Bob3Rv/L2hhbmRiYWcuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPVJi/dTJYMjFfWlBZM3Jh/WDZSdWxRVnoyYlBI/a2Q2SWhkNmRwT0Jq/VF9IYVk9'
  };

  return (
    <div className="max-w-md w-full p-6 rounded-xl shadow-md border border-gray-200 bg-white flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <Title 
        icon={<AlignEndHorizontal color='#572782' size={24} />}
        text="Top Selling Product"
      />
      <div className="flex-1 flex flex-col sm:flex-row gap-6 mt-4">
        <div className="sm:w-1/2 w-full aspect-square">
          <img 
            src={product.image}
            alt={`${product.name} product`}
            className="w-full h-full rounded-lg object-cover transition-transform hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="sm:w-1/2 w-full flex flex-col justify-between gap-4 p-2">
          <div className="space-y-2">
            <h3 className="font-bold text-xl text-mouve line-clamp-1">{product.name}</h3>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-700">ID:</span> {product.id}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-700">Sales:</span> {product.sales}
            </p>
          </div>
          <p className="text-lg font-semibold text-mouve self-end"> 
            {product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopGainerProduct;