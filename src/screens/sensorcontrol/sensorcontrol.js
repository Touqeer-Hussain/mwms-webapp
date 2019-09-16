import React, { Component } from 'react'
import { 
  Container,
  Segment,
  Radio
} from 'semantic-ui-react'



class SensorControl extends Component {
    constructor(props){
      super(props);
      this.state ={
          checked: false
      }
    }
  render(){

        const { checked } = this.state
    return(
      <Container style={{
        padding: '5vh'
    }}>


        
    <Segment color='teal'>
      <h1>DHT 22 (Temperature, Humidity, RealFeel)</h1>
      <h2>Status: <span style={{color: 'green'}} >Online</span></h2>
      <div ><Radio toggle checked={checked} onChange={(e, {checked }) => {
              this.setState({
                checked: checked ? true : false 
              })
      }}/></div>
    </Segment>
    <Segment >
      <h1>LDR (Luminosity)</h1>
      <h2>Status: <span style={{color: 'green'}} >Online</span></h2>
      <Radio toggle floated='right' />
    </Segment>
    <Segment >
      <h1>BMP 180 (Air Pressure)</h1>
      <h2>Status: <span style={{color: 'green'}} >Online</span></h2>
      <Radio toggle floated='right' />
    </Segment>
        
        
        </Container>

   
    )
  }
}

export default SensorControl;