
// import { useState, useEffect } from "react";
// import "./App.css";
// import { ForeCastCharts } from "./components/ForeCastCharts";

// interface WeatherResponse {
//   location: {
//     name: string;
//     region: string;
//     country: string;
//     localtime: string;
//   };
//   current: {
//     last_updated: string;
//     temp_c: number;
//     temp_f: number;
//     is_day: number; 
//     condition: {
//       text: string;
//       icon: string;
//       code: number;
//     };
//     wind_kph: number;
//     wind_dir: string;
//     pressure_mb: number;
//     precip_mm: number;
//     humidity: number;
//     cloud: number;
//     feelslike_c: number;
//     vis_km: number;
//     uv: number;
//     gust_kph: number;
//   };
// }

// interface ForecastDetails {
//   location: {
//     name: string;
//     country: string;
//   };
//   forecast: {
//     forecastday: {
//       date: string;
//       day: {
//         avgtemp_c: number;
//         maxtemp_c: number;
//         mintemp_c: number;
//         condition: {
//           text: string;
//         };
//       };
//       hour: {
//         time: string;
//         temp_c: number;
//         condition: {
//           text: string;
//           icon: string;
//         };
//       }[];
//     }[];
//   };
// }

// const API_KEY = "446a1e1a882d44c9b2951825260502";

// function App() {
//   const baseUrl = "https://api.weatherapi.com/v1";
//   const domains = ["current", "forecast", "future"];

//   const [selectedDomain, setSelectedDomain] = useState<"current" | "forecast" | "future">("current");
//   const [answer, setAnswer] = useState<WeatherResponse | ForecastDetails | null>(null);
//   const [city, setCity] = useState<string>("");
//   const [days, setDays] = useState<number>(1);
//   const [currentMode, setCurrentMode] = useState<"city" | "gps">("gps");
//   const [date, setDate] = useState<string>("");

//   useEffect(() => {
//     setAnswer(null);
//   }, [selectedDomain, city]);

//   const reverseGeocode = async (lat: number, lon: number): Promise<string | null> => {
//     try {
//       const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
//       const res = await fetch(url, {
//         headers: {
//           Accept: "application/json",
//           "User-Agent": "weather-app",
//         },
//       });
//       const data = await res.json();
//       if (data?.address) {
//         return data.address.neighbourhood || data.address.suburb || data.address.city || null;
//       }
//       return null;
//     } catch (error) {
//       console.log("Reverse Geocode Error:", error);
//       return null;
//     }
//   };

//   const fetchCurrentByGPS = async (): Promise<void> => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser");
//       return;
//     }
//     try {
//       const position = await new Promise<GeolocationPosition>((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject, {
//           enableHighAccuracy: true,
//           timeout: 20000,
//           maximumAge: 0,
//         });
//       });

//       const { latitude, longitude } = position.coords;
//       const weatherUrl = `${baseUrl}/current.json?key=${API_KEY}&q=${latitude},${longitude}`;
//       const weatherRes = await fetch(weatherUrl);
//       const weatherData: WeatherResponse = await weatherRes.json();

//       const exactLocation = await reverseGeocode(latitude, longitude);
//       if (exactLocation) {
//         weatherData.location.name = exactLocation;
//       }

//       setAnswer(weatherData);
//     } catch (error) {
//       console.log("GPS Error:", error);
//       alert("Please allow location access");
//     }
//   };

//   const fetchData = async (): Promise<void> => {
//     try {
//       switch (selectedDomain) {
//         case "current":
//           if (currentMode === "gps") {
//             await fetchCurrentByGPS();
//           } else {
//             const url = `${baseUrl}/current.json?key=${API_KEY}&q=${city}`;
//             await currentWeather(url);
//           }
//           break;
//         case "forecast":
//           await forecastWeather(`${baseUrl}/forecast.json?key=${API_KEY}&q=${city}&days=${days}`);
//           break;
//         case "future":
//           await futureWeather(`${baseUrl}/future.json?key=${API_KEY}&q=${city}&dt=${date}`);
//           break;
//         default:
//           break;
//       }
//     } catch (error) {
//       console.log("Error occurred in fetching data:", error);
//     }
//   };

