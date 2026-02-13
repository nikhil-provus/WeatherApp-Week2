import type { WeatherResponse } from "../interfaces/WeatherResponse";
import type { ForecastDetails } from "../interfaces/ForecastDetails";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

export const getCurrentWeather = async (query: string): Promise<WeatherResponse> => {
  const res = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${query}`);
  const ans:WeatherResponse= await res.json();
  if(ans.error){
    alert(ans.error.message);
  }
  return ans;
};

export const getMultipleLocations=async (queries:string[]):Promise<WeatherResponse[]>=>{
  const data = queries.map((query:string) =>
    fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${query}`).then((res) =>
      res.json() as Promise<WeatherResponse>
    )
  );
  const results = await Promise.all(data);
  return results;
}

export const getForecastWeather = async (query: string, days: number): Promise<ForecastDetails> => {
  const res = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${query}&days=${days}`);
  const ans :ForecastDetails=await res.json();
  if(ans.error){
    alert(ans.error.message);
  }
  return ans;
};

export const getFutureWeather = async (query: string, date: string): Promise<ForecastDetails> => {
  const res = await fetch(`${BASE_URL}/future.json?key=${API_KEY}&q=${query}&dt=${date}`);
  const ans :ForecastDetails=await res.json();
  if(ans.error){
    alert(ans.error.message);
  }
  return ans;
};
