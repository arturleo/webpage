var express = require('express');
var router = express.Router();
let util = require('../js/util');


router.get('/result', function(req, res, next) {
	let obj=req.session.cont;
    let ans=JSON.parse(req.query.data);
    //console.log(obj,"before");
    let ot=util.dthd(obj,ans);
	//console.log(ot,"after");
    const locals = {
        score: ot[11][0]*10,
        result: [ot[10],ot[11]]
    };
    res.send(locals);
    return;
    if (err) {
        next(err); // Handle this error
    }
});

router.get('/result/single', function(req, res, next) {
	let obj=req.session.cont;
    let ans=JSON.parse(req.query.data);
	//console.log(ans);
	let local=(obj[ans.index].right==ans.ans)?1:0;
	//console.log(obj[ans.index].right,ans.ans);
	let locals={
		pinyin:[obj[ans.index].pinyin[0],obj[ans.index].pinyin[parseInt(ans.ans)+1]],
		result:local
	}
	//console.log("sending",parseInt(ans.ans)+1);
    res.send(locals);
    return;
    if (err) {
        next(err); // Handle this error
    }
});

router.get('/tools/pchar',(req,res,next)=>{
	//console.log(req.query.data);
	let yin=util.parsepronc(req.query.data);
	//console.log(yin);
	res.send(yin);
	return;
	if(err) next(err);
});

router.get('/user/login', function(req, res, next) {//TODO
	let user=req.session.user;
    let data=JSON.parse(req.query.data);
	User.findOne({
        username: data.username, 
    }, function (err, user) {
        if (err) {
            return next(err);
        }
		//if user exists, check pw 
        if (user) {
			user.comparePassword(data.password, function(err, isMatch) {
				//if pw is wrong, return 1
				if (err) throw err;
				//else if login success, return 0,update cookie
				//console.log(data.password, isMatch); // -> Password: true
			});
            req.session.user = user._id;
          
        } else {
			//if no user, create an account, return 2
			var addUser = new User({
				username: jmar777,
				password: Password
			});

			// save user to database
			addUser.save(function(err) {
				if (err) throw err;
			});
        }
	});	
    //res.send(locals);
    return;
    if (err) {
        next(err); 
    }
});


module.exports = router;
