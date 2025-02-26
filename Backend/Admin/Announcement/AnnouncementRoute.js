const express = require('express');
const { print } = require('./AnnouncementController');


const router = express.Router();

router.get('/print',print)

module.exports = router;