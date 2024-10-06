const port = process.env.PORT || 8080;


const http = require("http")
const fs =require("fs")

const server = http.createServer((req,res)=>{
    console.log(req.method, req.url)
   if(req.method=="GET" && req.url=="/home"){
        res.end("<h1>this is home page</h1>")
   }else if(req.method=="GET" && req.url=="/about"

   )
   {
        res.end("<h1>This is about page</h1>")
   }
   else if(req.method=="GET" && req.url=="/getproductdata")
   {
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            console.log(err)
            res.end(err)
        }
        else
        {
            const productdatafromdb = JSON.parse(data)
           console.log(data)
            res.end(JSON.stringify(productdatafromdb.data));
        }
    }
)
   
   }
   else if(req.method=="GET" && req.url=="/user")
   {
    fs.readFile("./db.json" , "utf-8" ,(err,user) =>{
        if(err)
        {
            console.log(err)
            res.end(err)
        }
        else{
            const productdatafromdb = JSON.parse(user)
            console.log(user)
             res.end(JSON.stringify(productdatafromdb.user));
        }    
    })
   
   }
   
   else
   {
        res.end("<h1>Page Note Found</h1>")
   }
})

server.listen(8081, () => {
    console.log("server is running at 8081");
});