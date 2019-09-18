import React, { Component } from 'react'
import {
    Card,
    Image,
    Button,
    Container
} from 'semantic-ui-react'

import MainCard from 'components/maincard'
import firebase from 'config/firebase'

import temperatureimage from 'assest/images/temperature.png'
import humidityimage from 'assest/images/humidity.png'
import airpressureimage from 'assest/images/airpressure.png'
import realfeelimage from 'assest/images/realfeel.png'
import luminosityimage from 'assest/images/luminosity.png'
import altitudeimage from 'assest/images/altitude.png'



class RealTime extends Component {
    constructor(props){
      super(props);
      this.state ={
          temperature: '',
          humidity: '',
          lux: '',
          realFeel: '',
          airPressure: '',
          altitude: ''
      }
      
      

    }

    componentDidMount(){
      firebase.database().ref('current').on('value', (data) =>{
        
        this.setState({
          temperature: Math.round(data.val().temperature),
          humidity: Math.round(data.val().humidity),
          lux: data.val().lux,
          realFeel: Math.round(data.val().realFeel),
          airPressure: data.val().airPressure,
          altitude: Math.round(data.val().altitude)
        })
        console.log(data.val())
      })

      
    }
    
  render(){
      const { temperature, humidity, lux, realFeel, airPressure, altitude } = this.state
    return(
        <Container style={{
            padding: '5vh'
        }}>
        <Card.Group>
            <MainCard title='Temperature' data={temperature} unit='&#8451;' image={temperatureimage}/>
            <MainCard title='Humidity' data={humidity} unit='%' image={humidityimage}/>
            <MainCard title='Air Pressure' data={airPressure} unit='hPa' image={airpressureimage}/>
            <MainCard title='Altitude' data={altitude} unit='m' image={altitudeimage}/>
            <MainCard title='Luminosity' data={lux} unit='lux' image={luminosityimage}/>
            <MainCard title='RealFeel' data={realFeel} unit='&#8451;' image={realfeelimage}/>
        </Card.Group>
        </Container>

   
    )
  }
}

export default RealTime;