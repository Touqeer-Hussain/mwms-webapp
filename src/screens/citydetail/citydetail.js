import React, {Component} from 'react'
import {
  Card,
  Image,
  Button,
  Container,
  Modal,
  Header,
  Input,
  Form,
  Grid,
  Segment

} from 'semantic-ui-react'

import firebase from 'config/firebase'
import plusimage from 'assest/images/plus.png'
import Exximg from 'assest/images/fist.jpg'

class CityDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {}

  }

  componentDidMount() {
    //   firebase.database().ref('current').on('value', (data) =>{
    // this.setState({       temperature: Math.round(data.val().temperature),
    // humidity: Math.round(data.val().humidity),       lux: data.val().lux,
    // realFeel: Math.round(data.val().realFeel),       airPressure:
    // data.val().airPressure,       altitude: Math.round(data.val().altitude)
    // })     console.log(data.val())   })

  }

  render() {

    return (
      <Container style={{
        padding: '5vh'
      }}>

        <Grid columns={2} divided>
          <Grid.Row stretched>
            <Grid.Column>
              <Segment >
                  <div style={{
                      height: '100%',
                      width: '100%',

                  }}>
                  <h1>Temperature  </h1>
                  <Image src={Exximg}/>
                 </div>
                 <div>
                     <h2> 32 &#8451; </h2> </div>
                </Segment>
              <Segment>Humidity</Segment>
              <Segment>air pressure</Segment>
              <Segment>luminicity</Segment>
              <Segment>wind direction</Segment>
              <Segment>oxcygen</Segment>
              <Segment>xxxx</Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment >1</Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>

    )
  }
}

export default CityDetail;