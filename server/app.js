import express from "express";
import axios from "axios";
import cors from 'cors';


const app = express();
app.use(cors());


app.get('/api', async (req,res)=>{
 try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    console.log(response.data)
    res.json(response.data)
 } catch (error) {
    console.log(error);
   res.json(error);  
 }
})

app.listen('5000',()=>{
    console.log('Server is running on the port 5000');
})