import React, { Component } from 'react'

// Screens
import MainContainer from './container/container'
import RealTime from './screens/realtime/realtime'
import SensorControl from './screens/sensorcontrol/sensorcontrol'
import Cities from 'screens/cities/cities'
import CityDetail from 'screens/citydetail/citydetail'
import Historical from 'screens/hisrotical/historical'
import Theme from 'screens/theme/theme'
import About from 'screens/about/about'

//firebase
import firebase from 'config/firebase'

class App extends Component {
    constructor(props){
      super(props);
      this.state ={
        realTime: true,
        sensorControl: null,
        cities: false,
        citydetail: null,
        historical: null,
        theme: null,
        about: null,
        menuBarColor: localStorage.getItem('menuBarColor'),
        outlineColor: localStorage.getItem('outlineColor'),
      

  
      }
    }

    componentDidMount(){

       this.themeRef =  firebase.database().ref('theme')
       this.themeRef.on('value', snap => {
          
          
          this.setState({
              menuBarColor: snap.val().menuBarColor,
              outlineColor:  snap.val().outlineColor
          })
        })
    }


    componentWillUnmount(){
        this.themeRef.off('value')
    }
  render(){
    
    var { realTime, sensorControl, cities, citydetail, historical, theme, about } = this.state;
    return(
      <MainContainer main={this}>
      { realTime && <RealTime  main={this}/> }
      { sensorControl && <SensorControl  main={this}/> }
      { cities && <Cities main={this} />}
      { citydetail && <CityDetail main={this} />}
      { historical && <Historical main={this} />}
      {theme && <Theme main={this} />}
      { about && <About main={this} />}
     </MainContainer>
   
    )
  }
}

export default App;