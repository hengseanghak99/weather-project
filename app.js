const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "1d262532652ccc38b268ba0ee3289e19";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=" + apiKey + "";

  https.get(url, function (response) {
    console.log(response.statusCode);
    if(response.statusCode ===200)
    {
      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const desc = weatherData.weather[0].description;
        const name = weatherData.name;
        const icon = weatherData.weather[0].icon;
        const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        console.log("Today " + name + "'s weather is " + temp + " with " + desc);
        res.write("<p>The weather currently is   " + desc + "</p>");
        res.write("<h1> Today " + name + "'s weather is " + temp + " degree Celcius with " + desc + "</h1>");
        res.write("<img src=" + imageURL + ">");
        res.send();
      })
     
    }
    else
    {
      res.sendFile(__dirname + "/testing.html")
    }
   
  })
})

app.listen(3000, function () {
  console.log("test server is running");
})

