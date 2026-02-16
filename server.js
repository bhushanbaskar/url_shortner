import express from 'express'
import mongoose from 'mongoose';
import {shortUrl,getOriginalUrl} from './Controllers/url.js'
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(express.urlencoded({extended:true}))

mongoose.connect(
    process.env.MONGO_URI).then(() => console.log("Connected to mongoDB")
).catch((err) => console.log(err)
);
//rendering the UI ejs file
app.get('/',(req,res)=>{
    res.render("index.ejs",{shortUrl: null})
})
//shorting url logic
app.post('/short',shortUrl)

//dynamic route (redirect to original URL when clicked on short url)

app.get('/:shortCode',getOriginalUrl)
const port = process.env.PORT || 1000;
app.listen(port,()=> console.log(`app is running on port ${port}`));