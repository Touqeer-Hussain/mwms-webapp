import React, { Component } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

import firebase from 'config/firebase'



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
        ]
      }
    }

    componentDidMount(){
      
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

      firebase.database().ref('realtime').limitToLast(5).on('child_added', snap => {
        console.log(snap.val())
      })
    }

  render() {
    const { data } = this.state;
    return (
      <AreaChart width={730} height={250} data={data}
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
  <Area type="monotone" dataKey="temperature" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
</AreaChart>
    );
  }
}
