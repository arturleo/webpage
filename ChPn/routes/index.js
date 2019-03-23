var express = require('express');
var router = express.Router();
let util = require('../js/util');

/* GET home page. */
router.get('/', function(req, res, next) {
  const locals = {
    title: 'Pronunciating Chinese!',
    templateName: 'index',
    headerName: null
  };
  return res.render('layout', locals);
});

/*************************
*		test router
*************************/

router.get('/test', function(req, res, next) {
	let contn=[];
	for(let i=0;i<10;i++){
		contn.push(util.getaproblem());
	}
	req.session.cont=contn;
	/*req.session.save(function(err) {
		console.log(err,"save on test cookie");
	})*/
    const locals = {
        title: 'Take a test!',
        templateName: 'test',
        headerName: null,
        cont: contn
    };
	//console.log(locals,"making");
    return res.render('layout', locals);
});

router.get('/learn', function(req, res, next) {
    const locals = {
        title: 'Learn Chinese Pronunciation!',
        templateName: 'learn',
        headerName: 'learnHeader'
    };
    return res.render('layout', locals);
});

router.get('/user/history', function(req, res, next) {
    const locals = {
        title: 'View your user history here.',
        templateName: 'userHistory',
        headerName: 'userHeader'
    };
    return res.render('layout', locals);
});

router.get('/user/setting', function(req, res, next) {
    const locals = {
        title: 'Setting',
        templateName: 'setting',
        headerName: null
    };
    return res.render('layout', locals);
});

router.get('/tool/searchpronc', function(req, res, next) {
    const locals = {
        title: 'Search pronunciation',
        templateName: 'proncPage',
        headerName: null
    };
    return res.render('layout', locals);
});

router.get('/privacy', function(req, res, next) {
    const locals = {
        title: 'Privacy Policy',
        templateName: 'privacy',
        headerName: null
    };
    return res.render('layout', locals);
});

module.exports = router;
