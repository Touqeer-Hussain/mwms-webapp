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
        
        <Grid columns={1} divided  stackable>
          <Grid.Row stretched>
            <Grid.Column>

        <Grid columns={1} divided  stackable>
          <Grid.Row stretched>
            <Grid.Column>
              <Segment>
            <div style={{
          height: '100%'
        }}>
          
            <div
              style={{
              width: '100%',
              height: '100%',
              float: 'left',
            
            }}>
              <h1 style={{
                fontSize: '2.5em',
                paddingLeft: '2px',
                border: '1px solid red'
              }}>Temperature
 
 </h1>
         </div>
             <div style={{
              width: '25%',
              float: 'left',
              height: '100%',
              paddingTop: '2px',
              border: '1px solid red'
            }}> 
             <Image floated='right' size='medium' src={Exximg}/>
              </div>
            


          <div style={{
            height: '100%',
            width: '100%',
            paddingLeft: '13%'
          }}>

            <p style={{
          fontSize: '5.5em',
          fontFamily: 'typeface-roboto',
          
        }} >
          10<span style={{
          fontSize: '0.7em',
          fontFamily: 'typeface-roboto',
          
        }}>&#8451;</span>
        </p>
              </div>

              
      </div>

            </Segment>
              
            </Grid.Column>
          </Grid.Row>
        </Grid>


        <Grid columns={3} divided  stackable>
          <Grid.Row stretched>
            <Grid.Column>
          
          
            <Segment>
             <div
              style={{
                      float: 'left',
              
            }}>
              <h1 style={{
                fontSize: '1.5em',
                paddingLeft: '2px',
              }}> Temperature:
              
              <span style={{
            fontSize: '1.2em',
            paddingLeft: '5px',
          }}> 10 </span> 
              <span style={{
            fontSize: '0.9em',
            
          }}> &#8451; </span> 
               </h1>
               
                
            </div>
</Segment>
 
 
<Segment>
             <div
              style={{
              height: '100%',
              float: 'left',
              width: '100%'
            }}>
              <h1 style={{
                fontSize: '1.5em',
                paddingLeft: '2px',
              }}> Temperature:
              
              <span style={{
            fontSize: '1.2em',
            paddingLeft: '5px',
          }}> 10 </span> 
              <span style={{
            fontSize: '0.9em',
            
          }}> &#8451; </span> 
               </h1>
               
                
            </div>
</Segment>
             <Segment>
             <div
              style={{
              height: '100%',
              float: 'left',
              width: '100%'
            }}>
              <h1 style={{
                fontSize: '1.5em',
                paddingLeft: '2px',
              }}> Temperature:
              
              <span style={{
            fontSize: '1.2em',
            paddingLeft: '5px',
          }}> 10 </span> 
              <span style={{
            fontSize: '0.9em',
            
          }}> &#8451; </span> 
               </h1>
               
                
            </div>
 
              </Segment>
              </Grid.Column>
         

          
         <Grid.Column>
          
<Segment>
             <div
              style={{
              height: '100%',
              float: 'left',
              width: '100%'
            }}>
              <h1 style={{
                fontSize: '1.5em',
                paddingLeft: '2px',
              }}> Temperature:
              
              <span style={{
            fontSize: '1.2em',
            paddingLeft: '5px',
          }}> 10 </span> 
              <span style={{
            fontSize: '0.9em',
            
          }}> &#8451; </span> 
               </h1>
               
                
            </div>
</Segment>
 
 
<Segment>
             <div
              style={{
              height: '100%',
              float: 'left',
              width: '100%'
            }}>
              <h1 style={{
                fontSize: '1.5em',
                paddingLeft: '2px',
              }}> Temperature:
              
              <span style={{
            fontSize: '1.2em',
            paddingLeft: '5px',
          }}> 10 </span> 
              <span style={{
            fontSize: '0.9em',
            
          }}> &#8451; </span> 
               </h1>
               
                
            </div>
</Segment>
          
             <Segment>
             <div
              style={{
              height: '100%',
              float: 'left',
              width: '100%'
            }}>
              <h1 style={{
                fontSize: '1.5em',
                paddingLeft: '2px',
              }}> Temperature:
              
              <span style={{
            fontSize: '1.2em',
            paddingLeft: '5px',
          }}> 10 </span> 
              <span style={{
            fontSize: '0.9em',
            
          }}> &#8451; </span> 
               </h1>
               
                
            </div>
 
              </Segment>
              </Grid.Column> 
            
            
             <Grid.Column>
             
             <Segment>
             <div
              style={{
              height: '100%',
              float: 'left',
              width: '100%'
            }}>
              <h1 style={{
                fontSize: '1.5em',
                paddingLeft: '2px',
              }}> Temperature:
              
              <span style={{
            fontSize: '1.2em',
            paddingLeft: '5px',
          }}> 10 </span> 
              <span style={{
            fontSize: '0.9em',
            
          }}> &#8451; </span> 
               </h1>
               
                
            </div>
 
              </Segment>


              <Segment>
             <div
              style={{
              height: '100%',
              float: 'left',
              width: '100%'
            }}>
              <h1 style={{
                fontSize: '1.5em',
                paddingLeft: '2px',
              }}> Temperature:
              
              <span style={{
            fontSize: '1.2em',
            paddingLeft: '5px',
          }}> 10 </span> 
              <span style={{
            fontSize: '0.9em',
            
          }}> &#8451; </span> 
               </h1>
               
                
            </div>
</Segment>
 
 
<Segment>
             <div
              style={{
              height: '100%',
              float: 'left',
              width: '100%'
            }}>
              <h1 style={{
                fontSize: '1.5em',
                paddingLeft: '2px',
              }}> Temperature:
              
              <span style={{
            fontSize: '1.2em',
            paddingLeft: '5px',
          }}> 10 </span> 
              <span style={{
            fontSize: '0.9em',
            
          }}> &#8451; </span> 
               </h1>
               
                
            </div>
</Segment> 
</Grid.Column>
</Grid.Row>
        </Grid>

        <Grid columns={1} divided>
          <Grid.Row stretched>
            <Grid.Column>
            <div style={{
          height: '100%'
        }}>

          <h1 style={{
            fontSize: '1.5em'

          }}> Hourly Update </h1>

      </div>

              
      </Grid.Column> 
            </Grid.Row>
            </Grid>
             
            </Grid.Column> 
            </Grid.Row>
            </Grid>
             

      </Container>

    )
  }
}

export default CityDetail;