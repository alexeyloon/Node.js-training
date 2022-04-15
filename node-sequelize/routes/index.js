var express = require('express');
var router = express.Router();

const newsController = require('../controllers').news;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/news', newsController.list);
router.get('/api/news/:id', newsController.getById);
router.post('/api/news', newsController.add);
router.put('/api/news/:id', newsController.update);
router.delete('/api/news/:id', newsController.delete);

module.exports = router;
