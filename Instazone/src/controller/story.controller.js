import {AsyncHandler} from "../utils/asyncHandler.js"

const addStory = AsyncHandler(async(req,res,next)=>{

    const {caption}=req.body;

    const filePath = req.files;

    console.log(filePath)



})