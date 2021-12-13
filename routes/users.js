let express = require('express');
let router = express.Router();
//let query = require('../public/javascripts/query')
let mongo = require('../public/javascripts/mongo')

let stud = [
  {name: "KAN CHEUK WAI", sid: "12569260"},
  {name: "LEE KI HUNG", sid: "12563487"},
  {name: "YUNG HOI KIT", sid: "12570480"}
]

//let json = {name: "001"}
let json = mongo.findAll('inventory')
    .then(r => { json = r })
    .catch(console.error)

/* GET users listing. */
router.get('/users', function(req, res, next) {
  try {
    //console.log(query)
    console.log('Connection Success')
  } catch (e) {
    console.error(e)
  } finally {
    //res.send("user's page")
    console.log(`Return Json: ${json}`)
    res.render('users', { title: 'Inventory Management System', developer: stud, res: json});
  }
});

module.exports = router;
