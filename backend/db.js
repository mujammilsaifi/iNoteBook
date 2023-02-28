const mongoose=require("mongoose");
const mongoURL="mongodb://127.0.0.1:27017/inotebook"
mongoose.set("strictQuery", false);
const connectTomongo=  ()=>{
    mongoose.connect(mongoURL).then(()=>console.log("connect")).catch((err)=>console.log("not conecct",err))
}

module.exports=connectTomongo;