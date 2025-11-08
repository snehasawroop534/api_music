const express = require("express");
const db = require("./db");
const app = express();

app.get("/api/project",async(request, response)=>{
    const  result =await db.query("SELECT * FROM users")
    response.status(200).json(result);

});


app.post("/api/project/register",async(request,response)=>{

    const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password;
    const hashPassword = await bcrypt.hash(password, 10);
  

    db.query("INSERT INTO users(name, email , password) VALUES (? , ? , ?)",[name, email, hashPassword],(error, result)=>{
        if(error) return response.status(500).json({message : "Server internal error"});
        response.status(201).json({id: result.insertId,name : name, email : email});
     } );
});


app.post("/api/project/login", async (request,response)=>{

    const email = request.body.email;
    const password = request.body.password;
   

    db.query("SELECT * FROM users WHERE email=?",[email],async(error, result)=>{
        if(error) return response.status(500).json({message : "Server internal error"});
        const dbPassword = result[0].password;
          const name = result[0].name;
          const email = result[0].email;
        const isPasswordSame = await bcrypt.compare(password,dbPassword);
        if(isPasswordSame){
             const secretkey ="sddfgh56ds";
            const token = jwt.sign({name:name, email:email}, secretkey,{expiresIn:"1h"} ); //token
             response.status(200).json({message: "Login Success", token: token})
        }
        else{


           response.status(200).json({message: "Login Failed"}) 
        }
        
     } );

    })




app.listen(4004, (error)=>{
    if(error) console.log("Error "+ error);
    console.log("Server is running on port 4004");
})

