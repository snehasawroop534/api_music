const express = require("express");
const app = express();

app.get("/api/user",(request, response)=>{
    response.status(200).json({name: "Sneha", email: "sneha@gmail.com", id: 1});

});


app.post("/api/user",(request, response)=>{
    response.status(200).json({name: "Sneha", email: "sneha@gmail.com", id: 1});

});


app.listen(4000, (error)=>{
    if(error) console.log("Error "+ error);
    console.log("Server is running on port 4000");
})

