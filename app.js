const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post('/',(req,res)=>{
    const query=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=be024fc4eb16a620c1944a3119029241&units=metric";
    https.get(url,(response)=>{
        console.log(response);
        console.log(response.statusCode);
        
        response.on('data',(d)=>{
                
            const weatherData=JSON.parse(d);
            console.log(weatherData);

            const des=weatherData.weather[0].description;
            const temp=weatherData.main.temp;
            const icon=weatherData.weather[0].icon;
            const img_url="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The weather in "+query+" is "+des+".</h1>");
            res.write("<h3>The temperature is "+temp+" degrees Celcius.</h3>");
            res.write("<img src="+img_url+">");
            res.send();
  
        });
    });
      console.log("Server is up and running :>");
      console.log("post successful");
});

app.listen(process.env.PORT||3000,()=>{
    console.log("Listening at port 3000");
});