const express = require("express");
const db = require("./db");
const app = express();

app.get("/api/project",async(request, response)=>{
    const  result =await db.query("SELECT * FROM users")
    response.status(200).json(result);

});


app.post("/api/user/register",(request, response)=>{

    response.status(200).json({name: "Sneha", email: "sneha@gmail.com", id: 1});

});


app.listen(4003, (error)=>{
    if(error) console.log("Error "+ error);
    console.log("Server is running on port 4000");
})

