import fetch from "node-fetch";
import mongoose, { Schema } from 'mongoose'
import http from 'http';
mongoose.connect("mongodb://localhost:27017/posts");
var res1={}
const postSch=new mongoose.Schema({
    userid:{
        type:Number,
        required: true
 },
id:{
    type:Number,
    required: true
},
title:{
    type:String,
    required: true
},
decr:{
    type:String,
    required: true
}

});
const post = mongoose.model('Post',postSch);

async function fun(){
   const data= await fetch('https://jsonplaceholder.typicode.com/posts')
   res1= await data.json();
   
  for(let i=0;i<res1.length;i++){
    
   const obj=new post(
        {
            userid:res1[i]['userId'],
            id:res1[i]['id'],
            title:res1[i]['title'],
            decr:res1[i]['body']
        }
    )
    obj.save();


  }
}
console.log(res1)
fun()


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(res1);
 
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

