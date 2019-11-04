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
import {concat} from 'bytebuffer'
class CityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirm: false,
            data: '',
            cityData: '',
            load: false,
            list: [
                1,
                2,
                3,
                4,
                5,
                6
            ]
        }
    }


    open = () => {
        this.setState({ confirm: true })
        console.log(this.state.confirm)
    }  

    close = () => { 
        this.setState({ confirm: false }, ()=>{
            console.log(this.state.confirm)
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
        this.setState({
            data: await JSON.parse(localStorage.getItem('data'))
        }, () => {
            this.setState({load: true})
            this.state.data.daily.data.length = 6
            this.state.data.hourly.data.length = 6
            console.log(this.state.data)

        })

    }

    render() {
        const {data, load, list} = this.state;
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
                      this.props.main.setState({
                          citydetail: null,
                          cities: true
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
                    <Grid.Row columns={2}>
                  
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

                    <div style={{

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
    <Button animated onClick={() => {
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
                    </div>
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
                                border: '2px solid teal',
                                borderRadius: '5px',
                                marginTop: '3%'
                            }}>
                                <Grid.Row stretched>
                                    <Grid.Column>

                                        <Grid columns={1} divided stackable>
                                            <Grid.Row stretched>
                                                <Grid.Column stackable>
                                                    <Segment>
                                                        <div
                                                            style={{
                                                            height: '100%'
                                                        }}>

                                                            <div
                                                                style={{
                                                                width: '100%',
                                                                height: '30%',
                                                                float: 'left'
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
                                                                width: '25%',
                                                                float: 'left',
                                                                height: '60%',
                                                                paddingTop: '2px',
                                                            }}>
                                                                <Image floated='right' size='medium' src={require('assest/images/fist.jpg')}/>
                                                            </div>

                                                            <div
                                                                style={{
                                                                height: '70%',
                                                                width: '60%',
                                                                paddingLeft: '20%'  
                                                            }}>

                                                                <p
                                                                    style={{
                                                                    fontSize: '5.5em',
                                                                    fontFamily: 'typeface-roboto',
                                                                }}>
                                                                    {Math.round(data.currently.temperature)}<span
                                                                        style={{
                    fontSize: '0.7em',
                    fontFamily: 'typeface-roboto'
                }}>&#8451;</span>
                                                                </p>
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
                                                    textAlign: 'center'
                                                }}>
                                                        <div
                                                            style={{
                                                            height: '100%',
                                                            float: 'left',
                                                            width: '100%'
                                                        }}>
                                                            <h1
                                                                style={{
                                                                fontSize: '1.5em',
                                                                paddingLeft: '2px'
                                                            }}>
                                                                Humidity:

                                                                <span
                                                                    style={{
                                                                    fontSize: '1.2em',
                                                                    paddingLeft: '5px'
                                                                }}>
                                                                       {data.currently.humidity.toString().split('.')[1]}
                                                                
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

                                                <Grid.Column stackable>

                                                <Segment style={{
                                                    textAlign: 'center'
                                                }}>
                                                        <div
                                                            style={{
                                                            height: '100%',
                                                            float: 'left',
                                                            width: '100%'
                                                        }}>
                                                            <h1
                                                                style={{
                                                                fontSize: '1.5em',
                                                                paddingLeft: '2px'
                                                            }}>
                                                                Air Pressure:

                                                                <span
                                                                    style={{
                                                                    fontSize: '1.2em',
                                                                    paddingLeft: '5px'
                                                                }}>
                                                                    {Math.round(data.currently.pressure)}
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

                                                <Grid.Column stackable>
     
                                                <Segment style={{
                                                    textAlign: 'center'
                                                }}>
                                                        <div
                                                            style={{
                                                            height: '100%',
                                                            float: 'left',
                                                            width: '100%'
                                                        }}>
                                                            <h1
                                                                style={{
                                                                fontSize: '1.5em',
                                                                paddingLeft: '2px'
                                                            }}>
                                                                Real Feel:

                                                                <span
                                                                    style={{
                                                                    fontSize: '1.2em',
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
                                                    textAlign: 'center'
                                                }}>
                                                        <div
                                                            style={{
                                                            height: '100%',
                                                            float: 'left',
                                                            width: '100%'
                                                        }}>
                                                            <h1
                                                                style={{
                                                                fontSize: '1.5em',
                                                                paddingLeft: '2px'
                                                            }}>
                                                                Wind Direction:

                                                                <span
                                                                    style={{
                                                                    fontSize: '1.2em',
                                                                    paddingLeft: '5px'
                                                                }}>
                                                                    {data.currently.windBearing}
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


                                                    <Segment style={{
                                                    textAlign: 'center'
                                                }}>
                                                        <div
                                                            style={{
                                                            height: '100%',
                                                            float: 'left',
                                                            width: '100%'
                                                        }}>
                                                            <h1
                                                                style={{
                                                                fontSize: '1.5em',
                                                                paddingLeft: '2px'
                                                            }}>
                                                                Wind Speed:

                                                                <span
                                                                    style={{
                                                                    fontSize: '1.2em',
                                                                    paddingLeft: '5px'
                                                                }}>
                                                                    {data.currently.windSpeed}
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

                                                    <Grid.Column>

                                                    <Segment style={{
                                                    textAlign: 'center'
                                                }}>
                                                        <div
                                                            style={{
                                                            height: '100%',
                                                            float: 'left',
                                                            width: '100%'
                                                        }}>
                                                            <h1
                                                                style={{
                                                                fontSize: '1.5em',
                                                                paddingLeft: '2px'
                                                            }}>
                                                                UV Index:

                                                                <span
                                                                    style={{
                                                                    fontSize: '1.2em',
                                                                    paddingLeft: '5px'
                                                                }}>
                                                                    {data.currently.uvIndex}
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
                                                    

                                                    <Segment style={{
                                                    textAlign: 'center'
                                                }}>
                                                        <div
                                                            style={{
                                                            height: '100%',
                                                            float: 'left',
                                                            width: '100%'
                                                        }}>
                                                            <h1
                                                                style={{
                                                                fontSize: '1.5em',
                                                                paddingLeft: '2px'
                                                            }}>
                                                                Visibility:

                                                                <span
                                                                    style={{
                                                                    fontSize: '1.2em',
                                                                    paddingLeft: '5px'
                                                                }}>
                                                                    {data.currently.visibility.toFixed(2)}
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

                            </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            
                            <Grid
                                columns={1}
                                divided
                                stackable
                                style={{
                                border: '2px solid teal',
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
                                                        height: '100%'
                                                    }}>

                                                        <h1
                                                            style={{    
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
                                                            fontSize: '1.5em',
                                                        textAlign:'center'
                                                        }}>
                                                            ( Hourly Update )
                                                        </h1>

                                                    </div>

                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>

                                        <Grid columns={6} divided stackable>
                                            <Grid.Row stretched>
                                                {data.hourly.data.map(snap => {
                                                    var cTime = new Date(snap.time * 1000).toLocaleTimeString().split(":");
                                                    var pTime = `${cTime[0]}:${cTime[1]} ${cTime[2].split(" ")[1]}`
                                                    return (
                                                        <Grid.Column>

                                                            <Segment>
                                                                <div
                                                                    style={{
                                                                    height: '100%',
                                                                    float: 'left',
                                                                    width: '100%',
                                                                    textAlign:'center'
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
                                                                        fontSize: '1.6em',
                                                                        paddingTop: '15px',
                                                                        textAlign:'center'
                                                                    }}>
                                                                        {snap.temperature}

                                                                        <span
                                                                            style={{
                                                                            fontSize: '1.2em',
                                                                            paddingLeft: '5px',
                                                                            textAlign:'center'
                                                                        }}>
                                                                            
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
                                                            fontSize: '1.5em',
                                                            textAlign:'center'
                                                        }}>
                                                            ( Day by Days Update )
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
                                                                            fontSize: '1.2em',
                                                                            paddingLeft: '5px'
                                                                        }}>
                                                                            {snap.temperatureHigh}
                                                                        </span>
                                                                        <span
                                                                            style={{
                                                                            fontSize: '0.9em'
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
                                                                            fontSize: '1.2em',
                                                                            paddingLeft: '5px'
                                                                        }}>
                                                                            {snap.temperatureLow}
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