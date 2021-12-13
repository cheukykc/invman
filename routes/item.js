var express = require('express');
var router = express.Router();
let mongo = require('../public/javascripts/mongo')
//let json = {name: "001"}

/* GET home page. */
router.get('/item', function(req, res, next) {
    let json = mongo.find('inventory', req.body.sid)
        .then(r => { json = r })
        .catch(console.error)
    res.render('item', { title: 'Inventory Management System' , json: json});
});

module.exports = router;
