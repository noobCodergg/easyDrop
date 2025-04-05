import React, { useEffect, useState } from 'react';

// Dummy data for testing
const dummyPersonalDetail = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '123-456-7890',
  house_no: '123',
  road: 'Main St',
  area: 'Downtown',
  city: 'Cityville',
};

const dummyShopDetail = {
  shopName: 'John\'s Shop',
  shopPhone: '987-654-3210',
  shopEmail: 'shop@example.com',
  shopNo: '456',
  shopRoad: 'Market St',
  shopArea: 'Central',
  shopCity: 'Shopville',
};

const dummyImageUrl = 'https://via.placeholder.com/150';

const VendorProfile = () => {
  const [personalEditMode, setPersonalEditMode] = useState(false);
  const [shopEditMode, setShopEditMode] = useState(false);
  const [imageEditMode, setImageEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serverImage, setServerImage] = useState(dummyImageUrl); // Server-stored image URL
  const [previewImage, setPreviewImage] = useState(dummyImageUrl); // Currently displayed image
  const [selectedImage, setSelectedImage] = useState(null); // File object for upload

  const [personalDetail, setPersonalDetail] = useState(dummyPersonalDetail);
  const [shopDetail, setShopDetail] = useState(dummyShopDetail);

  // Simulate fetching vendor details from API
  const fetchVendorDetails = async () => {
    setLoading(true);
    try {
      // Simulating API call, using dummy data instead
      setPersonalDetail(dummyPersonalDetail);
      setShopDetail(dummyShopDetail);
      setServerImage(dummyImageUrl);
      setPreviewImage(dummyImageUrl);
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
      // Simulating API call, using dummy data instead
      setServerImage('https://via.placeholder.com/150'); // Set new image URL
      setPreviewImage('https://via.placeholder.com/150'); // Set preview image
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
      // Simulating API call, using dummy data instead
      console.log('Personal update successful');
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
      // Simulating API call, using dummy data instead
      console.log('Shop update successful');
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">House No:</span> {personalDetail.house_no || 'N/A'}
                </div>
                <div>
                  <span className="font-medium">Road:</span> {personalDetail.road || 'N/A'}
                </div>
                <div>
                  <span className="font-medium">Area:</span> {personalDetail.area || 'N/A'}
                </div>
                <div>
                  <span className="font-medium">City:</span> {personalDetail.city || 'N/A'}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="font-medium text-gray-800">Name</label>
                <input
                  type="text"
                  name="name"
                  value={personalDetail.name}
                  onChange={handlePersonalDetailChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="font-medium text-gray-800">Email</label>
                <input
                  type="email"
                  name="email"
                  value={personalDetail.email}
                  onChange={handlePersonalDetailChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="font-medium text-gray-800">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={personalDetail.phone}
                  onChange={handlePersonalDetailChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-gray-800">House No</label>
                  <input
                    type="text"
                    name="house_no"
                    value={personalDetail.house_no}
                    onChange={handlePersonalDetailChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="font-medium text-gray-800">Road</label>
                  <input
                    type="text"
                    name="road"
                    value={personalDetail.road}
                    onChange={handlePersonalDetailChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="font-medium text-gray-800">Area</label>
                  <input
                    type="text"
                    name="area"
                    value={personalDetail.area}
                    onChange={handlePersonalDetailChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="font-medium text-gray-800">City</label>
                  <input
                    type="text"
                    name="city"
                    value={personalDetail.city}
                    onChange={handlePersonalDetailChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
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
                <span className="font-medium">Shop Phone:</span> {shopDetail.shopPhone || 'N/A'}
              </div>
              <div>
                <span className="font-medium">Shop Email:</span> {shopDetail.shopEmail || 'N/A'}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Shop No:</span> {shopDetail.shopNo || 'N/A'}
                </div>
                <div>
                  <span className="font-medium">Shop Road:</span> {shopDetail.shopRoad || 'N/A'}
                </div>
                <div>
                  <span className="font-medium">Shop Area:</span> {shopDetail.shopArea || 'N/A'}
                </div>
                <div>
                  <span className="font-medium">Shop City:</span> {shopDetail.shopCity || 'N/A'}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="font-medium text-gray-800">Shop Name</label>
                <input
                  type="text"
                  name="shopName"
                  value={shopDetail.shopName}
                  onChange={handleShopDetailChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="font-medium text-gray-800">Shop Phone</label>
                <input
                  type="text"
                  name="shopPhone"
                  value={shopDetail.shopPhone}
                  onChange={handleShopDetailChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="font-medium text-gray-800">Shop Email</label>
                <input
                  type="email"
                  name="shopEmail"
                  value={shopDetail.shopEmail}
                  onChange={handleShopDetailChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-gray-800">Shop No</label>
                  <input
                    type="text"
                    name="shopNo"
                    value={shopDetail.shopNo}
                    onChange={handleShopDetailChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="font-medium text-gray-800">Shop Road</label>
                  <input
                    type="text"
                    name="shopRoad"
                    value={shopDetail.shopRoad}
                    onChange={handleShopDetailChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="font-medium text-gray-800">Shop Area</label>
                  <input
                    type="text"
                    name="shopArea"
                    value={shopDetail.shopArea}
                    onChange={handleShopDetailChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="font-medium text-gray-800">Shop City</label>
                  <input
                    type="text"
                    name="shopCity"
                    value={shopDetail.shopCity}
                    onChange={handleShopDetailChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default VendorProfile;
