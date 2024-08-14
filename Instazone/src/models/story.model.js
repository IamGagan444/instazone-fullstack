import mongoose, { Types } from "mongoose";

const storySchema = new mongoose.Schema({
    userId:{
        type:Types.ObjectId,
        ref:"User"
    },
    mediaUrl: String,
    contentType:{
        type:String
        ,enum:["image","video"],
        required:true
    }, 
    caption: String,
    expiresAt: { type: Date, default: () => new Date(Date.now() + 24*60*60*1000) }, // 24 hours from now
  
},{timestamps:true});

export const Story = mongoose.model("Story",storySchema)
