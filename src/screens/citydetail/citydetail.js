import React, {Component} from 'react'
import {
    Image,
    Button,
    Container,
    Modal,
    Grid,
    Segment,
    Icon,

} from 'semantic-ui-react'

import firebase from 'config/firebase'

import swal from 'sweetalert'

export default class CityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirm: false,
            data: '',
            load: false,
            background: '',
            timePhase: '',
            tempIcon: '',
            currentFontColor: ''
        }
    }


    open = () => {
        this.setState({ confirm: true })
        // console.log(this.state.confirm)
    }  

    close = () => { 
        this.setState({ confirm: false }, ()=>{
            
        })
        
    }

    componentDidMount() {

        this.getData();

      
    }


    getPic(icon){
        switch (icon) {
          case 'clear-day':
      
                    return require('assest/images/clear-day.png')
             
              
          case 'clear-night':
             
            return require('assest/images/clear-night.png')

           
            
          case 'snow':
              
                return require('assest/images/snow.png')
         
          case 'sleet':
             
                return require('assest/images/sleet.png')
           
          case 'wind':
            
              return require('assest/images/wind.png')
           
          case 'rain':
              
                return require('assest/images/rain.png')
         
          case 'fog':
              
              return require('assest/images/fog.png')
           
          case 'cloudy':
              
                return require('assest/images/cloudy.png')
           
          case 'partly-cloudy-day':
              
                return require('assest/images/partly-cloudy-day.png')
            
          case 'partly-cloudy-night':
              
                return require('assest/images/partly-cloudy-night.png')
            
      
        default:
          break;
      }
      }



    async getData() {
        
        this.setState({
            data: await JSON.parse(localStorage.getItem('data'))
        }, async () => {
            const { data } = this.state;
            
           
            if(data.currently.time >= data.daily.data[0].sunriseTime && data.currently.time <= data.daily.data[0].sunsetTime){
                    this.setState({
                        background: require('assest/images/day-background.png'),
                        currentFontColor: 'black',
                        tempIcon: require('assest/images/temperature.png'),
                    })
            }else{
                this.setState({
                    background: require('assest/images/night-background.png'),
                    currentFontColor: 'white',
                    tempIcon: require('assest/images/temperature-white.png'),
                })
            }
            
            
            
            this.setState({load: true})
            this.state.data.daily.data.length = 6
            this.state.data.hourly.data.length = 6
            // console.log(this.state.data)



        })

    }

    render() {
        const {data, load, background, currentFontColor, tempIcon} = this.state;
        const { main } = this.props;
        return (
            <Container style={{
                padding: '5vh'
            }}>

<Modal
          open={this.state.confirm}
          
          
          onClose={this.close}
        >
          <Modal.Header>Delete City Data!</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete city data?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              No
            </Button>
            <Button
              onClick={() => {
                  
                  firebase.database().ref(`cities/${data.cityKey}`).remove();
                  this.setState({
                      confirm: false,
                      
                  }, () => {
                    swal("City Deleted!", "","success")
                    .then((value) => {
                    
                        this.props.main.setState({
                            citydetail: null,
                            cities: true
                        })
                    })  
                    
                    
                  })
              }}
              positive
              labelPosition='right'
              icon='checkmark'
              content='Yes'
            />
          </Modal.Actions>
        </Modal>
                <Grid divided="vertically">
                    <Grid.Row columns={3}>
                  
                        <Grid.Column >
                        <Button animated     onClick={() => {
                    this
                        .props
                        .main
                        .setState({realTime: null, sensorControl: null, cities: true, citydetail: null})
                }}
                    color='twitter'>
      <Button.Content visible>Back</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow left' />
      </Button.Content>
    </Button>
                    </Grid.Column>
                    <Grid.Column>
 </Grid.Column>
              <Grid.Column style={{
                  float: 'right'
              }}>


                    
              <Button animated='fade' color="red" onClick={() => {
        this.setState({
            confirm: true
        })
    }}>
                
                  <Button.Content hidden>
                    <Icon name="delete" />
                  </Button.Content>
                  <Button.Content visible>Delete</Button.Content>
              </Button>
             

    <Button   animated='fade' onClick={() => {
                
                    this
                        .props
                        .main
                        .setState({realTime: null, sensorControl: null, cities: null, citydetail: null, historical: true})
                        
                }}

                    color='twitter' >
      <Button.Content visible>History</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>
             
                        
                        </Grid.Column>

                 
                    </Grid.Row>
                    </Grid>



                {load && <Grid columns={1} divided stackable>
                    <Grid.Row stretched>
                        <Grid.Column>

                            <Grid
                                columns={1}
                                divided
                                stackable
                                style={{
                                border: `2px solid ${main.state.outlineColor}`,
                                borderRadius: '5px',
                                marginTop: '3%'
                            }}>
                                <Grid.Row stretched>
                                    <Grid.Column>

                                        <Grid columns={1} divided stackable>
                                            <Grid.Row stretched>
                                                <Grid.Column stackable>
                                                    <Segment
                                                    style={{
                                                        backgroundSize: 'cover',
                                                        backgroundImage: `url(${background})`,
                                                        borderRadius: '10px'
                                                    }}>
                                                        <div
                                                            style={{
                                                                height: '100%',
                                                                color: currentFontColor
                                                        }}>

                                                            <div
                                                                style={{
                                                                width: '100%',
                                                                height: '30%',
                                                                float: 'left',
                                                                
                                                            }}>
                                                                <h1
                                                                    style={{
                                                                    fontSize: '2.5em',
                                                                    paddingLeft: '2px',
                                                                    }}>{data.city}
                                                                </h1>
                                                            </div>
                                                            <div
                                                                style={{
                                                                width: '60%',
                                                                float: 'left',
                                                                height: '70%',
                                                                paddingTop: '2px',
                                                            }}>
                                                                <Image style={{marginTop: '7%'}} floated='left' size='tiny' src={tempIcon}/>
                                                          
                                                          
                                                          
                                                                <p
                                                                    style={{
                                                                    fontSize: '8.5em',
                                                                    fontFamily: 'typeface-roboto',
                                                                }}>
                                                                    {Math.round(data.currently.temperature)}<span
                                                                        style={{
                                                                              fontSize: '0.5em',
                                                                              fontFamily: 'typeface-roboto'
                                                                                 }}>&#8451;</span>
                                                                </p>
                                                          
                                                          
                                                            </div>

                                                            <div
                                                                style={{
                                                                height: '70%',
                                                                width: '40%',
                                                                float: 'right',
                                                                    
                                                             
                                                            }}>
                                                                 <Image  size='small' centered   src={require(`assest/images/${data.currently.icon}.png`) }/>
                                                          

                                                            </div>

                                                        </div>

                                                    </Segment>

                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>

                                        <Grid columns={3} divided stackable>
                                            <Grid.Row stretched>

                                            <Grid.Column stackable>

                                            <Segment style={{
                                                    textAlign: 'center',
                                                    border: `2px solid ${main.state.outlineColor}`

                                                }}>
                                                        <div
                                                            style={{
                                                            height: '100%',
                                                            float: 'left',
                                                            width: '100%',
                                                            
                                                        }}>
                                                            <div   style={{
                                                                height: '70%',
                                                                float: 'right',
                                                                width: '30%',
                                                            }}>
                                                             <Image size='tiny' src={require('assest/images/humidity.png') }/>
                                                             </div>
                                                            <h1
                                                                style={{
                                                                fontSize: '1.5em',
                                                                width: '70%'
                                                                
                                                            }}>
                                                                Humidity:
                                                                <br/>
                                                                <span
                                                                    style={{
                                                                    fontSize: '1.8em',
                                                                    paddingLeft: '5px',
                                                                    
                                                                }}>
                                                                       {data.currently.humidity.toString().split('.')[1]}
                                                                
                                                                </span>
                                                                <span
                                                                    style={{
                                                                    fontSize: '0.9em',
                                                                    paddingLeft: '5px',

                                                                }}>
                                                                    &#37;
                                                                </span>
                                                            </h1>

                                                        </div>
                                                    </Segment>
                                                 
                                                   </Grid.Column>

                                                <Grid.Column stackable>

                                                <Segment style={{
                                                    textAlign: 'center',
                                                    border: `2px solid ${main.state.outlineColor}`,
                                                    borderRadius: '10px'

                                                }}>
                                                        <div
                                                            style={{
                                                            height: '100%',
                                                            float: 'left',
                                                            width: '100%',

                                                        }}>

<div   style={{
                                                                height: '70%',
                                                                float: 'right',
                                                                width: '30%',
                                                            }}>
                                                             <Image size='tiny' src={require('assest/images/airpressure.png') }/>
                                                             </div> 

                                                            <h1
                                                                style={{
                                                                fontSize: '1.5em',
                                                                paddingLeft: '2px',
                                                                width: '70%'
                                                            }}>
                                                                Air Pressure:
                                                            <br/>
                                                                <span
                                                                    style={{
                                                                    marginTop:'2px',
                                                                    fontSize: '1.8em',
                                                                    paddingLeft: '5px'
                                                                }}>
                                                                    {Math.round(data.currently.pressure)}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                    fontSize: '0.9em'
                                                                }}>
                                                                    hPa
                                                                </span>
                                                            </h1>

                                                        </div>
                                                    </Segment>
                                                    
                                                </Grid.Column>

                                                <Grid.Column stackable>
     
                                                <Segment style={{
                                                    textAlign: 'center',
                                                    border: `2px solid ${main.state.outlineColor}`,
                                                    borderRadius: '10px'

                                                }}>
                                                        <div
                                                            style={{
                                                            height: '100%',
                                                            float: 'left',
                                                            width: '100%',

                                                        }}>
                                                            <div   style={{
                                                                height: '70%',
                                                                float: 'right',
                                                                width: '30%',
                                                            }}>
                                                             <Image size='tiny' src={require('assest/images/realfeel.png') }/>
                                                             </div>
                                            
                                                            <h1
                                                                style={{
                                                                fontSize: '1.5em',
                                                                paddingLeft: '2px',
                                                                width: '70%'
                                                    
                                                            }}>
                                                                Real Feel:
                                                                <br/>
                                                                <span
                                                                    style={{
                                                                    fontSize: '1.8em',
                                                                    paddingLeft: '5px'
                                                                }}>
                                                                    {Math.round(data.currently.apparentTemperature)}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                    fontSize: '0.9em'
                                                                }}>
                                                                    &#8451;
                                                                </span>
                                                            </h1>

                                                        </div>

                                                    </Segment>
                                                
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                        
                            <Grid columns={2} divided stackable>
                                            <Grid.Row stretched>
                                                <Grid.Column>
                                                <Segment style={{
                                                    textAlign: 'center',
                                                    border: `2px solid ${main.state.outlineColor}`,
                                                    borderRadius: '10px'

                                                }}>
                                                        <div
                                                            style={{
                                                            height: '100%',
                                                            float: 'left',
                                                            width: '100%',

                                                            
                                                        }}>
                                            
                                            <div   style={{
                                                                height: '70%',
                                                                float: 'right',
                                                                width: '30%',
                                                            }}>
                                                             <Image size='tiny' src={require('assest/images/wind-direction.png') }/>
                                                             </div>
                                            
                                                            <h1
                                                                style={{
                                                                fontSize: '1.5em',
                                                                paddingLeft: '2px',
                                                                width: '70%'
                                                            }}>
                                                                  
                                                                Wind Direction:
                                                            <br/>
                                                                <span
                                                                    style={{
                                                                    fontSize: '1.8em',
                                                                    paddingLeft: '5px'
                                                                }}>
                                                                    {data.currently.windBearing}
                                                                </span>
                                                                <sup
                                                                    style={{
                                                                    fontSize: '0.9em',
                                                                    
                                                                }}>
                                                                    	
                                                                &#176;
                                                                </sup>
                                                            </h1>

                                                        </div>
                                                    </Segment>


                                                    <Segment style={{
                                                    textAlign: 'center',
                                                    border: `2px solid ${main.state.outlineColor}`,
                                                    borderRadius: '10px'

                                                }}>
                                                        <div
                                                            style={{
                                                            height: '100%',
                                                            float: 'left',
                                                            width: '100%',


                                                        }}>
                                                            <div   style={{
                                                                height: '70%',
                                                                float: 'right',
                                                                width: '30%',
                                                            }}>
                                                             <Image size='tiny' src={require('assest/images/wind-speed.png') }/>
                                                             </div>
                                                          <h1
                                                                style={{
                                                                fontSize: '1.5em',
                                                                paddingLeft: '2px',
                                                                width: '70%'
                                                            }}>
                                                                Wind Speed:
                                                                <br/>
                                                                <span
                                                                    style={{
                                                                    fontSize: '1.8em',
                                                                    paddingLeft: '5px'
                                                                }}>
                                                                    {data.currently.windSpeed}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                    fontSize: '0.9em'
                                                                }}>
                                                                    km/h
                                                                </span>
                                                            </h1>

                                                        </div>

                                                    </Segment>

                                                    </Grid.Column>

                                                    <Grid.Column>

                                                    <Segment style={{
                                                    textAlign: 'center',
                                                    border: `2px solid ${main.state.outlineColor}`,
                                                    borderRadius: '10px'

                                                }}>
                                                        <div
                                                            style={{
                                                            height: '100%',
                                                            float: 'left',
                                                            width: '100%',

                                                        }}>
                                                            <div   style={{
                                                                height: '70%',
                                                                float: 'right',
                                                                width: '30%',
                                                            }}>
                                                             <Image size='tiny' src={require('assest/images/uv-index.png') }/>
                                                             </div>
                                            
                                                            <h1
                                                                style={{
                                                                fontSize: '1.5em',
                                                                paddingLeft: '2px',
                                                                width: '70%'
                                                            }}>
                                                                UV Index:
                                                                <br/>
                                                                <span
                                                                    style={{
                                                                    fontSize: '1.8em',
                                                                    paddingLeft: '5px'
                                                                }}>
                                                                    {data.currently.uvIndex}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                    fontSize: '0.9em'
                                                                }}>
                                                                    mW²/m
                                                                </span>
                                                            </h1>

                                                        </div>

                                                    </Segment>
                                                    

                                                    <Segment style={{
                                                    textAlign: 'center',
                                                    border: `2px solid ${main.state.outlineColor}`,
                                                    borderRadius: '10px'

                                                }}>
                                                        <div
                                                            style={{
                                                            height: '100%',
                                                            float: 'left',
                                                            width: '100%',

                                                        }}>
                                                            <div   style={{
                                                                height: '70%',
                                                                float: 'right',
                                                                width: '30%',
                                                            }}>
                                                            <Image size='tiny' src={require('assest/images/visibility.png') }/>
                                                             </div>
                                            
                                                            <h1
                                                                style={{
                                                                fontSize: '1.5em',
                                                                paddingLeft: '2px',
                                                                width: '70%'
                                                            }}>
                                                                Visibility:
                                                                <br/>
                                                                <span
                                                                    style={{
                                                                    fontSize: '1.8em',
                                                                    paddingLeft: '5px'
                                                                }}>
                                                                    {data.currently.visibility.toFixed(2)}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                    fontSize: '0.9em'
                                                                }}>
                                                                    km/h
                                                                </span>
                                                            </h1>

                                                        </div>

                                                    </Segment>
                                                    


                            </Grid.Column>
                                </Grid.Row>
                            </Grid>

                            </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            
                            <Grid
                                columns={1}
                                divided
                                stackable
                                style={{
                                border: `2px solid ${main.state.outlineColor}`,
                                borderRadius: '5px',
                                marginTop: '2%'
                            }}>
                                <Grid.Row stretched>
                                    <Grid.Column>

                                        <Grid columns={1} divided stackable>
                                            <Grid.Row stretched>
                                                <Grid.Column>
                                                    <div
                                                        style={{
                                                        height: '100%',
                                                        
                                                    }}>

                                                        <h1
                                                            style={{    
                                                                fontSize: '3.5em',
                                                                textAlign:'center',
                                                            marginTop: '4%'
                                                        }}>
                                                           Forcast 
                                                        </h1>

                                                    </div>

                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>

                                        <Grid columns={1} divided stackable>
                                            <Grid.Row stretched>
                                                <Grid.Column>
                                                    <div
                                                        style={{
                                                        height: '100%',
                                                    }}>

                                                        <h1
                                                            style={{
                                                            fontSize: '2.0em',
                                                            textAlign:'center',
                                                            
                                                        }}>
                                                             Hourly Update
                                                        </h1>

                                                    </div>

                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>

                                        <Grid columns={3} divided stackable>
                                            <Grid.Row stretched>
                                                {data.hourly.data.map((snap, i) => {

                                                      var targetTime = new Date(snap.time * 1000);
                                                      var cTime = targetTime.toLocaleTimeString('en-US', {
                                                        timeZone: data.timezone, 
                                                        hour12: true,
                                                        timeStyle: 'short',
                                                          })

                                                      
                                                    return (
                                                        <Grid.Column key={i}>

                                                            <Segment style={{
                                                            border: `2px solid ${main.state.outlineColor}`,
                                                            borderRadius: '5px',
                                                            textAlign: 'center',
                                                            marginTop: '10px'

                                                            }}>
                                                                <div
                                                                    style={{
                                                                    height: '100%',
                                                                    float: 'left',
                                                                    width: '100%',
                                                                    textAlign: 'center'
                                                                    
                                                                }}>
                                                                     <h1
                                                                        style={{
                                                                        float: 'left',
                                                                       fontSize: '1.3em',
                                                                    }}>
                                                                        
                                                                        {cTime} 
                                                                    </h1>
                                                                    <div style={{
                                                                        height: '100%',
                                                                        width: '50%',
                                                                        float: 'right',
                                                                        
                                                                    }}>
                                                                            <Image size='mini' floated='right' src={this.getPic(snap.icon)}/>
                                                                   
                                                                    </div>

                                                                    <div style={{
                                                                        height: '100%',
                                                                        width: '50%',
                                                                        float:'left',
                                                                    }}>

                                                                    <h1
                                                                        style={{
                                                                        fontSize: '2.5em',
                                                                        textAlign:'center'
                                                                    }}>
                                                                        {snap.temperature}

                                                                        <span
                                                                            style={{
                                                                            fontSize: '1em',
                                                                            paddingLeft: '5px',
                                                                            textAlign:'center'
                                                                        }}>
                                                                            
                                                                        </span>
                                                                        <span
                                                                            style={{
                                                                            fontSize: '0.7em'
                                                                        }}>
                                                                            &#8451;
                                                                        </span>
                                                                    </h1>
                                                                    </div>
                                                                   
                                                                   
                                                                  

                                                                </div>
                                                            </Segment>

                                                        </Grid.Column>
                                                    )
                                                })}

                                            </Grid.Row>
                                        </Grid>

                                        <Grid columns={1} divided stackable>
                                            <Grid.Row stretched>
                                                <Grid.Column>
                                                    <div
                                                        style={{
                                                        height: '100%'
                                                    }}>

                                                        <h1
                                                            style={{
                                                            fontSize: '2.0em',
                                                            textAlign:'center',
                                                            

                                                        }}>
                                                             Daily Update
                                                        </h1>

                                                    </div>

                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>

                                        <Grid columns={3} divided stackable>
                                            <Grid.Row stretched>
                                                {data.daily.data.map(snap => {
                                                      var targetTime = new Date(snap.time * 1000);
                                                      
                                                       var cDate = targetTime.toLocaleDateString('en-IN', {
                                                        timeZone: data.timezone, 
                                                        dateStyle: 'short',
                                                          })


                                                    return (
                                                        <Grid.Column>

                                                            <Segment style={{
                                                            border: `2px solid ${main.state.outlineColor}`,
                                                            borderRadius: '5px',        
                                                            textAlign:'center',
                                                            marginTop: '10px'
                                                            }}>
                                                                <div
                                                                    style={{
                                                                    height: '100%',
                                                                    float: 'left',
                                                                    width: '100%'
                                                                }}>


                                                                    <h1
                                                                        style={{
                                                                        float: 'left',
                                                                        fontSize: '1.3em'
                                                                    }}>
                                                                        {cDate}
                                                                    </h1>
                                                                    <div style={{
                                                                        height: '100%',
                                                                        width: '50%',
                                                                        float: 'right',
                                                                        
                                                                    }}>
                                                                            <Image size='mini' floated='right' src={this.getPic(snap.icon)}/>
                                                                   
                                                                    </div>
                                                                    <h1
                                                                        style={{
                                                                        fontSize: '1.6em',
                                                                        paddingTop: '15px'
                                                                    }}>
                                                                       ↑

                                                                        <span
                                                                            style={{
                                                                            fontSize: '1.4em',
                                                                            paddingLeft: '5px'
                                                                        }}>
                                                                            {snap.temperatureHigh}
                                                                        </span>
                                                                        <span
                                                                            style={{
                                                                            fontSize: '1.1em'
                                                                        }}>
                                                                            &#8451;
                                                                        </span>
                                                                    </h1>
                                                                    
                                                                    <h1
                                                                        style={{
                                                                        fontSize: '1.6em',
                                                                       
                                                                    }}>
                                                                       ↓

                                                                        <span
                                                                            style={{
                                                                            fontSize: '1.4em',
                                                                            paddingLeft: '5px'
                                                                        }}>
                                                                            {snap.temperatureLow}
                                                                        </span>
                                                                        <span
                                                                            style={{
                                                                            fontSize: '1.1em'
                                                                        }}>
                                                                            &#8451;
                                                                        </span>
                                                                    </h1>

                                                                </div>
                                                            </Segment>

                                                        </Grid.Column>
                                                    )
                                                })}

                                            </Grid.Row>
                                        </Grid>
                                    </Grid.Column>

                                </Grid.Row>
                            </Grid>

                            
                        </Grid.Column>
                    </Grid.Row>
                </Grid>}
            </Container>

        )
    }
}

