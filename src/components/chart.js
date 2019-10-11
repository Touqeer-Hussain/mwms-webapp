import React, { Component } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer
} from 'recharts';

import firebase from 'config/firebase'
import DotLoader from 'react-spinners/DotLoader';


export default class Chart extends Component {
    constructor(){
      super();
      this.state = {
        data: [
          {
            time: 'Page A', temperature: 4000
          },
          {
            time: 'Page B', temperature: 3000
          },
          {
            time: 'Page C', temperature: 2000
          },
          {
            time: 'Page D', temperature: 2780
          },
          {
            time: 'Page E', temperature: 1890
          },
          {
            time: 'Page F', temperature: 2390
          },
          {
            time: 'Page G', temperature: 3490
          }
        ],
        tempData: [],
        humidityData: [],
        luxData: [],
        airPreData: [],
        altiData: [],
        realFeelData: [],
        load: false
      }
    }

    componentDidMount(){

        var count = 0
      firebase.database().ref('realtime').limitToLast(12).on('child_added', snap => {
        count++;
        console.log(snap.val())
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
          
          if (count == 12) {
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
      
      var f = 1
      setInterval(() => {
        
            f++
            this.setState({
              data:  this.state.data.concat({
                time: 'dsds '+f, temperature: Math.random(100)
              })
            }, () => {
              this.state.data.shift();
            })
         
          
      },2000)

      // firebase.database().ref('realtime').limitToLast(5).on('child_added', snap => {
      //   console.log(snap.val())
      // })
    }

  render() {
    const { data, tempData, airPreData, altiData, humidityData, luxData, realFeelData, load } = this.state;
    return (
      load ? 
      <div>


        <AreaChart width={870} height={300} data={tempData}
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
  <Area type="monotone" dataKey="temperature" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
</AreaChart>


      <AreaChart width={870} height={300} data={humidityData}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="time" />
  <YAxis dataKey="humidity"/>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Legend verticalAlign="top" height={36}/>
  <Area type="monotone" dataKey="humidity" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
</AreaChart>



<AreaChart width={870} height={300} data={airPreData}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="time" />
  <YAxis dataKey="airPressure"/>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Area type="monotone" dataKey="airPressure" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
</AreaChart>



<AreaChart width={870} height={300} data={altiData}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="time" />
  <YAxis dataKey="altitude"/>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Area type="monotone" dataKey="altitude" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
</AreaChart>



<AreaChart width={870} height={300} data={luxData}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="time" />
  <YAxis dataKey="lux"/>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Area type="monotone" dataKey="lux" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
</AreaChart>



<AreaChart width={870} height={300} data={realFeelData}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="time" />
  <YAxis dataKey="realFeel"/>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Area type="monotone" dataKey="realFeel" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
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
          color={'#123abc'}
          loading={this.state.loading}
        />
      </div> 
    );
  }
}
