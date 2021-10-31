const mongoose = require('mongoose')

const connectDB = async ()=>{
    try{
const con = await mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
  
})
console.log("mongodb connected:")
    }catch(err){
console.log(err);
process.exit(1)
    }
}

module.exports=connectDB