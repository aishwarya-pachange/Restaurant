var express=require('express');
var item=require('../model/item');
var itemDb = require('../utility/ItemDB');
var user=require('../model/user');
var itemModel=require('../model/item');
var userModel=require('../model/user');
var userItemDb=require('../utility/UserItemDB');
var useritem=require('../model/userItem');
var userprofile=require('../model/userprofile');
var bodyParser=require('body-parser');
var session=require('express-session');

var userRouter=express.Router();
var urlencodedParser=bodyParser.urlencoded({extended:false});
const {check,validationResult}=require('express-validator/check');

userRouter.use(session({secret:'profile'}));

userRouter.get('/signin', function (req,res) {
  if(req.session.theUser){
    if(req.session.userProfile){
          res.render('myItems',{UserItems:req.session.userProfile,theUser:req.session.theUser});
      }
    }else{
      res.render('login',{theUser:null,UserItems:null});
    }

    /*var userObject=require('./../model/user');
    var userDB=require('./../utility/UserDB');
    var userprofile=require('./../model/userprofile');

    userObject=await userDB.getUser("1",userModel);

    req.session.theUser=userObject;
    req.session.userProfile=await userItemDb.getUserItems("1",userModel);
*/


});

userRouter.post('/signOut', urlencodedParser, function (req,res){

if (req.session.theUser){
        res.render('index', {theUser:null});
        req.session.destroy();
    }


});
userRouter.post('/signin',urlencodedParser,[
        check('UserName').not().isEmpty().isEmail(),
        check('Password').not().isEmpty().isLength({min:10})
],async function(req,res){

    if(!validationResult(req).isEmpty()){
        console.log("Error is there in input : ",validationResult(req).mapped());
        res.redirect('/profile/signin');
        return;
    }else{
      var userObject=require('./../model/user');
      var userDB=require('./../utility/UserDB');
        var username=req.body.UserName;
        var password=req.body.Password;

        var users=await UserDB.getAllUsers(userModel);

        var flag=false;

        for(var i=0;i<users.length;i++){

            if(users[i].email==username){
                if(users[i].Password==password){
                    flag=true;
                    req.session.theUser=users[i];
                    req.session.userProfile=await UserItemsDB.getUserItems(users[i].UserID);
                    res.render('myItems',{UserItems:req.session.userProfile,theUser:req.session.theUser});

                }
            }
        }



        if(flag==false){
            res.render('login',{theUser:null,UserItems:null});
        }


    }

});

userRouter.post('/myItems',urlencodedParser,async function (req,res) {

    if(req.session.userProfile){
        if (req.body.action=="Save"){

             await userItemDb.addUserItem(req.body.itemCode,req.session.theUser.UserID,req.body.Category,req.body.itemName);
            var userItems=await userItemDb.getUserItems(req.session.theUser.UserID);
            console.log(JSON.stringify(userItems));
             res.render('myItems',{UserItems:userItems,theUser:req.session.theUser});
           }

           else if (req.body.action == "rateIt") {
                   var itemdb = require('../utility/ItemDB');
                   var useritems = await userItemDb.getUserItems(req.session.theUser.UserID);
                   var item = await itemdb.getItem(req.body.itemCode,itemModel);

                   let flag=0;

                   for(let i=0; i<useritems.length; i++){
                     if (req.body.itemCode==useritems[i].itemCode) {
                       flag=1;
                       res.render('feedback', {theItem:item,theUser:req.session.theUser});
                     }
                   }
                   if (flag==0) {
                     res.render('myItems', {UserItems:useritems,theUser:req.session.theUser});
                   }
                 }


    else if (req.body.action=="deleteItem") {
        let userdb=require('../model/userprofile');
        await userItemDb.deleteUserItem(req.body.itemCode);

       let useritems=await userItemDb.getUserItems(req.session.theUser.UserID);
       res.render('myItems',{UserItems:useritems,theUser:req.session.theUser});
   }

   else if (req.body.action=="updateProfile") {

     var itemdb = require('../utility/ItemDB');


     var useritems = await userItemDb.getUserItems(req.session.theUser.UserID);
     var item = await itemdb.getItem(req.body.itemCode,itemModel);


     var item = await itemdb.getItem(req.body.itemCode,itemModel);

              let flag=0;

              for(let i=0; i<useritems.length; i++){
                if (req.body.itemCode==useritems[i].itemCode) {
                  flag=1;
                  item.Rating=useritems[i].Rating;
                 item.Ordered=useritems[i].Ordered;
                  res.render('feedback', {theItem:item,theUser:req.session.theUser});
                }
              }
              if (flag==0) {
                res.render('myItems', {UserItems:useritems,theUser:req.session.theUser});
              }
            }



            else if(req.body.action=="updateFlag"){
           if(req.body.Ordered=="Yes"){

               userItemDb.OrderedIt(req.body.itemCode,req.session.theUser.UserID,true);
               var useritems=await userItemDb.getUserItems(req.session.theUser.UserID);
               res.render('myItems',{UserItems:useritems,theUser:req.session.theUser});

           }else{
               userItemDb.OrderedIt(req.body.itemCode,req.session.theUser.UserID,false);
               var useritems=await userItemDb.getUserItems(req.session.theUser.UserID);
               res.render('myItems',{UserItems:useritems,theUser:req.session.theUser});
           }

       }

    else if(req.body.action=="updateRating"){

             var ratingVal=req.body.star;
             if(typeof ratingVal!=="undefined"){
               userItemDb.addItemRating(req.body.itemCode,req.session.theUser.UserID,ratingVal);
             }else {
               userItemDb.addItemRating(req.body.itemCode,req.session.theUser.UserID,"0");
             }
             var useritems=await userItemDb.getUserItems(req.session.theUser.UserID);
             res.render('myItems',{UserItems:useritems,theUser:req.session.theUser});
           }


}else{
    res.render('login',{theUser:null,UserItems:null});
}

});

module.exports=userRouter;
