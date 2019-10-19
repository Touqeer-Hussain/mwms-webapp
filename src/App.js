import React, { Component } from 'react'

// Screens
import MainContainer from './container/container'
import RealTime from './screens/realtime/realtime'
import SensorControl from './screens/sensorcontrol/sensorcontrol'
import Cities from 'screens/cities/cities'
import CityDetail from 'screens/citydetail/citydetail'
import Historical from 'screens/hisrotical/historical'
import About from 'screens/about/about'

class App extends Component {
    constructor(props){
      super(props);
      this.state ={
        realTime: null,
        sensorControl: null,
        cities: null,
        citydetail: null,
        historical: null,
        about: true
  
      }
    }
  render(){
    
    var { realTime, sensorControl, cities, citydetail, historical, about } = this.state;
    return(
      <MainContainer main={this}>
      { realTime && <RealTime  main={this}/> }
      { sensorControl && <SensorControl  main={this}/> }
      { cities && <Cities main={this} />}
      { citydetail && <CityDetail main={this} />}
      { historical && <Historical main={this} />}
      { about && <About main={this} />}
     </MainContainer>
   
    )
  }
}

export default App;