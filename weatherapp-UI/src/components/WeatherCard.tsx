import React from "react";
import type { WeatherResponse } from "../interfaces/WeatherResponse";
import type { ForecastDetails } from "../interfaces/ForecastDetails";
import { ForeCastCharts } from "./ForeCastCharts";
import "./WeatherCard.css";

interface Props {
  data: WeatherResponse | ForecastDetails;
  type: "current" | "future" |"forecast";
}

export const WeatherCard: React.FC<Props> = ({ data, type }) => {

  if (type === "current" && "current" in data) {
    return (
      <div className="weather-card">
            <div className="top">
              <h2>{data.location.name}</h2>
              <div className="main-info">
                <img 
                  src={data.current.condition.icon} 
                  className="weather-icon"
                />
                <h1>{data.current.temp_c}°C</h1>
              </div>
              <p className="condition-text">{data.current.condition.text}</p>
            </div>
            <div className="details-grid">
              <div className="detail-item">
                <span>Wind</span>
                <p>{data.current.wind_kph} km/h</p>
              </div>
              <div className="detail-item">
                <span>Humidity</span>
                <p>{data.current.humidity}%</p>
              </div>
              <div className="detail-item">
                <span>Pressure</span>
                <p>{data.current.pressure_mb} mb</p>
              </div>
            </div>
      </div>
    );
  }

  if (type === "future" && "forecast" in data) {
    return (
      <div className="weather-card">
            <p>
              <img 
                  src={data.forecast.forecastday[0].day.condition.icon} 
                  className="weather-icon"
                />
                <br />
              <strong>Date:</strong> {data.forecast.forecastday[0].date}<br/>
              <strong>Temp:</strong> {data.forecast.forecastday[0].day.avgtemp_c}°C<br/>
              <strong>Sky:</strong> {data.forecast.forecastday[0].day.condition.text}
            </p>
          </div>
    );
  }
   if (type === "forecast" && "forecast" in data) {
    return (
      <ForeCastCharts
        city={data.location.name}
        temp={data.forecast.forecastday[0].day.avgtemp_c}
        condition={data.forecast.forecastday[0].day.condition.text}
        forecast={data.forecast.forecastday}
      />
    );
   }
};
