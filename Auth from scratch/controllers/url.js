import { nanoid } from "nanoid";
import URL from '../models/url.js';


async function handleNewShortUrl(req,res){
    console.log(req.body);
    const body=req.body;
    if(!body.url) return res.status(400).error({error: "url is required"});

    const shortid = nanoid(5);

    await URL.create({
        shortId : shortid,
        redirectURL :body.url,
        visitHistory:[],
        totalClicks:0,
        createdBy:req.user._id,

    });

    res.render('home',{id:shortid});

    // res.json({id: shortid});
}

async function handleShortUrl(req,res){
    const shortid = req.params.shortid;

    // const data = await URL.findOne({ shortId: shortid });
    // const click= parseInt(data.totalClicks);
    // console.log("current clicks - " ,click);

    const entry = await URL.findOneAndUpdate(
        {shortId:shortid},
        {
            $push:{
                visitHistory: {
                    timestamp:Date.now(),
                }
            },
            // totalClicks : click+1,
        }
    );
    // console.log(entry.redirectURL)
    res.redirect(entry.redirectURL);

}

async function handleGetAnalytics(req,res){
    const shortId= req.params.shortid;
    const data =await URL.findOne({shortId});
    // console.log(data);


    res.json({
        totalClicks : data.visitHistory.length,
        history :data.visitHistory,
    });
}




export {handleNewShortUrl,handleShortUrl,handleGetAnalytics};