const express=require("express");
const router = express.Router();
require("../db/connection")
const userDetails= require("../models/details")
const bcrypt= require("bcrypt")


router.use(express.static("D:/Drive D/Web Development/Projects/reg and login form/public"));
router.use(express.urlencoded({extended:false}));
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
        res.send(getData);
    }
    else{
        res.status(400).send("login failed")
    }    
    }
    catch{
        res.status(400).send("login failed")
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
            const output= await newData.save();
            res.send(output)
        }
    else{
        res.status(400).send("password and confirm password is not matching");
    }
    console.log(req.body);
    res.end()
})
module.exports=router; 