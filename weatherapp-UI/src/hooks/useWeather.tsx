import { useState, useEffect } from "react";
import type{ WeatherResponse } from "../interfaces/WeatherResponse";
import type{ ForecastDetails } from "../interfaces/ForecastDetails";
import { getCurrentWeather, getForecastWeather, getFutureWeather ,getMultipleLocations } from "../services/weatherAPI";
import { reverseGeocode } from "../services/geocodeAPI";

export type Domain = "current" | "forecast" | "future" |"multipleLocations";
export type Mode = "city" | "gps";

export const useWeather = () => {
  const [selectedDomain, setSelectedDomain] = useState<Domain>("current");
  const [answer, setAnswer] = useState<WeatherResponse | ForecastDetails| WeatherResponse[] | null>(null);
  const [city, setCity] = useState<string>("");
  const [days, setDays] = useState<number>(1);
  const [currentMode, setCurrentMode] = useState<Mode>("gps");
  const [date, setDate] = useState<string>("");
    const [input, setInput] = useState<string>("");


  const [cities,setCities]=useState<string[]>([]);

  useEffect(() => {
    setAnswer(null);
    // if (selectedDomain !== "multipleLocations") setInput("");
  },[selectedDomain, city],
  );

  const fetchCurrentByGPS = async () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const { latitude, longitude } = position.coords;
      const weatherData = await getCurrentWeather(`${latitude},${longitude}`);
      const locationName = await reverseGeocode(latitude, longitude);
      if (locationName) weatherData.location.name = locationName;
      setAnswer(weatherData);
    } catch (error) {
      console.log("GPS Error:", error);
      alert("Please allow location access");
    }
  };

  const fetchData = async () => {
    try {
      switch (selectedDomain) {
        case "current":
          currentMode === "gps" ? await fetchCurrentByGPS() : setAnswer(await getCurrentWeather(city));
          break;
        case "forecast":
          setAnswer(await getForecastWeather(city, days));
          break;
        case "future":
          setAnswer(await getFutureWeather(city, date));
          break;
        case "multipleLocations":
          setAnswer(await getMultipleLocations(cities) );
          break;
        default:
          break;
      }
    } catch (error) {
      console.log("Error fetching weather:", error);
    }
  };

  return { selectedDomain, setSelectedDomain, answer, city, setCity, days, setDays, currentMode, setCurrentMode, date, setDate, fetchData,cities,setCities ,input,setInput};
};
