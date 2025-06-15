const mongoose = require ('mongoose')
const dotenv = require('dotenv')
dotenv.config();


const DBConnection = async() =>{
    const MONGO_URL=process.env.MONGO_URL;
    try{
        await mongoose.connect(MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("Connected to mongoDB")
    }
    catch(error){
        console.log("Error connecting mongoDB",error)
    }
}
module.exports = {DBConnection};