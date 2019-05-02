var express = require('express');
var router = express.Router();
var itemDb = require('../utility/ItemDB');
var itemModel=require('../model/item');
var useritem=require('../model/userItem');
var userItemdb=require('../utility/UserItemDB');
var userprofile=require('../model/userprofile');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var session = require('express-session');
var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/myitems',{useNewUrlParser:true});


router.use(session({secret:'USER'}));

router.get('/',urlencodedParser,function(req,res) {
  if(req.session.theUser){
    res.render('index',{theUser:req.session.theUser});
  }else{
    res.render('index',{theUser:null});
  }

});


router.get('/index',function (req,res){
  if (req.session.theUser) {
        res.render('index', {theUser:req.session.theUser});
    }else {
        res.render('index', {theUser:null});
    }
  });

router.get('/categories',async function (req,res){

var categories = await getCategories();
var itemData = await itemDb.getAllItems(itemModel);
var data= {
      categories: categories,
      items: itemData
  }

  if (req.session.theUser) {
          res.render('categories',{data:data,theUser:req.session.theUser});
    }
    else {
          res.render('categories',{data:data,theUser:null});
    }
});

router.get('/categories/item',async function (req,res){

var itemCode=req.query.itemCode;
var item=await itemDb.getItem(itemCode,itemModel);

var data={
  item:item
};

if (req.session.theUser) {
  console.log("inside categories item");
   if (itemCode<=0) {
     res.redirect('/categories',{theUser:req.session.theUser});
   }
   else if (itemCode>itemDb.getNumberOfItems(itemModel)) {
     res.redirect('/categories',{theUser:req.session.theUser});
   }else {
     res.render('item',{data:data,theUser:req.session.theUser});
   }
 }else {
     res.render('item',{data:data,theUser:null});
 }

});

router.get('/myItems', async function (req,res){
  if (req.session.theUser) {
      if (req.session.userProfile) {

        var useritems=await userItemdb.getUserItems(1);
          res.render('myItems',{UserItems:useritems, theUser:req.session.theUser});

      }}else {
          res.render('login',{UserItems:null,theUser:null});
        }
      });


router.get('/about', function(req,res){

    if (req.session.theUser) {
        res.render('about', {theUser:req.session.theUser});
    }else {
        res.render('about', {theUser:null});
    }
  });


router.get('/contact',function (req,res){
    if (req.session.theUser) {
        res.render('contact', {theUser:req.session.theUser});
    }else {
        res.render('contact', {theUser:null});
    }
  });


  router.get('/feedback', function(req,res){
    if (req.session.theUser) {
        res.render('feedback', {theUser:req.session.theUser});
    }else {
        res.render('feedback', {theUser:null});
    }
  });

/*
  router.get('/*', function(req,res){
    if (req.session.theUser) {
        res.render('index', {theUser:req.session.theUser});
    }else {
        res.render('index', {theUser:null});
    }
  });
*/
var categories = [];

let getCategories = async function() {
    var data = await itemDb.getAllItems(itemModel);
    for(var i=0;i<data.length;i++){
    if(!categories.includes(data[i].catalogCategory)){
      categories.push(data[i].catalogCategory);
    }
  }
    return categories;
};

module.exports = router;
