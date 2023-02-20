const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');


const db = mysql.createPool({
    host: "localhost",
    user:"root",
    password:"",
    database:"CRUDDataBase",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get',(req,res)=>{
    const sqlSelect = "SELECT * FROM reviews";
    db.query(sqlSelect,(err,result)=>{
        res.send(result);
    });

});

app.post('/api/insert',(req,res)=>{

    const name = req.body.name;
    const reviews = req.body.reviews;
    const sqlInsert = "INSERT INTO reviews (name,reviews) VALUES (?,?)";
    db.query(sqlInsert, [name,reviews],(err,result)=>{
        console.log(result);
    });

});

app.delete('/api/delete/:Id',(req,res)=>{
    const idn = req.params.Id;
    const sqlDelete = "DELETE FROM reviews WHERE Id = ?";

    db.query(sqlDelete,idn,(err,result) =>{
        if(err) console.log(err);
    });
});

app.put('/api/update',(req,res)=>{
    const idn = req.body.Id;
    const reviews = req.body.reviews;
    const sqlUpdate = "UPDATE reviews SET reviews = ? WHERE Id = ?";

    db.query(sqlUpdate,[reviews,idn],(err,result) =>{
        if(err) console.log(err);
    });
});

app.listen(3001, ()=>{
    console.log("running on port 3001");
});