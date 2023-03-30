const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/temporary")
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log("error",err);
});