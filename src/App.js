import CurrentWeather from './components/currentWeather.js'
import WeeklyWeather from './components/weeklyWeather.js'
import HourlyWeather from './components/hourlyWeather.js'
import css from './App.css'
import blueTrexRoar from './assets/trexImages/trex_a_1_by_cleopatrawolf_dfujqzu-350t.png'
import mainBackgroundImage from './assets/backgroundImages/4_edit_by_cleopatrawolf_dfut2ry.png'

function App() {


  return (
    <div className='home-component'>
      <CurrentWeather />
      {/* <WeeklyWeather /> */}
      {/* <HourlyWeather /> */}
      <img className='blue-trex-roar' src={blueTrexRoar} alt="Blue T-Rex Roaring"></img>
      
      <div style={{ backgroundImage: `url(${mainBackgroundImage})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", height: 1200, width: 720 }}></div>

    </div>
  );
}

export default App;
