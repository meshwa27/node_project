const express = require("express");
const fs = require("fs");
var cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/getproduct", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);  
        } else {
            res.send(data);  
        }
    });
});

app.post("/addproduct", (req, res) => {
   
   
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            const products = JSON.parse(data);  
             const newProduct = req.body; 

             newProduct.id=products.length+1;
            products.push(newProduct);  

            fs.writeFile("./db.json", JSON.stringify(products), (err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Product added successfully");
                }
            });
        }
    });
});

app.delete("/deleteproduct/:id",(req,res)=>{
    const {id} =req.params
    
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err)
        {
            res.send(err)
        }
        else{
        let newdata=JSON.parse(data)
        newdata = newdata.filter((el)=> el.id!=id)
        fs.writeFile("./db.json",JSON.stringify(newdata),(err)=>{
            if(err)
            {
                res.send(err)
            }
            else{
                res.send("product deleted")
            }
        })
        
            res.send("ok")
        }



    })
})


app.patch("/updateproduct/:productid", (req,res) => {
    const {productid} = req.params;

    fs.readFile("./db.json","utf-8", (err,data) => {
        let newdata =  JSON.parse(data);
        const index = newdata.findIndex((el) => el.id == productid)
        
        if(index!=-1)
            {
              newdata[index] = {...newdata[index], ...req.body};
              fs.writeFile("./db.json", JSON.stringify(newdata), (err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Product updated successfully");
                }
            });

            }
            else{
              res.end("err");
            };      
    });
    
});

app.get("/getproduct/:id", (req, res) => {
    const { id } = req.params;
    
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            const products = JSON.parse(data);
            const product = products.find(p => p.id == id);
            
            if (product) {
                res.send(product);
            } else {
                res.status(404).send("Product not found");
            }
        }
    });
});


app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
