const { createVendor, vendorLogin } = require("./vendor.controller");

  const router = require("express").Router();
  
  module.exports = (app) => {
    router.post('/create-vendor',createVendor)
    router.post('/vendor-login',vendorLogin)
    return app.use("/api/vendor", router);
  };