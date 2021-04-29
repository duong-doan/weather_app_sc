import './App.css';
import Weather from './components/Weather';
import 'weather-icons/css/weather-icons.css';
import { Component } from 'react';
import FormWeather from './components/FormWeather';

const API_key = 'ec889380a80ef2e87e94bd8f434c0c85';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      country: '',
      temp: '',
      temp_min: '',
      temp_max: '',
      description: '',
      icon: '',
    };
    this.weatherIcon = {
      Thunderstorm: 'wi-thunderstorm',
      Drizzle: 'wi-sleet',
      Rain: 'wi-rain',
      Snow: 'wi-snow',
      Atmosphere: 'wi-fog',
      Clear: 'wi-day-sunny',
      Clouds: 'wi-cloud'
    }
  }

  getWeather = async (e) => {
    e.preventDefault();
    const valueCity = e.target.elements.city.value;
    const valueCountry = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${valueCity},${valueCountry}&appid=${API_key}`)
    const response = await api_call.json();
    if (valueCity === '' || valueCountry === '') {
      alert('Enter city and country')
    } else {
      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        temp: this.ceilNum(response.main.temp),
        temp_min: this.ceilNum(response.main.temp_min),
        temp_max: this.ceilNum(response.main.temp_max),
        description: response.weather[0].main,
      })
      this.getWeatherIcon(this.weatherIcon, response.weather[0].id)
    }
  }

  getWeatherIcon = (rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm })
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle })
        break;

      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIcon.Rain })
        break;

      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcon.Snow })
        break;

      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere })
        break;

      case rangeId === 800:
        this.setState({ icon: this.weatherIcon.Clear })
        break;

      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIcon.Clouds })

      default:
        this.setState({ icon: this.weatherIcon.Clouds })
        break;
    }
  }

  ceilNum = (num) => {
    const tempNum = Math.floor(num - 273.15)
    return tempNum
  }

  render() {
    return (
      <div className="App">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div className="app__wrap">
          <FormWeather onSubmitForm={this.getWeather} />
          <Weather
            city={this.state.city}
            country={this.state.country}
            temp={this.state.temp}
            temp_min={this.state.temp_min}
            temp_max={this.state.temp_max}
            description={this.state.description}
            icon={this.state.icon}
          />
        </div>
      </div>
    );
  }
}

export default App;
