import "dotenv/config.js"
import { connectDB } from "./db/connectdb.js"

import { app } from "./app.js"

connectDB().then(()=>{
app.listen(process.env.PORT||4000,()=>{
    console.log("your app is listening at port number 4444")
})
}).catch(()=>{
    console.log("database connection failed while connecting it into server")
})