var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/history', function(req, res, next) {
    const locals = {
        title: 'History',
        templateName: 'userHistory',
        headerName: 'userHeader'
    };
    return res.render('layout', locals);
});


module.exports = router;
