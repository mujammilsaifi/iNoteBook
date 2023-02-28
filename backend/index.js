const express=require("express");
const connectTomongo=require("./db");

connectTomongo();
const app=express();
const port=5000;

app.use(express.json()) //midelware to post data
// Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port,(req,res)=>{
    console.log(`Example app listening on http://localhost:${port}`);
});