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
      this.getData()

      
    }

    componentWillUnmount(){
      this.currentRef.off('value')
    }

    getData(){
      this.currentRef = firebase.database().ref('current');
      this.currentRef.on('value', (data) =>{
        
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
        
      })
    }
    
  render(){
      const { temperature, humidity, lux, realFeel, airPressure, altitude, load } = this.state;
      const { main } = this.props;
      
    return(
        <Container style={{
            padding: '5vh'
        }}>
          {load ? <div>
        <Card.Group>
            <MainCard title='Temperature' data={temperature} unit='&#8451;' image={temperatureimage} main={this.props.main} />
            <MainCard title='Humidity' data={humidity} unit='%' image={humidityimage} main={this.props.main} />
            <MainCard title='Air Pressure' data={airPressure} unit='hPa' image={airpressureimage} main={this.props.main} />
            <MainCard title='Altitude' data={altitude} unit='m' image={altitudeimage} main={this.props.main} />
            <MainCard title='Luminosity' data={lux} unit='lux' image={luminosityimage} main={this.props.main} />
            <MainCard title='RealFeel' data={realFeel} unit='&#8451;' image={realfeelimage} main={this.props.main} />
        </Card.Group>
        <Chart main={this.props.main} />
        </div> : <div className='sweet-loading'>
        <DotLoader
          css={`
          display: block;
          margin: 0 auto;
          border-color: red;
      `}
          sizeUnit={"px"}
          size={150}
          color={main.state.menuBarColor}
          loading={this.state.loading}
        />
      </div> 
        }
        </Container>

   
    )
  }
}

export default RealTime;