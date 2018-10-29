var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/testDB');
var db   = mongoose.connection;
//var User = require('user.js');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    ad:String,
    soyad:String,
    dogumTarihi:String,
    email:String
});

var User = mongoose.model('User',userSchema);

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({},function(error,docs){
    res.render('list',{userList:docs});
  });
});


// GET Delete . 
router.get('/delete/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, function(error,next){
    res.redirect('/users');
  });
});

// GET user create. 
router.get('/create', function(req, res, next) {
  res.render('create');
});

// POST create . 
router.post('/create', function(req, res, next) {

  console.log(req.body);
  new User({
    ad: req.body.ad,
    soyad: req.body.soyad,
    dogumTarihi: req.body.dogumTarihi,
    email: req.body.email
  })
  .save(function(error,comment){
    res.redirect('/users');
  });
});

module.exports = router;
