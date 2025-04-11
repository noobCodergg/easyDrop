const { postInfo, getInfo, isuserExist } = require("./info.controller");


const router = require("express").Router();

module.exports = (app) => {
   router.post('/post-info',postInfo)
   router.get('/get-info',getInfo)
   router.get('/is-user-exist/:phone',isuserExist)
  return app.use("/api/info", router);
};