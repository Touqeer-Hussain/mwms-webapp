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
    Segment,
    Radio,
    Icon,
    Confirm

} from 'semantic-ui-react'

import firebase from 'config/firebase'
import plusimage from 'assest/images/plus.png'
import Exximg from 'assest/images/fist.jpg'

import swal from 'sweetalert'

import {concat} from 'bytebuffer'
class CityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirm: false,
            data: '',
            cityData: '',
            sun: {},
            load: false,
            list: [
                1,
                2,
                3,
                4,
                5,
                6
            ],
            background: '',
            timePhase: '',
            tempIcon: '',
            currentFontColor: ''
        }
    }


    open = () => {
        this.setState({ confirm: true })
        console.log(this.state.confirm)
    }  

    close = () => { 
        this.setState({ confirm: false }, ()=>{
            
        })
        
    }

    componentDidMount() {

        this.getData();

        //
        // fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/04
        // eaa61891ba6ace0154c6b2b6ce1c60/${city.lat},${city.lng}?units=si`).then(fth =>
        // {     fth.json().then(res => {         console.log(res)       this.setState({
        //         cityData: res,         load: true,       })     }) })

    }

    async getData() {
            const { data } = this.state;
        
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
            console.log(this.state.data)



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
                                                             Hourly Update.
                                                        </h1>

                                                    </div>

                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>

                                        <Grid columns={6} divided stackable>
                                            <Grid.Row stretched>
                                                {data.hourly.data.map((snap, i) => {
                                                    var cTime = new Date(snap.time * 1000).toLocaleTimeString().split(":");
                                                    var pTime = `${cTime[0]}:${cTime[1]}`
                                                    var meridim = cTime[0] > 12 ? 'pm' : 'am'
                                                    return (
                                                        <Grid.Column key={i}>

                                                            <Segment style={{
                                                            border: `2px solid ${main.state.outlineColor}`,
                                                            borderRadius: '5px'

                                                            }}>
                                                                <div
                                                                    style={{
                                                                    height: '100%',
                                                                    float: 'left',
                                                                    width: '100%',
                                                                    textAlign:'center',
                                                                    
                                                                }}>
                                                                    <h1
                                                                        style={{
                                                                        float: 'left',
                                                                       fontSize: '1.3em',
                                                                       marginleft: '50%'
                                                                    }}>
                                                                        
                                                                        {pTime}
                                                                    </h1>

                                                                    <h1
                                                                        style={{
                                                                        fontSize: '2.5em',
                                                                        paddingTop: '15px',
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
                                                             Weekly Update.
                                                        </h1>

                                                    </div>

                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>

                                        <Grid columns={6} divided stackable>
                                            <Grid.Row stretched>
                                                {data.daily.data.map(snap => {
                                                    var cDate = new Date(snap.time * 1000).toLocaleDateString()
                                                    return (
                                                        <Grid.Column>

                                                            <Segment style={{
                                                            border: `2px solid ${main.state.outlineColor}`,
                                                            borderRadius: '5px',        
                                                            textAlign:'center'
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

export default CityDetail;