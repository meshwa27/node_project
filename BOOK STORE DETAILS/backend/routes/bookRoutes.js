
const express =require("express")
const BookModel = require("../models/book")
const { createdata, getdata, singledata, deletedata, updatedata } = require("../controllers/bookController")

const bookrouter=express.Router()
bookrouter.post("/create",createdata)
   
   bookrouter.get("/getbook",getdata)
   
   bookrouter.get("/singledata/:id",singledata)
   
   
   bookrouter.delete("/delete/:id",deletedata)
   
   bookrouter.patch("/update/:id",updatedata);

 
   module.exports=bookrouter;
