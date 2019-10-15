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
    Icon

} from 'semantic-ui-react'

import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, Line, LineChart
  } from 'recharts';

import DateTimePicker from 'react-datetime-picker';
import firebase from 'config/firebase'
import plusimage from 'assest/images/plus.png'
import Exximg from 'assest/images/fist.jpg'
import DotLoader from 'react-spinners/DotLoader';



class Historical extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: JSON.parse(localStorage.getItem('data')),
            cityData: '',
            load: false,
            date: new Date(),
            arrayDate: new Date().toLocaleDateString().split("/"),
            histData: '',
            monthlyData: '',
            dailyData: '',
            hourlyData: '',
            numOfDays: new Date(new Date().toLocaleDateString().split("/")[2], new Date().toLocaleDateString().split("/")[0], 0).getDate(),
            
        }
    }

    componentDidMount() {

       this.getData()

        

    }

    dateChange = date => {
        var cDate = new Date(date).toLocaleDateString().split("/");
        var numOfDays = new Date(cDate[2], cDate[0], 0).getDate()
        console.log(numOfDays)
        this.setState({ 
            date,
            arrayDate: cDate,
            numOfDays: numOfDays
        }, () => {
            
        })
       
    }

    async getData() {
        console.log("done")
           const {  unixDate, data, arrayDate, numOfDays } = this.state 

        




        fetch(`https://api.meteostat.net/v1/stations/nearby?lat=${data.latitude}&lon=${data.longitude}&limit=1&key=oyRxjMhk`).then(fth => {
            fth.json().then(res => { 
                console.log(res)
                if(res.data.length >= 1){
                        // Monthly
                    fetch(`https://api.meteostat.net/v1/history/monthly?station=${res.data[0].id}&start=${arrayDate[2]}-01&end=${arrayDate[2]}-12&time_zone=${data.timezone}&time_format=Y-m-d%20H:i&key=oyRxjMhk`).then(fth => {
                        fth.json().then(res => { 
                        console.log("monthly", res)
                        
                        this.setState({
                                monthlyData: res
               
                        }, () => {
                            this.setState({
                            load: true
                        })
                        })
    
                    })})

                    //daily
                    fetch(`https://api.meteostat.net/v1/history/daily?station=${res.data[0].id}&start=${arrayDate[2]}-${arrayDate[0] < 10 ? '0'+arrayDate[0] : ''+arrayDate[0] }-01&end=${arrayDate[2]}-${arrayDate[0] < 10 ? '0'+arrayDate[0] : ''+arrayDate[0] }-${numOfDays}&time_zone=${data.timezone}&key=oyRxjMhk`).then(fth => {
                    fth.json().then(res => { 
                        console.log("daily",res)
                        this.setState({
                                dailyData: res
               
                        }, () => {
                            this.setState({
                            load: true
                        })
                        })
    
                    })})

                    //hourly
                    fetch(`https://api.meteostat.net/v1/history/hourly?station=${res.data[0].id}&start=${arrayDate[2]}-${arrayDate[0]}-${arrayDate[1]}&end=${arrayDate[2]}-${arrayDate[0]}-${arrayDate[1]}&time_zone=${data.timezone}&time_format=Y-m-d%20H:i&key=oyRxjMhk`).then(fth => {
                        fth.json().then(res => { 
                        console.log("hourly",res)
                        this.setState({
                                hourlyData: res
               
                        }, () => {
                            this.setState({
                            load: true
                        })
                        })
    
                    })})
    
                }else{
                    prompt('No Nearby Station therefore no data found!!')
                }
                    
        })})




        
        

    }

    render() {
        const {data, load, list, cdata, unixDate, histData, monthlyData, hourlyData, dailyData} = this.state;
        return (
            <Container style={{
                padding: '5vh'
            }}>

<Grid divided="vertically">
                    <Grid.Row columns={2}>
                        <Grid.Column>

                        <Button animated
                    onClick={() => {
                    this
                        .props
                        .main
                        .setState({realTime: null, sensorControl: null, cities: null, citydetail: true, historical:  null})
                }}
                    color='twitter'>
                        <Button.Content visible>Back</Button.Content>

                        <Button.Content hidden>
                        <Icon name='arrow left' />
                        
                        </Button.Content>
                        </Button>
                       
                
                        </Grid.Column>
                    
                    
                        <Grid.Column  style={{
                            float: 'right'
                        }} >
                        <DateTimePicker 
                             onChange={this.dateChange}
                             value={this.state.date}
                             minDate={new Date(0)}
                        />
                           <Button compact style={{

                               borderRadius: '0px ',
                               float: 'right'
                           }}
                    onClick={() => {
                        this.getData()
                    
                    }}
                    color='black' >Select</Button>

                
                        </Grid.Column>
                        </Grid.Row>
</Grid>
                
               

                {load ?
                    <div>
                
                <LineChart width={1000} height={390} data={hourlyData.data}
  margin={{ top: 100, right: 30, left: 0, bottom: 0 }}>
  
  <XAxis dataKey="time_local" />
  <YAxis dataKey="temperature"/>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Line type="monotone" dataKey="temperature" stroke="#00BFFF" fillOpacity={1}  />
</LineChart>


      <LineChart width={1000} height={390} data={dailyData.data}
  margin={{ top: 100, right: 30, left: 0, bottom: 0 }}>
  
  <XAxis dataKey="date" />
  <YAxis dataKey="temperature"/>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Line type="monotone" dataKey="temperature" stroke="#00BFFF" fillOpacity={1}  />
</LineChart>


<LineChart width={1000} height={390} data={monthlyData.data}
  margin={{ top: 100, right: 30, left: 0, bottom: 0 }}>
  
  <XAxis dataKey="month" />
  <YAxis dataKey="temperature_max"/>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Line type="monotone" dataKey="temperature_max" stroke="#FFA500" fillOpacity={1}  />
  <Line type="monotone" dataKey="temperature_min" stroke="#00BFFF" fillOpacity={1}  />
</LineChart>

                </div> : <div className='sweet-loading'>
        <DotLoader
          css={`
          display: block;
          margin: 0 auto;
          border-color: red;
      `}
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
        />
      </div> 
            }
            
            </Container>

        )
    }
}

export default Historical;