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
    Icon

} from 'semantic-ui-react'

import firebase from 'config/firebase'

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
        </Container>
   
    )
  }
}

export default About;