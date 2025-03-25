import { getVendorDetail, updatePersonalDetail, updateShopDetail } from '../Api/VendorApi/VendorApi';
import React, { useEffect, useState } from 'react';

const VendorProfile = () => {
  const [personalEditMode, setPersonalEditMode] = useState(false);
  const [shopEditMode, setShopEditMode] = useState(false);
  const [imageEditMode, setImageEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serverImage, setServerImage] = useState(null); // Server-stored image URL
  const [previewImage, setPreviewImage] = useState(null); // Currently displayed image
  const [selectedImage, setSelectedImage] = useState(null); // File object for upload

  const [personalDetail, setPersonalDetail] = useState({
    name: '',
    email: '',
    phone: '',
    house_no: '',
    road: '',
    area: '',
    city: '',
  });

  const [shopDetail, setShopDetail] = useState({
    shopName: '',
    shopPhone: '',
    shopEmail: '',
    shopNo: '',
    shopRoad: '',
    shopArea: '',
    shopCity: '',
  });

  // Fetch vendor details from API
  const fetchVendorDetails = async () => {
    setLoading(true);
    try {
      const response = await getVendorDetail(8); // Replace 1 with dynamic vendorId
      setPersonalDetail({
        name: response.data.name || '',
        email: response.data.email || '',
        phone: response.data.phone || '',
        house_no: response.data.house_no || '',
        road: response.data.road || '',
        area: response.data.area || '',
        city: response.data.city || '',
      });
      setShopDetail({
        shopName: response.data.shop_name || '',
        shopPhone: response.data.shop_phone || '',
        shopEmail: response.data.shop_email || '',
        shopNo: response.data.shop_no || '',
        shopRoad: response.data.shop_road || '',
        shopArea: response.data.shop_area || '',
        shopCity: response.data.shop_city || '',
      });
      setServerImage(response.data.imageUrl || null);
      setPreviewImage(response.data.imageUrl || null);
    } catch (error) {
      console.error('Error fetching vendor details:', error);
      setError('Failed to load profile details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorDetails();
  }, []);

  // Handle input changes
  const handlePersonalDetailChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleShopDetailChange = (e) => {
    const { name, value } = e.target;
    setShopDetail((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection (click or drag-and-drop)
  const handleFileSelection = (e) => {
    const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setImageEditMode(true);
    }
  };

  // Handle image save
  const handleImageSave = async () => {
    if (!selectedImage) {
      setError('Please select an image to upload.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      const response = await updateVendorImage(8, formData); // Replace with real API
      setServerImage(response.data.imageUrl);
      setPreviewImage(response.data.imageUrl);
      setSelectedImage(null);
      setImageEditMode(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle image cancel
  const handleCancelImage = () => {
    setPreviewImage(serverImage);
    setSelectedImage(null);
    setImageEditMode(false);
  };

  // Validation for personal and shop details
  const isPersonalDetailValid = () => {
    return Object.values(personalDetail).every((value) => value.trim() !== '');
  };

  const isShopDetailValid = () => {
    return Object.values(shopDetail).every((value) => value.trim() !== '');
  };

  // Save handlers
  const handlePersonalSave = async () => {
    if (!isPersonalDetailValid()) {
      setError('All personal detail fields are required.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await updatePersonalDetail(8, personalDetail);
      console.log('Personal update successful:', response);
      setPersonalEditMode(false);
    } catch (error) {
      console.error('Error updating personal details:', error);
      setError('Failed to update personal details.');
    } finally {
      setLoading(false);
    }
  };

  const handleShopSave = async () => {
    if (!isShopDetailValid()) {
      setError('All shop detail fields are required.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await updateShopDetail(8, shopDetail);
      console.log('Shop update successful:', response);
      setShopEditMode(false);
    } catch (error) {
      console.error('Error updating shop details:', error);
      setError('Failed to update shop details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-gray-50 min-h-screen p-6 font-sans">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Vendor Profile</h1>
        <p className="text-sm text-gray-500">Manage your personal and shop details</p>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex justify-center mb-6">
          <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="space-y-8">
        {/* Profile Image and Name */}
        <section className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-sm">
          <div
            className="relative w-20 h-20 rounded-full overflow-hidden cursor-pointer group transition-all duration-300 hover:ring-4 hover:ring-blue-200"
            onClick={() => !imageEditMode && document.getElementById('imageUpload').click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFileSelection(e);
            }}
          >
            <div
              className="w-full h-full bg-gray-200"
              style={{
                backgroundImage: `url(${previewImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {!previewImage && (
                <span className="flex items-center justify-center h-full text-gray-500 text-sm">
                  {imageEditMode ? 'No Image' : 'Add Image'}
                </span>
              )}
            </div>
            {!imageEditMode && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition-all duration-300">
                <span className="text-white text-xs opacity-0 group-hover:opacity-100">Upload</span>
              </div>
            )}
            {imageEditMode && (
              <div
                className="absolute inset-0 border-2 border-dashed border-gray-400 bg-gray-100 bg-opacity-50 flex items-center justify-center"
                onClick={() => document.getElementById('imageUploadEdit').click()}
              >
                <span className="text-gray-500 text-xs">Drop or Click</span>
              </div>
            )}
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleFileSelection}
              className="hidden"
              disabled={imageEditMode}
            />
            <input
              id="imageUploadEdit"
              type="file"
              accept="image/*"
              onChange={handleFileSelection}
              className="hidden"
              disabled={!imageEditMode}
            />
          </div>

          {imageEditMode && (
            <div className="flex space-x-2 mt-2">
              <button
                onClick={handleImageSave}
                disabled={loading || !selectedImage}
                className={`px-3 py-1 rounded-full text-sm font-medium text-white transition-all duration-200 ${
                  loading || !selectedImage
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md'
                }`}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleCancelImage}
                className="px-3 py-1 rounded-full text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-gray-800">{personalDetail.name || 'Vendor Name'}</h2>
            <p className="text-sm text-gray-600">{shopDetail.shopName || 'Shop Name'}</p>
          </div>
        </section>

        {/* Personal Details */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Personal Details</h2>
            <button
              onClick={personalEditMode ? handlePersonalSave : () => setPersonalEditMode(true)}
              disabled={loading}
              className={`px-4 py-2 rounded-md text-sm font-medium text-white transition-all duration-200 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : personalEditMode
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {loading ? 'Saving...' : personalEditMode ? 'Save' : 'Edit'}
            </button>
          </div>

          {!personalEditMode ? (
            <div className="space-y-4 text-gray-700">
              <div>
                <span className="font-medium">Name:</span> {personalDetail.name || 'N/A'}
              </div>
              <div>
                <span className="font-medium">Email:</span> {personalDetail.email || 'N/A'}
              </div>
              <div>
                <span className="font-medium">Phone:</span> {personalDetail.phone || 'N/A'}
              </div>
              <div className="mt-4">
                <span className="font-medium">Address:</span>{' '}
                {personalDetail.house_no && personalDetail.road && personalDetail.area && personalDetail.city
                  ? `${personalDetail.house_no}, ${personalDetail.road}, ${personalDetail.area}, ${personalDetail.city}`
                  : 'N/A'}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'name', label: 'Name', type: 'text' },
                { name: 'email', label: 'Email', type: 'email' },
                { name: 'phone', label: 'Phone', type: 'text' },
                { name: 'house_no', label: 'House No', type: 'text' },
                { name: 'road', label: 'Road', type: 'text' },
                { name: 'area', label: 'Area', type: 'text' },
                { name: 'city', label: 'City', type: 'text' },
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={personalDetail[field.name]}
                    onChange={handlePersonalDetailChange}
                    placeholder={field.label}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    required
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Shop Details */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Shop Details</h2>
            <button
              onClick={shopEditMode ? handleShopSave : () => setShopEditMode(true)}
              disabled={loading}
              className={`px-4 py-2 rounded-md text-sm font-medium text-white transition-all duration-200 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : shopEditMode
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {loading ? 'Saving...' : shopEditMode ? 'Save' : 'Edit'}
            </button>
          </div>

          {!shopEditMode ? (
            <div className="space-y-4 text-gray-700">
              <div>
                <span className="font-medium">Shop Name:</span> {shopDetail.shopName || 'N/A'}
              </div>
              <div>
                <span className="font-medium">Phone:</span> {shopDetail.shopPhone || 'N/A'}
              </div>
              <div>
                <span className="font-medium">Email:</span> {shopDetail.shopEmail || 'N/A'}
              </div>
              <div className="mt-4">
                <span className="font-medium">Address:</span>{' '}
                {shopDetail.shopNo && shopDetail.shopRoad && shopDetail.shopArea && shopDetail.shopCity
                  ? `${shopDetail.shopNo}, ${shopDetail.shopRoad}, ${shopDetail.shopArea}, ${shopDetail.shopCity}`
                  : 'N/A'}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'shopName', label: 'Shop Name', type: 'text' },
                { name: 'shopPhone', label: 'Phone', type: 'text' },
                { name: 'shopEmail', label: 'Email', type: 'email' },
                { name: 'shopNo', label: 'Shop No', type: 'text' },
                { name: 'shopRoad', label: 'Road', type: 'text' },
                { name: 'shopArea', label: 'Area', type: 'text' },
                { name: 'shopCity', label: 'City', type: 'text' },
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={shopDetail[field.name]}
                    onChange={handleShopDetailChange}
                    placeholder={field.label}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    required
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

// Mock API function (replace with actual implementation)
const updateVendorImage = async (vendorId, formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { imageUrl: 'https://via.placeholder.com/150' } });
    }, 1000);
  });
};

export default VendorProfile;