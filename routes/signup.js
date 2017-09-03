var express = require('express');
var router = express.Router();

/* GET signup page. */
router.route('/').get(function(req, res){
	res.render('signup', {title: 'Sign Up'});
});
module.exports = router;