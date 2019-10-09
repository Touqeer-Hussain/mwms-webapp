import React, { Component } from 'react'

// Screens
import MainContainer from './container/container'
import RealTime from './screens/realtime/realtime'
import SensorControl from './screens/sensorcontrol/sensorcontrol'
import Cities from 'screens/cities/cities'
import CityDetail from 'screens/citydetail/citydetail'

class App extends Component {
    constructor(props){
      super(props);
      this.state ={
        realTime: true,
        sensorControl: null,
        cities: null,
        citydetail: null
      }
    }
  render(){
    
    var { realTime, sensorControl, cities, citydetail } = this.state;
    return(
      <MainContainer main={this}>
      { realTime && <RealTime  main={this}/> }
      { sensorControl && <SensorControl  main={this}/> }
      { cities && <Cities main={this} />}
      { citydetail && <CityDetail main={this} />}
     </MainContainer>
   
    )
  }
}

export default App;