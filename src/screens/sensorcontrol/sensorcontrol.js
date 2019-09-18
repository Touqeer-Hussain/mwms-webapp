import React, { Component } from 'react'
import { 
  Container,
  Segment,
  Radio
} from 'semantic-ui-react'
import firebase from 'config/firebase'



class SensorControl extends Component {
    constructor(props){
      super(props);
      this.state ={
          dht22: '',
          bmp180: '',
          ldr: ''

      }
    }

    componentDidMount(){
          firebase.database().ref('sensor').on('value', (data) => {
              this.setState({
                dht22: data.val().dht22,
                bmp180: data.val().bmp180,
                ldr: data.val().ldr
              })
          })
    }
  render(){

        const { dht22, bmp180, ldr } = this.state
    return(
      <Container style={{
        padding: '5vh'
    }}>


        
<Segment color= {this.state.dht22 ? 'green' : 'red'}>
      <h1>DHT 22 (Temperature, Humidity, RealFeel)</h1>
      <h2>Status: <span style={{color: this.state.dht22 ? 'green' : 'red'}} >{this.state.dht22 ? 'Online' : 'Offline'}</span></h2>
      <div ><Radio toggle checked={dht22} onChange={(e, { checked }) => {
              this.setState({
                dht22: !checked ? false : true
              }, () => {
                firebase.database().ref('/sensor/dht22').set(this.state.dht22)
              })
      }}/></div>
    </Segment>
    <Segment color= {this.state.bmp180 ? 'green' : 'red'}>
      <h1>BMP 180 (Air Pressure, Altitude)</h1>
      <h2>Status: <span style={{color: this.state.bmp180 ? 'green' : 'red'}} >{this.state.bmp180 ? 'Online' : 'Offline'}</span></h2>
      <Radio toggle floated='right' checked={bmp180} onChange={(e, { checked }) => {
            
              this.setState({
                bmp180: !checked ? false : true 
              }, () => {
                firebase.database().ref('/sensor/bmp180').set(this.state.bmp180)
              })
      }} />
    </Segment>
    <Segment color= {this.state.ldr ? 'green' : 'red'}>
      <h1>LDR (Luminosity)</h1>
      <h2>Status: <span style={{color: this.state.ldr ? 'green' : 'red'}} >{this.state.ldr ? 'Online' : 'Offline'}</span></h2>
      <Radio toggle floated='right' checked={ldr} onChange={(e, { checked }) => {
              this.setState({
                ldr: !checked ? false : true 
              }, () => {
                firebase.database().ref('/sensor/ldr').set(this.state.ldr)
              })
      }} />
    </Segment>
        
        
        </Container>

   
    )
  }
}

export default SensorControl;