import express from 'express';

const app =express();

const port =8000;


app.get('/',(req,res)=>{
    // console.log('process id - ',process.pid);
    res.send(`process id - ${process.pid}`)
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})