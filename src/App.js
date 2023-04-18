import DailyWeather from './components/dailyWeather.js'
import WeeklyWeather from './components/weeklyWeather.js'
import HourlyWeather from './components/dailyWeather.js'
import myImage from './assets/trex_a_1_by_cleopatrawolf_dfujqzu-350t.png'

function App() {


  return (
    <div className='home-component'>
      <h1>Is It Raining... ?</h1>
      {/* <DailyWeather /> */}
      {/* <HourlyWeather /> */}
      <WeeklyWeather />
      <img src={myImage} alt='t=rex'></img>

    </div>
  );
}

export default App;
