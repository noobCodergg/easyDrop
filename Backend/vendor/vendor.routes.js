const { createVendor, vendorLogin, updatePersonalDetail,getVendorDetail, updateShopDetail } = require("./vendor.controller");

  const router = require("express").Router();
  
  module.exports = (app) => {
    router.post('/create-vendor',createVendor)
    router.post('/vendor-login',vendorLogin)
    router.get('/get-vendor-detail/:vendorId',getVendorDetail)
    router.put('/update-personal-detail/:vendorId',updatePersonalDetail)
    router.put('/update-shop-detail/:vendorId',updateShopDetail)
    return app.use("/api/vendor", router);
  };