//   const currentWeather = async (url: string) => {
//     const res = await fetch(url);
//     const data: WeatherResponse = await res.json();
//     setAnswer(data);
//   };
         
//   const forecastWeather = async (url: string) => {
//     const res = await fetch(url);
//     const data: ForecastDetails = await res.json();
//     setAnswer(data);
//   };

//   const futureWeather = async (url: string) => {
//     const res = await fetch(url);
//     const data: ForecastDetails = await res.json();
//     setAnswer(data);
//   }; 

//   return (
//     <div className="App">
//       <h1 className="main-title">
//         <span className="emoji-sun">☀️</span> 
//         Weather Application 
//         <span className="emoji-cloud">☁️</span>
//       </h1>
//       <div className="selection-container">
//         <label>Explore Weather Related features! </label>
//         <select value={selectedDomain} onChange={(e) => setSelectedDomain(e.target.value as any)}>
//           {domains.map((d) => (
//             <option key={d} value={d}>
//               {d.toUpperCase()}
//             </option>
//           ))}
//         </select>
//       </div>

//       <hr style={{ width: '80%', margin: '20px 0', opacity: 0.2 }} />

//       <div className="input-group">
        
//         {selectedDomain === "current" && (
//           <div className="current-options">
//             <div className="radio-group">
//               <label style={{ marginLeft: 15 }}>
//                 <input
//                   type="radio"
//                   value="gps"
//                   checked={currentMode === "gps"}
//                   onChange={() => setCurrentMode("gps")}
//                 />
//                 Use GPS
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   value="city"
//                   checked={currentMode === "city"}
//                   onChange={() => setCurrentMode("city")}
//                 />
//                 Choose City
//               </label>
//             </div>

//             {currentMode === "city" && (
//               <div>
//                 <label>Enter city name</label>
//                 <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
//               </div>
//             )}
//           </div>
//         )}

//         {selectedDomain === "forecast" && (
//           <div className="forecast-options">
//              <div>
//                 <label>Enter city name</label>
//                 <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
//               </div>

//             <div style={{ marginTop: 10 }}>
//               <label>Number of Days: </label>
//               <input 
//                 type="number" 
//                 value={days} 
//                 min={1} 
//                 max={10} 
//                 onChange={(e) => setDays(Number(e.target.value))} 
//               />
//             </div>
//           </div>
//         )}

//         {selectedDomain === "future" && (
//           <div className="future-options">
//              <div>
//                 <label>Enter city name</label>
//                 <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
//               </div>
//             <div style={{ marginTop: 10 }}>
//               <label>Pick Date: </label>
//               <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
//             </div>
//           </div>
//         )}

//       </div>

//       <div style={{ marginTop: 25 }}>
//         <button className="fetch-btn" onClick={fetchData}>
//           Get {selectedDomain.charAt(0).toUpperCase() + selectedDomain.slice(1)} Weather
//         </button>
//       </div>

//       <div className="results-container">
//         {answer && "current" in answer && selectedDomain === "current" && (
//           <div className="weather-card">
//             <div className="top">
//               <h2>{answer.location.name}</h2>
//               <div className="main-info">
//                 <img 
//                   src={answer.current.condition.icon} 
//                   alt={answer.current.condition.text} 
//                   className="weather-icon"
//                 />
//                 <h1>{answer.current.temp_c}°C</h1>
//               </div>
//               <p className="condition-text">{answer.current.condition.text}</p>
//             </div>
//             <div className="details-grid">
//               <div className="detail-item">
//                 <span>Wind</span>
//                 <p>{answer.current.wind_kph} km/h</p>
//               </div>
//               <div className="detail-item">
//                 <span>Humidity</span>
//                 <p>{answer.current.humidity}%</p>
//               </div>
//               <div className="detail-item">
//                 <span>Pressure</span>
//                 <p>{answer.current.pressure_mb} mb</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {selectedDomain === "forecast" && answer && "forecast" in answer && (
//           <ForeCastCharts
//             city={answer.location.name}
//             temp={answer.forecast.forecastday[0].day.avgtemp_c}
//             condition={answer.forecast.forecastday[0].day.condition.text}
//             forecast={answer.forecast.forecastday}
//           />
//         )}

