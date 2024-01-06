const jwt= require("jsonwebtoken");
const cookieParser=require("cookie-parser");
const userDetails= require("../models/details")


module.exports.auth=async (req,res,next)=>{
    try{
        const getCookie= req.cookies.logined;
        const matchedtoken= jwt.verify(getCookie,process.env.SECRET_KEY);
        // const getData = await userDetails.findOne({_id:matchedtoken._id});
        // console.log(getData);
        next();
    }
    catch(err){
        res.send(err)
    }

}

module.exports.deleteCookie = async (req,res)=>{
    const getCookie= req.cookies.logined;
    // console.log(getCookie)
    res.clearCookie("logined");
    const matchedtoken= jwt.verify(getCookie,process.env.SECRET_KEY);
    // console.log(matchedtoken)
    const getData = await userDetails.findOne({_id:matchedtoken._id});
    getData.tokens= getData.tokens.filter((element)=>{
        return element.token !== getCookie
    })
    await getData.save()
    return

}
module.exports.deleteallCookie = async(req,res)=>{
    const getCookie= req.cookies.logined;
    res.clearCookie("logined");
    const matchedtoken= jwt.verify(getCookie,process.env.SECRET_KEY);
    const getData = await userDetails.findOne({_id:matchedtoken._id});
    getData.tokens =[]
    await getData.save()
    return
}
