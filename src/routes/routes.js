const express=require("express");
const router = express.Router();
require("../db/connection")
const userDetails= require("../models/details")
const bcrypt= require("bcrypt")
const cookieParser = require("cookie-parser")
const {auth,deleteCookie,deleteallCookie} = require("../middleware/auth")
const jwt = require("jsonwebtoken");


router.use(express.static("F:/Projects/reg and login form/public"));
router.use(express.urlencoded({extended:false}));
router.use(cookieParser());


router.get("/login",(req,res)=>{
    res.render("login");
});
router.post("/login", async(req,res)=>{
    try{
        const email = req.body.emailid;
        const password=req.body.password;
    const getData = await userDetails.findOne({emailId:email}) 
    const isMatch= await bcrypt.compare(password,getData.password);
    if(isMatch){
        const loginToken= await getData.generateToken();
        console.log(`login token is ${loginToken}`);
        res.cookie("logined",loginToken,{
            expires: new Date(Date.now()+100000),
            httpOnly:true
        })
        res.redirect("/home");
    }
    else{
        res.status(400).send("login failed")
    }    
    }
    catch{
        res.status(400).send("login failed1")
    }
});


router.get("/register",(req,res)=>{
    res.render("register");
});


router.post("/register", async(req,res)=>{
    const password=req.body.password;
    const cPassword= req.body.confirmpassword;
    if(password === cPassword){
            const newData = new userDetails({
                firstName :req.body.firstname,
                lastName :req.body.lastname,
                emailId :req.body.email,
                phoneNo :req.body.phoneno,
                password :req.body.password,
                gender :req.body.gender
            })
            const regToken = await newData.generateToken();
            res.cookie("logined",regToken,{
                expires: new Date(Date.now()+100000),
                httpOnly:true
            })
            const output= await newData.save();
            res.redirect("home");
            
        }
    else{
        res.status(400).send("password and confirm password is not matching");
    }
    console.log(req.body);
    res.end()
})


router.get("/home",auth,(req,res)=>{
    res.render("secretpage");
})

router.get("/logout",auth,async(req,res)=>{
    deleteCookie(req,res);
    res.redirect("login");
})

router.get("/logoutall",auth,async(req,res)=>{
    deleteallCookie(req,res);
    res.redirect("login");
})
module.exports=router; 