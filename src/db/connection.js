require('dotenv').config()
const mongoose =require("mongoose");

async function main (){
    await mongoose.connect(process.env.DB)
}
main().then(()=>{console.log("connecting with db")}).catch(err=>{console.log(err)});