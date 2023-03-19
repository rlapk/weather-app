import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, ButtonGroup } from '@mui/material';

function App() {
  const [data,setData] = useState({})
  const [location,setLocation] = useState('')
  const [units, setUnits] = useState('metric')
  const [scaleSize, setScaleSize] = useState('0')
  const [error, setError] = useState('0')
  const [lastCity, setLastCity] = useState('')
  
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=' + units + '&appid=2f8e8ca2b7830e216b7a8a43b871ea2f'

  const searchLocation = (event) => {
    if ((event.key === 'Enter' || event.type === 'click') && location != '') {
      axios.get(url).then((response) => {
        setData(response.data)
        setLastCity(location)
        setError('0')
        console.log(lastCity)
      })
      .catch (() => {setError('2')})
    } else if ((event.key === 'Enter' || event.type === 'click') && location == '') {
      setError('1')
    }
    console.log(error)
  }

  // initial zoom-in 
  useEffect (() => {
    if (data != undefined) {
      setScaleSize('1')
    } 
  },[data])
  
  // re-call API when switching units
  useEffect (() => {
      axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + lastCity + '&units=' + units + '&appid=2f8e8ca2b7830e216b7a8a43b871ea2f').then((response) => {
        setData(response.data)
      })
  }, [units])

  let name = data.name;
  let temp = '';
  let icon = '';
  let description = '';
  let feels_like = '';
  let humidity = '';
  let speed = '';
  
  if (data.main != undefined) {
    icon = data.weather[0].icon;
    description = data.weather[0].description;
    temp = data.main.temp;
    feels_like = data.main.feels_like;
    humidity = data.main.humidity;
    speed = data.wind.speed;
  }
 
  return (
    
    <div className="app">
      <div className = "condition">
      {data.name != undefined ?
        // Display if there is some API data
          <div className="container"> 
        
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

            <ButtonGroup className="button-group" variant="string" aria-label="outlined button group">

              <Button 
                onClick={() => {
                  setUnits('metric');
                }}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M4.5 10a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM22 10h-2a4 4 0 1 0-8 0v5a4 4 0 1 0 8 0h2a6 6 0 1 1-12 0v-5a6 6 0 1 1 12 0z"></path></g></svg>
              </Button>

              <Button 
                onClick={() => {
                  setUnits('imperial');
                }}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 12h7v2h-7v7h-2V8a4 4 0 0 1 4-4h7v2h-7a2 2 0 0 0-2 2v4zm-7.5-2a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></g></svg>
                </Button>
                
            </ButtonGroup>
          </div>

      : // Display if there is no API data, first load
          <div className="container" id="firstPage" style={{scale:(scaleSize)}}>
            <div className="cloud"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="4em" width="4em" xmlns="http://www.w3.org/2000/svg"><path d="M17 19h-11c-2.206 0-4-1.794-4-4 0-1.861 1.277-3.429 3.001-3.874l-.001-.126c0-3.309 2.691-6 6-6 2.587 0 4.824 1.638 5.65 4.015 2.942-.246 5.35 2.113 5.35 4.985 0 2.757-2.243 5-5 5zm-11.095-6.006c-1.008.006-1.905.903-1.905 2.006s.897 2 2 2h11c1.654 0 3-1.346 3-3s-1.346-3-3-3c-.243 0-.5.041-.81.13l-1.075.307-.186-1.103c-.325-1.932-1.977-3.334-3.929-3.334-2.206 0-4 1.794-4 4 0 .272.027.545.082.811l.244 1.199-1.421-.016z"></path></svg></div>
            <div className="sun"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="4em" width="4em" xmlns="http://www.w3.org/2000/svg"><g><path d="M13 4l-1 2.934-1-2.934c-.188-.553.106-1.152.659-1.341.552-.188 1.153.107 1.341.659.078.23.072.469 0 .682zM4 11l2.934 1-2.934 1c-.553.188-1.152-.106-1.341-.659-.188-.552.107-1.153.659-1.341.23-.078.469-.072.682 0zM11 20l1-2.934 1 2.934c.188.553-.106 1.152-.659 1.341-.552.188-1.152-.106-1.341-.659-.078-.23-.072-.469 0-.682zM20 12.998l-2.934-1 2.934-1c.553-.188 1.152.106 1.341.659.188.552-.106 1.152-.659 1.341-.23.078-.469.072-.682 0zM7.05 5.636l1.367 2.781-2.781-1.367c-.524-.257-.74-.891-.483-1.414.258-.523.891-.739 1.414-.482.218.107.383.28.483.482zM5.636 16.949l2.781-1.367-1.367 2.781c-.257.523-.891.739-1.414.482-.523-.258-.739-.891-.482-1.414.107-.218.28-.382.482-.482zM16.949 18.363l-1.367-2.781 2.781 1.367c.523.257.739.891.482 1.414-.258.523-.891.739-1.414.482-.218-.107-.382-.28-.482-.482zM18.362 7.048l-2.782 1.368 1.368-2.782c.257-.523.891-.739 1.414-.482.523.258.739.891.481 1.415-.106.217-.279.381-.481.481zM12 16.5c-2.481 0-4.5-2.019-4.5-4.5s2.019-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5zm0-7c-1.379 0-2.5 1.121-2.5 2.5s1.121 2.5 2.5 2.5 2.5-1.121 2.5-2.5-1.121-2.5-2.5-2.5z"></path></g></svg></div>
            <div className="rain"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="4em" width="4em" xmlns="http://www.w3.org/2000/svg"><g><path d="M17 18c-.552 0-1-.447-1-1s.448-1 1-1c1.654 0 3-1.346 3-3s-1.346-3-3-3c-.243 0-.5.041-.81.13l-1.075.307-.185-1.103c-.326-1.932-1.978-3.334-3.93-3.334-2.206 0-4 1.794-4 4 0 .272.027.545.082.811l.244 1.199-1.42-.016c-1.009.006-1.906.903-1.906 2.006s.897 2 2 2c.552 0 1 .447 1 1s-.448 1-1 1c-2.206 0-4-1.794-4-4 0-1.861 1.277-3.429 3.001-3.874l-.001-.126c0-3.309 2.691-6 6-6 2.587 0 4.824 1.638 5.65 4.015 2.939-.244 5.35 2.113 5.35 4.985 0 2.757-2.243 5-5 5zM10.5 18l1-3 1 3c.184.553-.114 1.149-.667 1.333-.552.185-1.149-.114-1.333-.666-.075-.226-.07-.458 0-.667zM13.5 20l1-3 1 3c.184.553-.114 1.149-.667 1.333-.552.185-1.149-.114-1.333-.666-.075-.226-.07-.458 0-.667zM7.5 20l1-3 1 3c.184.553-.114 1.149-.667 1.333-.552.185-1.149-.114-1.333-.666-.075-.226-.07-.458 0-.667z"></path></g></svg></div>
            <div className="snow"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="4em" width="4em" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 15.134l-2.457-.503 1.483-.396c.533-.143.85-.69.707-1.225-.142-.533-.689-.85-1.225-.707l-1.508.403c.037-.231.071-.464.071-.706s-.034-.476-.071-.707l1.51.404.26.034c.441 0 .846-.295.965-.741.143-.533-.174-1.082-.707-1.225l-1.483-.397 2.455-.502c.216-.044.42-.156.577-.333.386-.436.347-1.102-.089-1.488-.436-.386-1.102-.347-1.488.089l-1.663 1.874.398-1.479c.144-.533-.173-1.082-.706-1.226-.531-.142-1.082.173-1.226.706l-.407 1.517c-.366-.299-.771-.544-1.219-.717l1.102-1.102c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-1.086 1.086.793-2.379c.069-.209.075-.441 0-.667-.184-.552-.781-.851-1.333-.666-.552.184-.85.78-.667 1.333l.793 2.379-1.086-1.086c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l1.102 1.102c-.447.173-.853.419-1.219.717l-.405-1.515c-.143-.534-.697-.852-1.224-.708-.534.143-.851.69-.708 1.224l.396 1.485-1.662-1.877c-.146-.164-.345-.285-.578-.333-.57-.117-1.127.25-1.244.82s.251 1.128.822 1.245l2.454.503-1.48.396c-.533.143-.85.691-.707 1.225.119.447.523.741.965.741l.26-.034 1.508-.404c-.039.231-.073.465-.073.706 0 .242.034.475.071.707l-1.508-.404c-.532-.142-1.081.173-1.225.707-.144.533.174 1.082.707 1.225l1.483.397-2.455.502c-.216.044-.42.156-.577.334-.387.436-.347 1.102.089 1.487.436.387 1.103.347 1.488-.089l1.665-1.878-.398 1.484c-.144.533.173 1.082.707 1.225l.26.034c.441 0 .845-.294.965-.741l.406-1.515c.366.298.771.544 1.22.716l-1.104 1.102c-.391.39-.391 1.023 0 1.414s1.023.391 1.414 0l.706-.707h.252l-.666 1.999c-.069.209-.075.441 0 .667.184.552.781.851 1.333.666.553-.184.851-.78.667-1.333l-.666-1.999h.252l.707.707c.196.195.451.293.707.293s.512-.098.707-.293c.391-.39.391-1.023 0-1.414l-1.102-1.103c.448-.172.854-.418 1.22-.717l.406 1.517c.12.447.523.741.965.741l.26-.034c.533-.143.851-.691.707-1.225l-.397-1.48 1.662 1.874c.146.165.345.285.577.333.57.117 1.128-.251 1.244-.821.117-.57-.251-1.127-.821-1.244zm-7.428-.634c-1.379 0-2.5-1.121-2.5-2.5s1.121-2.5 2.5-2.5 2.5 1.121 2.5 2.5-1.121 2.5-2.5 2.5z"></path></svg></div>
          </div>}
      </div>

        {/*  search bar */}
      <div className="search" >
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyUp={searchLocation}
        placeholder="Enter location"
        type="text"
        style={{scale:(scaleSize)}}
        />
        <button
        onClick = {searchLocation}
        style={{scale:(scaleSize)}}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="2.5em" width="2.8em" xmlns="http://www.w3.org/2000/svg"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg>
        </button>
      </div>
        {/* search bar end */}

        {/* validation message */}
      {error != '0' &&   // check if theres an error
        <>{error == '1' ? // determine error type
          <div className="errorContainer"><label className = "errorMessage">Please enter a city!</label></div> : 
            <>{error == '2' && <div className="errorContainer"><label className = "errorMessage">Invalid city name!</label></div>}</> 
          }</> 
      } 
       {/* ^ if no errors then do nothing ^*/}
    </div>
  );
}

export default App;


// <div className = "errorLabel">
//           <label className = "errorMessage">INVALID DATA</label>
//         </div>  