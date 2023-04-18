import DailyWeather from './components/dailyWeather.js'
import WeeklyWeather from './components/weeklyWeather.js'
import HourlyWeather from './components/dailyWeather.js'
import myImage from './assets/trex_a_1_by_cleopatrawolf_dfujqzu-350t.png'
import image from './assets/4_by_cleopatrawolf_dfuq86t.png'
import css from './App.css'

function App() {


  return (
    <div className='home-component'>
      <h1 className='app-title'>Is It Raining... ?</h1>
      {/* <DailyWeather /> */}
      {/* <WeeklyWeather /> */}
      {/* <HourlyWeather /> */}
      {/* <WeeklyWeather /> */}
      <img className='t-rex' src={myImage} alt='t=rex'></img>
      <div style={{ backgroundImage: `url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"contain",height:1200,width:720}}></div>

    </div>
  );
}

export default App;
