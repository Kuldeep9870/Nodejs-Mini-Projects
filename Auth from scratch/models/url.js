import mongoose from "mongoose";

const urlSchema =new  mongoose.Schema({
    shortId:{
        type: String,
        required:true,
        unique:true,
    },
    redirectURL :{
        type:String,
        required:true,
    },
    totalClicks:{
        type:Number,
    },
    visitHistory :[{timestamp :{type:Number}}],
    createdBy :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    }
},
{timestamps:true}
);


const URL=mongoose.model('url',urlSchema);

export default URL;