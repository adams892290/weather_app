const mongoose = require("mongoose");

const weatherSchema = mongoose.Schema({
    name: String,
    main: String,
    description: String,
    temp: String,
    temp_min: String,
    temp_max: String,
    feels_like: String,
    pressure: String,
    humidity: String,
    visibility: String,
    speed: String
});

module.exports = new mongoose.model("Weather", weatherSchema);
