import React, { Component } from 'react'

// Screens
import MainContainer from './container/container'
import RealTime from './screens/realtime/realtime'
import SensorControl from './screens/sensorcontrol/sensorcontrol'
import Cities from 'screens/cities/cities'

class App extends Component {
    constructor(props){
      super(props);
      this.state ={
        realTime: null,
        sensorControl: null,
        cities: true
      }
    }
  render(){
    
    var { realTime, sensorControl, cities } = this.state;
    return(
      <MainContainer main={this}>
      { realTime && <RealTime  main={this}/> }
      { sensorControl && <SensorControl  main={this}/> }
      { cities && <Cities main='this' />}
     </MainContainer>
   
    )
  }
}

export default App;