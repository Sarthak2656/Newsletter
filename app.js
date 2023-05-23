const express=require("express");
const app=express();
const bp=require("body-parser");
const request=require("request");
const https=require("https");
require('dotenv').config();

app.use(bp.urlencoded({extended:true}));
app.use(express.static("Dir1"));
app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res)
{
    var Fname=req.body.fname;
    var Lname=req.body.lname;
    var Email=req.body.mail;
    var data={
        members:[
            {
                email_address:Email,
                status:"subscribed",
                merge_fields:{
                    FNAME:Fname,
                    LNAME:Lname
                }
            }
        ]
    };
    var jsondata=JSON.stringify(data);
    const url="https://us8.api.mailchimp.com/3.0/lists/43055f84a3";
    const options={
        method:"POST",
        auth:"Sarthak1:"+process.env.Api_key,
    }
    const request=https.request(url,options,function(resp)
    {
        if(resp.statusCode===200)
        res.sendFile(__dirname+"/success.html");
        else
        res.sendFile(__dirname+"/failure.html");
        resp.on("data",function(data)
        {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata);
    request.end();
});

app.post("/fail",function(req,res)
{
    res.redirect("/");
})

app.listen(process.env.PORT||3000,function()
{
    console.log("Server started at port 3000")
})

//dc88bd785c1e8a18cdbdde8e3cbed07c-us8   --api key
//43055f84a3  --audience id