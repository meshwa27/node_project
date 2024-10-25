
const mongoose=require("mongoose")


const bookschema= new mongoose.Schema({
    title:String,
    author:String,
    prscription:String,
    isice:Number,
    debn:Number,
    

})

const BookModel=mongoose.model("user",bookschema)

module.exports=BookModel;