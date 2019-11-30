import React, { Component } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

import firebase from 'config/firebase'
import DotLoader from 'react-spinners/DotLoader';


export default class Chart extends Component {
    constructor(props){
      super(props);
      this.state = {
        tempData: [],
        humidityData: [],
        luxData: [],
        airPreData: [],
        altiData: [],
        realFeelData: [],
        load: false,
        chartWidth: 0
      }
    }

    componentDidMount(){

      if(window.innerWidth <= 600){
        this.setState({
          chartWidth: window.innerWidth * 0.83
        })
      }else{
        this.setState({
          chartWidth: window.innerWidth * 0.55
        })
      }

        this.getData()
        
    }

    componentWillUnmount(){
        this.unsub.off('child_added')      
    }


    getData(){
      // console.log('Get Data')
      this.setState({
        load: false
      })
      // console.log('Chats', this.props.main)
        var count = 0
      this.unsub = firebase.database().ref('realtime').limitToLast(12)
      this.unsub.on('child_added', snap => {
        count++;
        // console.log('Get Data',`count ${count}`, snap.val().lux)
        // console.log( this.state.tempData)
        var time = new Date(snap.val().time * 1000).getHours() + ":" +new Date(snap.val().time * 1000).getMinutes() + ":" +new Date(snap.val().time * 1000).getSeconds();
        this.setState({
            tempData: this.state.tempData.concat({
              time: time, 
              temperature: snap.val().temperature}),
           humidityData: this.state.humidityData.concat({
              time: time, 
              humidity: snap.val().humidity}),
           luxData: this.state.luxData.concat({
              time: time, 
              lux: snap.val().lux}),    
           airPreData: this.state.airPreData.concat({
              time: time, 
              airPressure: snap.val().airPressure}),
           altiData: this.state.altiData.concat({
              time: time, 
              altitude: snap.val().altitude}),
           realFeelData: this.state.realFeelData.concat({
              time: time, 
              realFeel: snap.val().realFeel})      
        }, () => {
          
          if (count >= 12) {
                  this.state.tempData.shift();
                  this.state.humidityData.shift();
                  this.state.luxData.shift();
                  this.state.airPreData.shift();
                  this.state.altiData.shift();
                  this.state.realFeelData.shift();
                  this.setState({
                    load: true
                  })
          }
        })
        
      })
      
      
      

     
    }
  render() {
    const { tempData, airPreData, altiData, humidityData, luxData, realFeelData, load, chartWidth } = this.state;
    const { main } = this.props;
    return (
      load ? 
      <div>


        <AreaChart width={chartWidth} height={300} data={tempData}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={main.state.outlineColor} stopOpacity={0.8}/>
      <stop offset="95%" stopColor={main.state.outlineColor} stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="time" />
  <YAxis dataKey="temperature"/>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Area type="monotone" dataKey="temperature" stroke={main.state.outlineColor} fillOpacity={1} fill="url(#colorUv)" />
</AreaChart>


      <AreaChart width={chartWidth} height={300} data={humidityData}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={main.state.outlineColor} stopOpacity={0.8}/>
      <stop offset="95%" stopColor={main.state.outlineColor} stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="time" />
  <YAxis dataKey="humidity"/>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Legend verticalAlign="top" height={36}/>
  <Area type="monotone" dataKey="humidity" stroke={main.state.outlineColor} fillOpacity={1} fill="url(#colorUv)" />
</AreaChart>



<AreaChart width={chartWidth} height={300} data={airPreData}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={main.state.outlineColor} stopOpacity={0.8}/>
      <stop offset="95%" stopColor={main.state.outlineColor} stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="time" />
  <YAxis dataKey="airPressure"/>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Area type="monotone" dataKey="airPressure" stroke={main.state.outlineColor} fillOpacity={1} fill="url(#colorUv)" />
</AreaChart>



<AreaChart width={chartWidth} height={300} data={altiData}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={main.state.outlineColor} stopOpacity={0.8}/>
      <stop offset="95%" stopColor={main.state.outlineColor} stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="time" />
  <YAxis dataKey="altitude"/>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Area type="monotone" dataKey="altitude" stroke={main.state.outlineColor} fillOpacity={1} fill="url(#colorUv)" />
</AreaChart>



<AreaChart width={chartWidth} height={300} data={luxData}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={main.state.outlineColor} stopOpacity={0.8}/>
      <stop offset="95%" stopColor={main.state.outlineColor} stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="time" />
  <YAxis dataKey="lux"/>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Area type="monotone" dataKey="lux" stroke={main.state.outlineColor} fillOpacity={1} fill="url(#colorUv)" />
</AreaChart>



<AreaChart width={chartWidth} height={300} data={realFeelData}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={main.state.outlineColor} stopOpacity={0.8}/>
      <stop offset="95%" stopColor={main.state.outlineColor} stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="time" />
  <YAxis dataKey="realFeel"/>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Area type="monotone" dataKey="realFeel" stroke={main.state.outlineColor} fillOpacity={1} fill="url(#colorUv)" />
</AreaChart>
</div> : <div className='sweet-loading'>
        <DotLoader
          css={`
          display: block;
          margin: 0 auto;
          border-color: red;
      `}
          sizeUnit={"px"}
          size={150}
          color={main.state.menuBarColor}
          loading={this.state.loading}
        />
      </div> 
    );
  }
}
