const express = require('express');
const { signin } = require('../controller/authcontroller');
const router = express.Router();


router.get('/',signin);

module.exports = router;