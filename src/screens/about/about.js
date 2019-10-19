import React, { Component } from 'react'
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
  Segment,
  Radio,
  Icon

} from 'semantic-ui-react'

import firebase from 'config/firebase'
import logoname from 'assest/images/mwms.jpg'

class About extends Component {
    constructor(props){
      super(props);
      this.state ={
         
      }
      
      

    }

    componentDidMount(){
      
    }
    


  render(){
      
    console.log('About')

    return( 
        <Container style={{
            padding: '5vh'
        }}>
            <h1>About</h1>

            <Grid columns={1} divided stackable>
                                            <Grid.Row stretched>

                                            <Grid.Column stackable>
                             <segment>              
                                            <Image size='big'   src={logoname} centered/>
</segment>
                                              </Grid.Column>
                                              </Grid.Row>
                                              </Grid>



        </Container>
   
    )
  }
}

export default About;