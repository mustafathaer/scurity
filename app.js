//jshint esversion:6
const express = require("express") ;
const ejs = require ("ejs");
const bodyparser = require("body-parser");
const mongoose = require ("mongoose");

const app = express();

app.use(express.static("public")) ;

app.set("view engine","ejs");

app.use(bodyparser.urlencoded({extended:true})) ;

mongoose.connect("mongodb://localhost:27017/UserDB",{UseNewUrlParser:true});


app.get("/",function(req,res){
  res.render("home")
});

app.get("/login",function(req,res){
  res.render("login");

});

 app.get("/register",function(req,res){
   res.render("register")

 });

 const userschema = {
   email:String ,
   password :String ,
 };


 const User = mongoose.model("User",userschema);


 app.post("/register",function(req,res){

const newUser =  new User({
  email : req.body.username,
  password :req.body.Password
});
newUser.save(function(err){
  if (err){
    console.log(err);
  }else{
    res.render("secrets")
  }
});

app.post("/login",function(req,res){
  const username =req.body.username ;
  const password = req.body.password ;

  User.findOne({email:username},function(err,founduser){
    if (err){
      console.log(err);
    } else {
      if(founduser) {
        if(founduser.password === password){
          res.render("secrets");
        }

      }
    }
  })
});


















 })






















app.listen(3000,function(){
  console.log("the app is working on 3000"  );
});
