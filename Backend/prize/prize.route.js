const { getPrizes, updatePrize, postPrize } = require("./prize.controller");



const router = require("express").Router();

module.exports = (app) => {
   router.get('/get-prizes',getPrizes)
   router.put('/update-prize',updatePrize)
  router.post('/post-prize',postPrize)
  return app.use("/api/prize", router);
};