let express = require("express");
let mysql = require('mysql');
let faker = require("faker");
let bodyParser = require("body-parser");

let app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));





let connection = mysql.createConnection({
  host     : 'db4free.net',
  user     : 'alphacat',
  password : 'WgAmCrMY3WufJ9t',
  database : 'my_ecom_db'
});

connection.connect();


app.get("/insert",(req,res) => {
   
   let data = [];
   
   for(let i=0; i<500; i++){
        data.push([
       faker.internet.email(),
       faker.date.past()
       ]);
   }
   
   
var q = 'INSERT INTO users (email, created_at) VALUES ?';

connection.query(q, [data], (err, results)=> {
  console.log(err);
  console.log(results);
  res.send("Data Inserted");
  
});
   
  connection.end();  
});


app.get("/",(req,res)=> {
    
    let q = "SELECT COUNT(*) AS count FROM  users";
    connection.query(q, (err,results) => {
        if (err) throw err;
        let count = results[0].count;
        
        //res.send(`We have ${count} users in our database`);
        
        res.render("home",{count});
    });
    
    
    
});

app.post("/register",(req,res)=> {
    
    
    
    let person = {
        
        email :req.body.email
    };
    
    
    let q = 'INSERT INTO users SET?';

    connection.query(q, person, (err, results)=> {
    if(err) throw err;
    
    console.log(results);
    res.redirect("/");
  
});
   

    
    
console.log(`post req sent to /register ${req.body.email}`);
    
});
    
    
app.get("/joke",(req,res)=> {
    let joke = "This is not a <strong> <em>joke</em></strong>";
    res.send(joke);
});

app.get("/random",(req,res)=> {
    
    let num = Math.floor(Math.random() * 10 ) + 1;
    res.send("Your Lucky number is "+ num);
})

const port = process.env.PORT || 8080;
app.listen(port,() => {
console.log(`Listening on port ${port}`);
});

