const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const router = require("../src/routes/routes");
app.use(router)
app.set("view engine","hbs")
app.listen(PORT,()=>{
    console.log(`serevr is running at port no ${PORT}`);
});
