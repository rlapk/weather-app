
const CityData = ({name,icon,temp,units,description,feels_like,humidity,speed}) => {
    return (
        <div className="results">

            <div className="top">
                <div className="location">
                    <p>{name}</p>
                </div>
                <div className="temp">
                    <img className = "icon" src = {"https://openweathermap.org/img/wn/" + icon + "@2x.png"} alt = ""/>
                    <h1>{temp.toFixed()}°{units == 'metric' ? "c": "f"}</h1>
                    
                </div>
                <div className="description">
                    <p>{description}</p>
                </div>
            </div>

            <div className="bottom">
                <div className="feels">
                    <label>Feels like</label>
                    <p className="bold">{feels_like.toFixed()}°{units == 'metric' ? " C": " F"}</p>
                </div>
                <div className="humidity">
                    <label>Humidity</label>
                    <p className="bold">{humidity.toFixed()}%</p>
                </div>
                <div className="wind">
                    <label>Wind</label>
                    <p className="bold">{speed.toFixed()}{units == 'metric' ? " m/s": " mph"}</p>
                </div>
            </div>

        </div>
    );
};

export default CityData; 