import express from "express";
import URL from '../models/url.js';

const router=express.Router();

router.get('/',async (req,res)=>{
    if(!req.user)  return res.redirect('/login');
    const allurl =await URL.find({createdBy: req.user._id});
    return res.render("home",{
        url:allurl,
    });
});

router.get('/signup',(req,res)=>{
    res.render('signup');
});

router.get('/login',(req,res)=>{
    res.render('login');
});


export default router;