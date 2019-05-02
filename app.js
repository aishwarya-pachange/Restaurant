var express= require('express');
var app= express();
var routes=require('./controller/catalogController.js');
var userRouter=require('./controller/profileController.js');
var mongoose=require('mongoose');
var expressValidator = require('express-validator');

mongoose.connect('mongodb://localhost:27017/myitems',{useNewUrlParser:true});
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error : '));
db.once('open',function(){
    console.log('Successfully connected');
});


app.set('view engine', 'ejs');
app.use('/assests', express.static('assests'));
app.use(expressValidator());
app.use('/',routes);
app.use('/profile',userRouter);

app.get('/*',function(req,res) {
    if(req.session.theUser){
      res.redirect('/index');
    }else{
      res.redirect('/index');
    }
  })


app.listen(8080,function(){
    console.log('app started')
    console.log('listening on port 8080')
});
