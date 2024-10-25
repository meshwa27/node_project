const express=require("express")
const {connection} = require("./db")
const BookModel = require("./models/book")
const cors = require('cors');
const bookrouter = require("./routes/bookRoutes");

const app=express()

app.use(express.json())
app.use(cors());
app.use("/book",bookrouter)

app.listen(8000,async()=>{
  try {
    await connection
    console.log("connected to db")
    console.log("server is running on port 8000")
  } catch (error) {
    console.log(error)
  }
})