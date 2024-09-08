import fs from 'fs';
import express from 'express';
import status from 'express-status-monitor'

import  path from 'path';

const port = 8000;
const app = express();

app.set('view engine', 'ejs');

app.use(status());


app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/video', (req, res) => { 
    const range = req.headers.range 
    const videoPath = './video.mkv'; 
    const videoSize = fs.statSync(videoPath).size 
    const chunkSize = 1 * 1e6; 
    const start = Number(range.replace(/\D/g, "")) 
    const end = Math.min(start + chunkSize, videoSize - 1) 
    const contentLength = end - start + 1; 
    const headers = { 
        "Content-Range": `bytes ${start}-${end}/${videoSize}`, 
        "Accept-Ranges": "bytes", 
        "Content-Length": contentLength, 
        "Content-Type": "video/mp4"
    } 
    res.writeHead(206, headers) 
    const stream = fs.createReadStream(videoPath, { 
        start, 
        end 
    }) 
    stream.pipe(res) 
}) 

app.get('/data',(req,res)=>{
    // fs.readFile('./sample.txt',(err,data)=>{
    //     res.end(data);
    // })
    const stream=fs.createReadStream('./sample.txt','utf-8');

    stream.on('data',(chunk)=>{
        res.write(chunk);
    })
    stream.on('end',()=>{
        res.end();
    })
})


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})