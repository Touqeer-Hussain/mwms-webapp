import React, { Component } from 'react'

// Screens
import MainContainer from './container/container'
import RealTime from './screens/realtime/realtime'
import SensorControl from './screens/sensorcontrol/sensorcontrol'
import Cities from 'screens/cities/cities'
import CityDetail from 'screens/citydetail/citydetail'
import Historical from 'screens/hisrotical/historical'
import Theme from 'screens/theme/theme'
import About from 'screens/about/about'

class App extends Component {
    constructor(props){
      super(props);
      this.state ={
        realTime: null,
        sensorControl: null,
        cities: null,
        citydetail: true,
        historical: null,
        theme: null,
        about: null,
        menuBarColor: 'teal',
        outlineColor: 'blue'

  
      }
    }
  render(){
    
    var { realTime, sensorControl, cities, citydetail, historical, theme, about } = this.state;
    return(
      <MainContainer main={this}>
      { realTime && <RealTime  main={this}/> }
      { sensorControl && <SensorControl  main={this}/> }
      { cities && <Cities main={this} />}
      { citydetail && <CityDetail main={this} />}
      { historical && <Historical main={this} />}
      {theme && <Theme main={this} />}
      { about && <About main={this} />}
     </MainContainer>
   
    )
  }
}

export default App;