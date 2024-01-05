const mongoose =require("mongoose");

async function main (){
    await mongoose.connect("mongodb://127.0.0.1:27017/reg&login")
}
main().then(()=>{console.log("connecting with db")}).catch(err=>{console.log(err)});