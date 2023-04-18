import DailyWeather from './components/dailyWeather.js'
import WeeklyWeather from './components/weeklyWeather.js'
import HourlyWeather from './components/dailyWeather.js'
import myImage from './assets/trex_a_1_by_cleopatrawolf_dfujqzu-350t.png'

function App() {


  return (
    <div className='home-component'>
      <h1 className='app-title'>Is It Raining... ?</h1>
      {/* <DailyWeather /> */}
      {/* <WeeklyWeather /> */}
      <img className='t-rex' src={myImage} alt='t=rex'></img>
      {/* <HourlyWeather /> */}
      <WeeklyWeather />

    </div>
  );
}

export default App;
