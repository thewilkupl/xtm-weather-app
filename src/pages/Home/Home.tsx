import React, { useState, useEffect } from "react";
import WeatherBox from "../../components/WeatherBox/WeatherBox";
import { Data, Coordinates, Location } from "../../types/homeTypes";
import { Wrapper } from "./styles";
import ForecastBox from "../../components/ForecastBox/ForecastBox";

const Home = () => {
  const [location, setLocation] = useState<Coordinates>({
    lat: "52.40",
    lon: "16.93",
  });
  const [city, setCity] = useState<Location>("Poznan");
  const [weather, setWeather] = useState<Data | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=hourly,minutely,alerts&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.log("Fetch error: ", error);
      }
    };
    fetchWeather();
  }, [location]);

  const setCordinates = (city: Location) => {
    switch (city) {
      case "Poznan":
        setLocation({
          lat: "52.40",
          lon: "16.93",
        });
        break;
      case "London":
        setLocation({
          lat: "51.50",
          lon: "-0.11",
        });
        break;
      case "Havana":
        setLocation({
          lat: "23.11",
          lon: "-82.36",
        });
        break;
    }
    setCity(city);
  };

  return (
    <Wrapper>
      <h1>XTM Weather</h1>
      <label htmlFor="locations">Choose location</label>
      <select
        name="locations"
        id="locations"
        value={city}
        onChange={(e) => setCordinates(e.target.value as Location)}
      >
        <option value="Poznan">Poznań</option>
        <option value="London">Londyn</option>
        <option value="Havana">Havana</option>
      </select>
      {weather ? (
        <>
          <WeatherBox weather={weather} />
        </>
      ) : null}
      {weather && weather.daily ? <ForecastBox weather={weather} /> : null}
    </Wrapper>
  );
};

export default Home;
