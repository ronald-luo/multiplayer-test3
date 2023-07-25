var express = require('express');
var router = express.Router();

let activeRooms = new Set();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/:id', function(req, res, next) {
  res.render('game', { roomId: req.params.id });
});

router.post('/', function(req, res, next) {
  let id = ''
  for (let i = 0; i < 4; i++) {
      id += Math.floor(Math.random() * 9)
  }
  
  activeRooms.add(id)
  console.log(activeRooms)
  res.redirect(id)
});

module.exports = router;
