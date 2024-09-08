import cluster from 'cluster';
import os from 'os';
import express from 'express';


const totalCPU = os.cpus().length;

// console.log(totalCPU);
if(cluster.isPrimary){
    // console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPU; i++) {
    cluster.fork();
  }
}else{
    const app =express();

const port =8000;


app.get('/',(req,res)=>{
    // console.log('process id - ',process.pid);
    // res.send(`process id - ${process.pid}`)
    return res.json({
        message:`hell from server - ${process.pid}`
    })
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
}