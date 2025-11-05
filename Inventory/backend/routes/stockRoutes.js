const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/stockController');

router.get('/', ctrl.getAll);

module.exports = router;
