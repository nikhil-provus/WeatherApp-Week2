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
                  onChange={() => {
                    setCurrentMode("gps");
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
          Get Weather
        </button>
      </div>

      {answer &&selectedDomain === "current" && "current" in answer && <WeatherCard data={answer} type="current" />}
      {answer &&selectedDomain === "future" && "forecast" in answer && <WeatherCard data={answer} type="future" />}
      {answer &&selectedDomain === "forecast" && "forecast" in answer && (
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
