let express = require('express');
let router = express.Router();
let stud = [
    {name: "KAN CHEUK WAI", sid: "12569260"},
    {name: "LEE KI HUNG", sid: "12563487"},
    {name: "YUNG HOI KIT", sid: "12570480"}
]

/* GET users listing. */
router.get('/new', function(req, res, next) {
    res.render('new', { title: 'Inventory Management System', developer: stud});
});

module.exports = router;
