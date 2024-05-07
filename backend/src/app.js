import express from 'express';
const app = express()

app.get("/",(req,res)=>
{
    res.status(200).send("Sistema para lojas em node js");
})
export default app;