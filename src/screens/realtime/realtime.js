import React, { Component } from 'react'
import {
    Card,
    Image,
    Button,
    Container
} from 'semantic-ui-react'
import Fist from 'assest/images/fist.jpg'
import MainCard from 'components/maincard'
import firebase from 'config/firebase'



class RealTime extends Component {
    constructor(props){
      super(props);
      this.state ={
          temperature: '',
          humidity: '',
          lux: '',
          realFeel: '',
          airPressure: ''
      }
      
      

    }

    componentDidMount(){
      firebase.database().ref('current').on('value', (data) =>{
        
        this.setState({
          temperature: Math.round(data.val().temperature),
          humidity: Math.round(data.val().humidity),
          lux: data.val().lux,
          realFeel: Math.round(data.val().realFeel),
          airPressure: data.val().airPressure
        })
        console.log(data.val())
      })

      
    }
    
  render(){
      const { temperature, humidity, lux, realFeel, airPressure } = this.state
    return(
        <Container style={{
            padding: '5vh'
        }}>
        <Card.Group>
            <MainCard title='Temperture' data={temperature} unit='&#8451;' image={Fist}/>
            <MainCard title='Humidity' data={humidity} unit='%' image={Fist}/>
            <MainCard title='Air Pressure' data={airPressure} unit='hPa' image={Fist}/>
            <MainCard title='Luminosity' data={lux} unit='lux' image={Fist}/>
            <MainCard title='Real Feel' data={realFeel} unit='&#8451;' image={Fist}/>
        </Card.Group>
        </Container>

   
    )
  }
}

export default RealTime;