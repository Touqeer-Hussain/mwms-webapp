import React, { Component } from 'react'
import {
    Card,
    Image,
    Button,
    Container,
    Segment,
    Loader,
    Dimmer
} from 'semantic-ui-react'

import MainCard from 'components/maincard'
import firebase from 'config/firebase'
import Chart from 'components/chart'

import temperatureimage from 'assest/images/temperature.png'
import humidityimage from 'assest/images/humidity.png'
import airpressureimage from 'assest/images/airpressure.png'
import realfeelimage from 'assest/images/realfeel.png'
import luminosityimage from 'assest/images/luminosity.png'
import altitudeimage from 'assest/images/altitude.png'

import DotLoader from 'react-spinners/DotLoader';



class RealTime extends Component {
    constructor(props){
      super(props);
      this.state ={
          temperature: '',
          humidity: '',
          lux: '',
          realFeel: '',
          airPressure: '',
          altitude: '',
          load: false
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
        }, () => {
          this.setState({
            load: true
          })
        })
        console.log(data.val())
      })

      
    }
    
  render(){
      const { temperature, humidity, lux, realFeel, airPressure, altitude, load } = this.state
    return(
        <Container style={{
            padding: '5vh'
        }}>
          {load ? <div>
        <Card.Group>
            <MainCard title='Temperature' data={temperature} unit='&#8451;' image={temperatureimage}/>
            <MainCard title='Humidity' data={humidity} unit='%' image={humidityimage}/>
            <MainCard title='Air Pressure' data={airPressure} unit='hPa' image={airpressureimage}/>
            <MainCard title='Altitude' data={altitude} unit='m' image={altitudeimage}/>
            <MainCard title='Luminosity' data={lux} unit='lux' image={luminosityimage}/>
            <MainCard title='RealFeel' data={realFeel} unit='&#8451;' image={realfeelimage}/>
        </Card.Group>
        <Chart />
        </div> : <div className='sweet-loading'>
        <DotLoader
          css={`
          display: block;
          margin: 0 auto;
          border-color: red;
      `}
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
          loading={this.state.loading}
        />
      </div> 
        }
        </Container>

   
    )
  }
}

export default RealTime;