import React, { useEffect, useState } from 'react';
import axios from "axios";
import dotenv from "dotenv";

const App = () => {

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState({});
    const [weatherHistory, setWeatherHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    const fetchHistory = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API}/weather`);

        setWeatherHistory(res.data.allWeather);
    }

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleOnChange = (event) => {
        setCity(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_ID}`);

        const data = { ...res.data };

        res = await axios.post(`${process.env.REACT_APP_API}/weather`, data);

        weatherHistory.push(res.data.newWeather);

        setWeatherHistory(weatherHistory);

        setWeather(res.data.newWeather);

    }
    console.log(weatherHistory);

    return (
        <>

            <h2>Weather Search</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="city">City: </label>
                <input required type="text" id="city" onChange={handleOnChange} />
                <button type="submit">Submit</button>
            </form>

            <button onClick={() => setShowHistory((prev) => !prev)}>{showHistory ? "Hide" : "Show"} History</button>

            {weather.name ? (
                <>
                    <h2>Current Weather Conditions At {weather.name}</h2>
                    <h3>{weather.main}</h3>
                    <h3>{weather.description}</h3>
                    <h4>Temperature</h4>
                    <span>Current Temperature: {weather.temp} &#176;F</span><br />
                    <span>Min: {weather.temp_min} &#176;F</span><br />
                    <span>Max: {weather.temp_max} &#176;F</span><br />
                    <span>Feels like: {weather.feels_like} &#176;F</span><br />

                    <h4>Details</h4>
                    <span>Pressure: {weather.pressure}</span><br />
                    <span>Humidity: {weather.humidity}</span><br />
                    <span>Visibility: {weather.visibility}</span><br />
                    <span>Wind Speed: {weather.speed}</span><br />

                </>
            ) : null}

            {showHistory && weatherHistory.length > 0 ?
                <>
                    <h2>Search History</h2>
                    {weatherHistory.map((weather) =>
                    (
                        <>
                            <h2>City: {weather.name}</h2>
                            <h3>{weather.main}</h3>
                            <h3>{weather.description}</h3>
                            <h4>Temperature</h4>
                            <span>Current Temperature: {weather.temp} &#176;F</span><br />
                            <span>Min: {weather.temp_min} &#176;F</span><br />
                            <span>Max: {weather.temp_max} &#176;F</span><br />
                            <span>Feels like: {weather.feels_like} &#176;F</span><br />

                            <h4>Details</h4>
                            <span>Pressure: {weather.pressure}</span><br />
                            <span>Humidity: {weather.humidity}</span><br />
                            <span>Visibility: {weather.visibility}</span><br />
                            <span>Wind Speed: {weather.speed}</span><br />
                        </>
                    )
                    )}
                </>
                : showHistory ? <><br /><span>No Search history</span></> : null}
        </>
    )
}

export default App;
