const BookModel = require("../models/book")

const createdata=async(req,res)=>{

  try {
   await BookModel.create(req.body)
   res.send("user created successfully")
   console.log("ohk")
   
 
  } catch (error) {
   res.send(error)
  }
 }


 const getdata=async(req,res)=>{
   
  try {
   const data= await BookModel.find()
   res.send(data)
  } catch (error) {
    res.send(error)
  }
}

const singledata=async(req,res)=>{
  const {id}=req.params
 try {
 const data= await BookModel.findById(id)
    res.send(data)
 } catch (error) {
    res.send(error)
 }
}

const deletedata=async(req,res)=>{
  const {id}=req.params

  try {
    await BookModel.findByIdAndDelete(id)
    res.send("deleted successfully")
  } catch (error) {
    res.send(error)
  }
}

const updatedata=async (req, res) => {
  const { id } = req.params;
  const { title, author, price, description, isbn } = req.body;
  try {
      const updatedBook = await BookModel.findByIdAndUpdate(id, { title, author, price, description, isbn }, { new: true });
      if (updatedBook) {
          res.send("updated successfully");
      } else {
          res.status(404).send("Book not found");
      }
  } catch (error) {
      res.status(500).send(error.message);
  }
}
module.exports={createdata,getdata,singledata,deletedata,updatedata}