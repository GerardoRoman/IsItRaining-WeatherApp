import CurrentWeather from './components/currentWeather.js'
import WeeklyWeather from './components/weeklyWeather.js'
import HourlyWeather from './components/hourlyWeather.js'
import myImage from './assets/trex_a_1_by_cleopatrawolf_dfujqzu-350t.png'

function App() {


  return (
    <div className='home-component'>
      <h1>Is It Raining... ?</h1>
      <CurrentWeather />
      {/* <HourlyWeather /> */}
      {/* <WeeklyWeather /> */}
      <img src={myImage} alt='t=rex'></img>

    </div>
  );
}

export default App;
