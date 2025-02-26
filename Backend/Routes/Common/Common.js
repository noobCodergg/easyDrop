const express = require('express');
const { print } = require('../../Controllers/Common/Common');

const router = express.Router();

router.get('/print',print)

module.exports = router;