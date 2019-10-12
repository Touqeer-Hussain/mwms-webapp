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
    Radio

} from 'semantic-ui-react'

import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, Line, LineChart
  } from 'recharts';

import DateTimePicker from 'react-datetime-picker';
import firebase from 'config/firebase'
import plusimage from 'assest/images/plus.png'
import Exximg from 'assest/images/fist.jpg'
import {concat} from 'bytebuffer'



class Historical extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            cityData: '',
            load: false,
            date: new Date(),
            unixDate: '',
            cdata: [
                {
                  time: 'Page A', temperature: 4000, temp: 2222
                },
                {
                  time: 'Page B', temperature: 3000, temp: 2222
                },
                {
                  time: 'Page C', temperature: 2000, temp: 2222
                },
                {
                  time: 'Page D', temperature: 2780, temp: 2222
                },
                {
                  time: 'Page E', temperature: 1890, temp: 2222
                },
                {
                  time: 'Page F', temperature: 2390, temp: 2222
                },
                {
                  time: 'Page G', temperature: 3490, temp: 2222
                }
              ],
        }
    }

    componentDidMount() {

        this.getData();

        

    }

    dateChange = date => {
        this.setState({ 
            date,
            unixDate: new Date(date).getTime()
        }, () => {
            console.log(this.state.unixDate)
        })
       
    }

    async getData() {
        console.log("done")
           const {  unixDate } = this.state 


        // fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/04eaa61891ba6ace0154c6b2b6ce1c60/${snap.val().lat},${snap.val().lng},${unixDate}?units=si`).then(fth => {
        //     fth.json().then(res => { 
    
        //       this.setState({
        //         citiesList: this.state.citiesList.concat({...res, "city": snap.val().city})
               
        //       }, () => {
        //         this.setState({
        //           load: true
        //         })
        //       })
    
        //     })})




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
        const {data, load, list, cdata, unixDate} = this.state;
        return (
            <Container style={{
                padding: '5vh'
            }}>

<Grid divided="vertically">
                    <Grid.Row columns={2}>
                        <Grid.Column>

                        <Button
                    onClick={() => {
                    this
                        .props
                        .main
                        .setState({realTime: null, sensorControl: null, cities: null, citydetail: true, historical:  null})
                }}
                    color='twitter'>Back</Button>
                       
                
                        </Grid.Column>
                    
                    
                        <Grid.Column >

                        <DateTimePicker
                             onChange={this.dateChange}
                             value={this.state.date}
                             minDate={new Date(0)}
                        />
                           <Button
                    onClick={() => {
                        this.getData()
                    
                    }}
                    color='black' >Select</Button>
                        </Grid.Column>
                        </Grid.Row>
</Grid>
                
               

                {load && 
                    <div>
                <Grid columns={1} divided stackable>
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
                                                                    border: '1px solid red'
                                                                }}>{data.city}
                                                                </h1>
                                                            </div>
                                                            <div
                                                                style={{
                                                                width: '25%',
                                                                float: 'left',
                                                                height: '60%',
                                                                paddingTop: '2px',
                                                                border: '1px solid red'
                                                            }}>
                                                                <Image floated='right' size='medium' src={require('assest/images/fist.jpg')}/>
                                                            </div>

                                                            <div
                                                                style={{
                                                                height: '70%',
                                                                width: '60%',
                                                                paddingLeft: '13%'
                                                            }}>

                                                                <p
                                                                    style={{
                                                                    fontSize: '5.5em',
                                                                    fontFamily: 'typeface-roboto'
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

                                                    <Segment>
                                                        <div
                                                            style={{
                                                            float: 'left'
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

                                                    <Segment>
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
                                                    <Segment>
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
                                                </Grid.Column>

                                                <Grid.Column stackable>

                                                    <Segment>
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

                                                    <Segment>
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

                                                    <Segment>
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

                                                <Grid.Column stackable>

                                                    <Segment>
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

                                                    <Segment>
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
                                                                Temperature:

                                                                <span
                                                                    style={{
                                                                    fontSize: '1.2em',
                                                                    paddingLeft: '5px'
                                                                }}>
                                                                    10
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

                                                    <Segment>
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
                                                                Temperature:

                                                                <span
                                                                    style={{
                                                                    fontSize: '1.2em',
                                                                    paddingLeft: '5px'
                                                                }}>
                                                                    10
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
                                     
                              
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                
                <LineChart width={1000} height={390} data={cdata}
  margin={{ top: 100, right: 30, left: 0, bottom: 0 }}>
  
  <XAxis dataKey="time" />
  <YAxis dataKey="temperature"/>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Line type="monotone" dataKey="temperature" stroke="#FFA500" fillOpacity={1}  />
  <Line type="monotone" dataKey="temp" stroke="#00BFFF" fillOpacity={1}  />
</LineChart>


      <AreaChart width={1000} height={300} data={cdata}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="time" />
  <YAxis dataKey="temperature"/>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Legend verticalAlign="top" height={36}/>
  <Area type="monotone" dataKey="temperature" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
</AreaChart>

                </div>
            }
            </Container>

        )
    }
}

export default Historical;