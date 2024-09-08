import User from '../models/user.js';
import {setUser} from '../service/auth.js'
import { v4 as uuidv4 } from 'uuid';

async function handleSignUp(req,res){
    const {name,email,password}=req.body;
    User.create({
        name,
        email,
        password,
    });

    
    res.render('home');
}

async function handleLogin(req,res){
    const {email,password}=req.body;
        const user =await User.findOne({email,password});
        console.log(user);
        if(!user)
            return res.render('login')



    const token=setUser(user);
    res.cookie("uid",token);
    res.redirect('/');
}

export {handleSignUp,handleLogin};