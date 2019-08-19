var express = require('express');
var router = express.Router();
var db = require('../queries');


router.get('/api/booklist', db.getAllBooks);
router.get('/api/booklist/:id', db.getSpecificBook);
router.post('/api/booklist', db.addBook);
router.put('/api/booklist/:id', db.updateBook);
router.delete('/api/booklist/:id', db.removeBook);

// application -------------------------------------------------------------
router.get('/', function (req, res) {

    res.render('index', {title: 'node-postgres-promises'}); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;
