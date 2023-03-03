const express=require("express");
const connectTomongo=require("./db");
var cors = require('cors')

connectTomongo();
const app=express();
app.use(cors())//to all use api
const port=5000;

app.use(express.json()) //midelware to post data
// Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port,(req,res)=>{
    console.log(`Example app listening on http://localhost:${port}`);
});