//         {selectedDomain === "future" && answer && "forecast" in answer && (
//           <div className="weather-card">
//             <p>
//               <strong>Date:</strong> {answer.forecast.forecastday[0].date}<br/>
//               <strong>Temp:</strong> {answer.forecast.forecastday[0].day.avgtemp_c}°C<br/>
//               <strong>Sky:</strong> {answer.forecast.forecastday[0].day.condition.text}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// export default App;



import { useWeather } from "./hooks/useWeather";
import { WeatherCard } from "./components/WeatherCard";
import { ForeCastCharts } from "./components/ForeCastCharts";

import "./App.css";

function App() {
  const {
    selectedDomain, setSelectedDomain, answer, city, setCity,
    days, setDays, currentMode, setCurrentMode, date, setDate, fetchData,setCities,input,setInput
  } = useWeather();

  const domains = ["current", "forecast", "future","multipleLocations"];

  return (
    <div className="App">
      <div className="main-title">
        <span className="emoji-sun">☀️</span> 
          Weather Application 
        <span className="emoji-cloud">☁️</span>
      </div>
      <div className="selection-container">
        <label>Explore Weather Related features! </label>
        <select value={selectedDomain} onChange={(e) => setSelectedDomain(e.target.value as any)}>
          {domains.map((d) => (
            <option key={d} value={d}>
              {d.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <hr style={{ width: '80%', margin: '20px 0', opacity: 0.2 }} />

      <div className="input-group">
        
        {selectedDomain === "current" && (
          <div className="current-options">
            <div className="radio-group">
              <label style={{ marginLeft: 15 }}>
                <input
                  type="radio"
                  value="gps"
                  checked={currentMode === "gps"}
                  onChange={(e) => {
                    setCurrentMode("gps");
                    setCity(e.target.value);
                  }}
                />
                Use GPS
              </label>
              <label>
                <input
                  type="radio"
                  value="city"
                  checked={currentMode === "city"}
                  onChange={(e) => {
                    setCurrentMode("city");
                    setCity(e.target.value);
                  }}
                />
                Choose City
              </label>
            </div>

            {currentMode === "city" && (
              <div>
                <label>Enter city name</label>
                <input required type="text" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
            )}
          </div>
        )}

        {selectedDomain === "forecast" && (
          <div className="forecast-options">
             <div>
                <label>Enter city name</label>
                <input required type="text" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>

            <div style={{ marginTop: 10 }}>
              <label>Number of Days: </label>
              <input 
                type="number" 
                value={days} 
                min={1} 
                max={6} 
                onChange={(e) => setDays(Number(e.target.value))} 
              />
            </div>
          </div>
        )}

        {selectedDomain==="multipleLocations" &&(
          <div>
            <input
              required
              type="text"
              placeholder="Enter cities separated by commas"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        )}

        {selectedDomain === "future" && (
          <div className="future-options">
             <div>
                <label>Enter city name</label>
                <input required type="text" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
            <div style={{ marginTop: 10 }}>
              <label>Pick Date: </label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>
        )}

      </div>

      <div style={{ marginTop: 25 }}>
        <button
          className="fetch-btn"
          onClick={() => {
            if (selectedDomain === "multipleLocations") {
              const cityArray = input.split(",").map((c:string) => c.trim());
              setCities(cityArray);
            }
            fetchData();
          }}>
          Get {selectedDomain.charAt(0).toUpperCase() + selectedDomain.slice(1)} Weather
        </button>
      </div>

      {answer && selectedDomain === "current" && "current" in answer && <WeatherCard data={answer} type="current" />}
      {answer && selectedDomain === "future" && "forecast" in answer && <WeatherCard data={answer} type="future" />}
      {answer && selectedDomain === "forecast" && "forecast" in answer && (
        <ForeCastCharts city={answer?.location?.name} 
                        temp={answer?.forecast?.forecastday[0]?.day?.avgtemp_c} 
                        condition={answer?.forecast?.forecastday[0]?.day?.condition?.text} 
                        forecast={answer?.forecast?.forecastday} />
      )}
      {answer && selectedDomain === "multipleLocations" && Array.isArray(answer) && (
        <div className="multiple-cities">
          {answer.map((cityWeather) => (
            <WeatherCard key={cityWeather.location.name} data={cityWeather} type="current" />
          ))}
        </div>
      )}
      </div>
  );
}

export default App;
