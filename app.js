let express = require("express");
let app = express();


app.get("/",(req,res)=> {
    
    res.send("Hello World");
    
    
    });
    
    
app.get("/joke",(req,res)=> {
    let joke = "This is not a joke";
    res.send(joke);
});

app.get("/random",(req,res)=> {
    
    let num = Math.floor(Math.random() * 10 ) + 1;
    res.send("Your Lucky number is "+ num);
})

app.listen(8080,() => {
    console.log("Server running on 8080!!!!");
});

