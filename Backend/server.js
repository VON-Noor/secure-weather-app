const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running ");
});

// WEATHER ROUTE
app.get("/weather", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const apiKey = process.env.API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    // If OpenWeather returns an error
    if (data.cod !== 200) {
      return res.status(data.cod).json(data);
    }

    res.json(data);

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
