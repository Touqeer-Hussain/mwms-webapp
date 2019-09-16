import React, { Component } from 'react'

// Screens
import MainContainer from './container/container'
import RealTime from './screens/realtime/realtime'
import SensorControl from './screens/sensorcontrol/sensorcontrol'

class App extends Component {
    constructor(props){
      super(props);
      this.state ={
        realTime: null,
        sensorControl: true
      }
    }
  render(){
    
    var { realTime, sensorControl } = this.state;
    return(
      <MainContainer main={this}>
      { realTime && <RealTime  main={this}/> }
      { sensorControl && <SensorControl  main={this}/> }
     </MainContainer>
   
    )
  }
}

export default App;