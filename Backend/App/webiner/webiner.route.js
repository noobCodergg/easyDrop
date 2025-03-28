const { postWebinerRequest, getWebinarList, updateWebinarStatus } = require("./webiner.controller");


  const router = require("express").Router();
  
  module.exports = (app) => {
    router.post('/post-webinar-request',postWebinerRequest)
    router.get('/get-webinar-list',getWebinarList)
    router.put('/update-webinar-status/:id',updateWebinarStatus)
    
    return app.use("/api/webinar", router);
  };