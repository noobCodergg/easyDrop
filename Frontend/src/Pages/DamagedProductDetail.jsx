import React from 'react';

const DamagedProductDetail = ({ data }) => {
  console.log(data);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-20">
      <div className="bg-white  rounded-lg overflow-hidden">
        {/* Image and Title Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="flex justify-center items-center">
            <img 
              src={data.img_location} 
              alt={data.name}
              className="w-full max-w-md h-auto object-cover rounded-lg "
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{data.name}</h1>
            <p className="text-gray-600 text-lg">{data.description}</p>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="border-t border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Product Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Category:</span> {data.category || 'N/A'}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Stock:</span> {data.stock || 'N/A'}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">External Product:</span> 
                {data.external_product ? 'Yes' : 'No'}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Featured:</span> 
                {data.featured ? 'Yes' : 'No'}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Variants:</span> {data.variants || 'N/A'}
              </p>
            </div>

            {/* Pricing Section */}
            <div className="space-y-3">
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Buying Price:</span> 
                Tk. {parseFloat(data.buying_price || 0).toFixed(2)}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Resell Price:</span> 
                Tk. {parseFloat(data.resell_price || 0).toFixed(2)}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Retail Price:</span> 
                Tk. {parseFloat(data.retail_price || 0).toFixed(2)}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Suggested Price:</span> 
                Tk. {parseFloat(data.suggested_price || 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DamagedProductDetail;