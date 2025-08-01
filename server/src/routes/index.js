const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/booking', function(req, res, next) {
  res.render('booking', { title: 'Booking' });
});

module.exports = router;
