import fetch from 'node-fetch';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

app.get("/", (req, res) => {

    res.render("index.ejs");
});

app.get("/weather", async (req, res) => {

    const city = req.query.city;
    const state = req.query.state;

    try {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&limit=1&appid=${process.env.OPENWEATHER_API_KEY}`);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;

            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.OPENWEATHER_API_KEY}`);
            const weatherData = await weatherResponse.json();

            const result = {
                temperature: weatherData.main.temp,
                description: weatherData.weather[0]?.description,
                windSpeed: weatherData.wind.speed,
                condition: weatherData.weather[0].main
        };

            return res.json(result);
        }
    } catch (error) {
        console.error(error);
  }
}); 