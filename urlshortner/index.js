import express from 'express';
import connectDb from './connect.js';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import path from 'path';

import {verifyLoginUser,checkAuth} from './middlewares/auth.js'

import urlRouter from './routes/url.js';
import staticRoute from './routes/staticRoute.js'
import UserRoute from './routes/user.js'

const port =8000;
const app = express();
app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));

connectDb('');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()) //for raw/json data
app.use(cookieParser());


app.use('/url',verifyLoginUser,urlRouter);
app.use('/',checkAuth,staticRoute);
app.use('/user',UserRoute);

app.listen(port ,()=>{
    console.log(`Server is running on port- ${port}`);
})