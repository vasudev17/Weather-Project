const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    const city = req.body.cityName;
    const apiKey = "7717bfea9c4f949e6b4f0ab8e56ddf3d";
    const unit = req.body.units;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+",CA&units="+unit+"&appid="+apiKey;
    https.get(url,function(response){
        console.log(response);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const city = weatherData.name;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(temp);
            console.log(weatherDescription);
            //$("h1").text("The temperature in " + city + " is " + temp + " °C");
            var symbol = "F";
            if (unit == "metric"){
                symbol = "C";
            }
            res.write("<h1>The temperature in " + city + " is " + temp + " &#176" + symbol);
            res.write("<h3>The weather is currently "  + weatherDescription +".</h3");
            res.write("<br>");
            //res.write('<head><meta charset="utf-8"></head>');
            res.write("<p><img src=" + iconURL + "></p>"); 
            res.send();
            
        })
    });
})




app.listen(3000, function(){
    console.log("the server is running on port 3000");
});