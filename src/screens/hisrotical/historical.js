import React, {Component} from 'react'
import {
    Button,
    Container,
    Grid,
    Icon

} from 'semantic-ui-react'

import {
   XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, LineChart
  } from 'recharts';

import DateTimePicker from 'react-datetime-picker';
import DotLoader from 'react-spinners/DotLoader';



export default class Historical extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: JSON.parse(localStorage.getItem('data')),
            load: false,
            date: new Date(),
            arrayDate: new Date().toLocaleDateString().split("/"),
            histData: '',
            monthlyData: '',
            dailyData: '',
            hourlyData: '',
            numOfDays: new Date(new Date().toLocaleDateString().split("/")[2], new Date().toLocaleDateString().split("/")[0], 0).getDate(),
            chartWidth: 0

            
        }
    }

    componentDidMount() {
        if(window.innerWidth <= 600){
            this.setState({
              chartWidth: window.innerWidth * 0.83
            })
          }else{
            this.setState({
              chartWidth: window.innerWidth * 0.70
            })
          }

       this.getData()

        

    }

    dateChange = date => {
        var cDate = new Date(date).toLocaleDateString().split("/");
        var numOfDays = new Date(cDate[2], cDate[0], 0).getDate()
        // console.log(numOfDays)
        this.setState({ 
            date,
            arrayDate: cDate,
            numOfDays: numOfDays
        }, () => {
            this.getData()        
        })
       
    }

    async getData() {
        // console.log("done")
           const { data, arrayDate, numOfDays } = this.state 


        




        fetch(`https://api.meteostat.net/v1/stations/nearby?lat=${data.latitude}&lon=${data.longitude}&key=oyRxjMhk`).then(fth => {
            fth.json().then(res => { 
                // console.log(res)
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
                    fetch(`https://api.meteostat.net/v1/history/daily?station=${res.data[0].id}&start=${arrayDate[2]}-${arrayDate[1]}-01&end=${arrayDate[2]}-${arrayDate[1]}-${numOfDays}&time_zone=${data.timezone}&key=oyRxjMhk`).then(fth => {
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
                    fetch(`https://api.meteostat.net/v1/history/hourly?station=${res.data[0].id}&start=${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}&end=${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}&time_zone=${data.timezone}&time_format=Y-m-d%20H:i&key=oyRxjMhk`).then(fth => {
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
        const { load, monthlyData, hourlyData, dailyData, chartWidth} = this.state;
        const { main } = this.props;
        return (
            <Container style={{
                padding: '5vh'
            }}>

<Grid columns={2} divided stackable>
                    <Grid.Row >
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
                    
                    
                        <Grid.Column >
                            <div style={{
                                float: 'right',
                            
                                
                                
                            }}>
                        <DateTimePicker 
                             onChange={this.dateChange}
                             value={this.state.date}
                             minDate={new Date(0)}
                        />
                          

</div>                
                        </Grid.Column>
                        </Grid.Row>
</Grid>
                
               

                {   load ?
                    <div>
                
                 <LineChart width={chartWidth} height={390} data={hourlyData.data}
  margin={{ top: 100, right: 30, left: 0, bottom: 0 }}>
  
  <XAxis dataKey="time_local" />
  <YAxis dataKey="temperature"/>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Line type="monotone" dataKey="temperature" stroke="#00BFFF" fillOpacity={1} strokeWidth={2} />
</LineChart>


      <LineChart width={chartWidth} height={390} data={dailyData.data}
  margin={{ top: 100, right: 30, left: 0, bottom: 0 }}>
  
  <XAxis dataKey="date" />
  <YAxis dataKey="temperature"/>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Line type="monotone" dataKey="temperature" stroke="#00BFFF" fillOpacity={1}  strokeWidth={2}/>
</LineChart>


<LineChart width={chartWidth} height={390} data={monthlyData.data}
  margin={{ top: 100, right: 30, left: 0, bottom: 0 }}>
  
  <XAxis dataKey="month" />
  <YAxis dataKey="temperature_max"/>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Line type="monotone" dataKey="temperature_mean_max" stroke="#FFA500" fillOpacity={1}  strokeWidth={2}/>
  <Line type="monotone" dataKey="temperature_mean_min" stroke="#00BFFF" fillOpacity={1}  strokeWidth={2}/>
</LineChart>

                </div> : <div className='sweet-loading'>
        <DotLoader
          css={`
          display: block;
          margin: 0 auto;
          border-color: 'red';
      `}
          sizeUnit={"px"}
          size={150}
          color={main.state.menuBarColor}
        />
      </div> 
            }
            
            </Container>

        )
    }
}
