import CurrentWeather from './components/currentWeather.js'
import WeeklyWeather from './components/weeklyWeather.js'
import HourlyWeather from './components/hourlyWeather.js'
import myImage from './assets/trex_a_1_by_cleopatrawolf_dfujqzu-350t.png'
import image from './assets/4_by_cleopatrawolf_dfuq86t.png'
import css from './App.css'

function App() {


  return (
    <div className='home-component'>
      <CurrentWeather />
      {/* <WeeklyWeather /> */}
      {/* <HourlyWeather /> */}
      <img className='t-rex' src={myImage} alt='t=rex'></img>
      <div style={{ backgroundImage: `url(${image})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", height: 1200, width: 720 }}></div>

    </div>
  );
}

export default App;
