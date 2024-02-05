import React,{useState} from 'react';
import axios from 'axios';

const WeatherInfo = () => {
    const [data , setData] = useState({});
    const [location ,setLocation] = useState('');

    // const API_KEY ='fd6abcdb3c58b2c6d6ba146d7d6849f9';

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=fd6abcdb3c58b2c6d6ba146d7d6849f9`
    
    //api.openweathermap.org/geo/1.0/direct?q={location name},{state code},{country code}&limit={limit}&appid={API key}
    //api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=fd6abcdb3c58b2c6d6ba146d7d6849f9`;
    // lat={lat}&lon={lon
   
    // useEffect(() => {
    //     if(location) {
    //         axios.get(`${API_URL}?q=${location}&appid=${fd6abcdb3c58b2c6d6ba146d7d6849f9}`)
    //         .then(response => setdata(response.data))
    //         .catch(error => console.error('Error fetching weather data:',error))
    //     }
    // }, [location]);

    const searchLocation = (event) => {
        if(event.key ==='Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data);
            })
            setLocation('')
        }
    }

  return (
<div className="app">
    <div className="search">
        <input 
        type="text"
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
         />
    </div>
    <div className="container">
        <div className="top">
            <div className="location">
                <p>{data.name}</p>
            </div>
            <div className="temp">
               {data.main ? <h1>{data.main.temp.toFixed()}F</h1>: null}
            </div>
            <div className="description">
                {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
        </div>
        {data.name !== undefined &&
        <div className="bottom">
            <div className="feels">
               {data.main ? <p>{data.main.feels_like.toFixed()}F</p> : null}
               <p>Feels Like</p>
            </div>
            <div className="humidity">
                {data.main ? <p>{data.main.humidity}%</p>:null}
                <p>Humidity</p>
            </div>
            <div className="wind">
                {data.wind ? <p>{data.wind.speed.toFixed()} MPH </p>: null}
                <p>wind speed</p>
            </div>
        </div>
}
    </div>
</div>
  )
}

export default WeatherInfo
