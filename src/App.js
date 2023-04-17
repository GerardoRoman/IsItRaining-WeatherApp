import Forecast from './components/forecast.js'
import React, { useEffect, useState } from 'react'
import myImage from './assets/trex_a_1_by_cleopatrawolf_dfujqzu-350t.png'

function App() {


  return (
    <div className='home-component'>
      <h1>Is It Raining... ?</h1>
      <Forecast />
      <img src={myImage} alt='t=rex'></img>
    </div>
  );
}

export default App;
