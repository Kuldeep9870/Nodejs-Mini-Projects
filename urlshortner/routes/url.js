import express from "express";
import {handleNewShortUrl,handleShortUrl,handleGetAnalytics} from "../controllers/url.js";

const router=express.Router();

router.post('/',handleNewShortUrl);

router.get('/:shortid',handleShortUrl);

router.get('/analytics/:shortid',handleGetAnalytics);

export default router;