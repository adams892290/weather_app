const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const app = express();
const dbUrl = process.env.DB_URL;
const port = process.env.PORT || 8000;
const Weather = require("./models/weather");

mongoose.connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

app.post("/weather", async (req, res) => {

    const newWeather = new Weather({
        name: req.body.name,
        main: req.body.weather[0].main,
        description: req.body.weather[0].description,
        temp: req.body.main.temp,
        temp_min: req.body.main.temp_min,
        temp_max: req.body.main.temp_max,
        feels_like: req.body.main.feels_like,
        pressure: req.body.main.pressure,
        humidity: req.body.main.humidity,
        visibility: req.body.visibility,
        speed: req.body.wind.speed

    });

    await newWeather.save();
    res.status(200).json({ newWeather });
});

app.get("/weather", async (req, res) => {
    const allWeather = await Weather.find({});

    res.status(200).json({ allWeather });
});