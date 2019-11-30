import React, { Component } from 'react'
import {
  Image,
  Container,
  Grid,
  Segment,


} from 'semantic-ui-react'

import logoname from 'assest/images/mwms.jpg'
import logo from 'assest/images/logo.png'


export default class About extends Component {
    constructor(props){
      super(props);
      this.state ={
         
      }
      
      

    }




  render(){
      
    console.log('About')

    return( 
        <Container style={{
            padding: '5vh'
        }}>
            <Grid columns={1} divided stackable>
                                            <Grid.Row stretched>
                                                <Grid.Column stackable>
                                                

                                                    <Image size='medium'   src={logo} centered/>

                                                    <Image size='big'   src={logoname} centered/>


                           <Segment>
                            <h1>About</h1>
         
<h3>The product My Weather Monitoring System (MWMS) is a Weather Monitoring Project which is IOT based Project. This system is too precisely, quickly and ease to show all information about weather.

<br/><br/> The main motive of this project is to monitor environment/humidity/air pressure. It will help us to get the real-time readings on a small scale and give information about the coming weather throughout the day. It is easy to use and learns for everyone due to the friendly user interface.

<br/><br/> In spite of this effective and eye-catching GUI for user’s system include very low cost hardware to give concurrent information about weather.  
</h3>
</Segment>

<Segment>
                                               </Segment>

                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>



        </Container>
   
    )
  }
}
