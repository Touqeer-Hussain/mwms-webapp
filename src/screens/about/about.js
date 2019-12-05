import React, { Component } from 'react'
import {
  Image,
  Container,
  Grid,
  Segment,
  Icon


} from 'semantic-ui-react'

import ReactPlayer from 'react-player'

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

                                                    <ReactPlayer 
                                                        url='https://firebasestorage.googleapis.com/v0/b/to-do-applica.appspot.com/o/FYP%20-%20Video%20.mp4?alt=media&token=1df4b763-d1bd-43ff-bb53-87b9dc1d21f5' 
                                                          controls
                                                          pip
                                                          height='100%'
                                                          width='100%'
                                                        />
                           <Segment>
                            <h1>About</h1>
         
                                    <h3>The product My Weather Monitoring System (MWMS) is a Weather Monitoring Project which is IOT based Project. This system is too precisely, quickly and ease to show all information about weather.

                                    <br/><br/> The main motive of this project is to monitor environment/humidity/air pressure. It will help us to get the real-time readings on a small scale and give information about the coming weather throughout the day. It is easy to use and learns for everyone due to the friendly user interface.

                                    <br/><br/> In spite of this effective and eye-catching GUI for user’s system include very low cost hardware to give concurrent information about weather.  
                            </h3>
                            </Segment>
                            <Segment>
                           <h1>Credit</h1>

                                            <Segment>

                                                <h3>
                                                Supervisior:

                                                </h3>
                                                <p>
                                                Ali Muhammad Amour

                                                </p>
                                                <Icon name='github' size='large' />
                                                <Icon name='facebook' size='large' color='blue' />
                                                <Icon name='mail'  size='large' color='red'/>
                                               </Segment>
                                               <Segment>
                                                 <h3>
                                                 Developer:

                                                </h3>
                                                <p>
                                                 Touqeer Hussain
                                                  
                                                </p>
                                                <Icon name='github' size='large' />
                                                <Icon name='facebook' size='large' color='blue' />
                                                <Icon name='mail'  size='large' color='red'/>
                                               </Segment>
                                               <Segment>
                                                 <h3>
                                                 Designer:

                                                </h3>
                                                <p>
                                                   Muhammad Sajid Rajput
                                                  
                                                </p>
                                                <Icon name='github' size='large' />
                                                <Icon name='facebook' size='large' color='blue' />
                                                <Icon name='mail'  size='large' color='red'/>
                                               </Segment>
                                               <Segment>
                                                 <h3>
                                                 Writer:

                                                </h3>
                                                <p>
                                                  Syed Ejaz Hussain Shah
                                                  
                                                </p>
                                                <Icon name='github' size='large' />
                                                <Icon name='facebook' size='large' color='blue' />
                                                <Icon name='mail'  size='large' color='red'/>
                                               </Segment>
                            </Segment>

                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>



        </Container>
   
    )
  }
}
