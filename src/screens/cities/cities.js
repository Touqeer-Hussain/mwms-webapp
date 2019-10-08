import React, { Component } from 'react'
import {
    Card,
    Image,
    Button,
    Container,
    Modal,
    Header,
    Input,
    Form

} from 'semantic-ui-react'

import firebase from 'config/firebase'
import plusimage from 'assest/images/plus.png'
import MainCard from 'components/maincard'
import CitiesCard from 'components/citiescard'
import Exximg from 'assest/images/fist.jpg'



class Cities extends Component {
    constructor(props){
      super(props);
      this.state ={
         searchQuery: '',
         cityName: 'Karachi',
         temperature: '10',
         eximage: Exximg , 
         rdate:   'sep 20, 2019',
         searchList: '',
         citiesList: [],
         citiesName: [],
         citiesLength: ''
         
      }
      
      

    }

    componentDidMount(){
    //   firebase.database().ref('current').on('value', (data) =>{
        
    //     this.setState({
    //       temperature: Math.round(data.val().temperature),
    //       humidity: Math.round(data.val().humidity),
    //       lux: data.val().lux,
    //       realFeel: Math.round(data.val().realFeel),
    //       airPressure: data.val().airPressure,
    //       altitude: Math.round(data.val().altitude)
    //     })
    //     console.log(data.val())
    //   })
    firebase.database().ref('cities').once("value", async snap => { 
        this.setState({
          citiesLength: snap.numChildren()
        })
      })

    firebase.database().ref('cities').on("child_added", async snap => { 
    
     
      

      fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/04eaa61891ba6ace0154c6b2b6ce1c60/${snap.val().lat},${snap.val().lng}`).then(fth => {
        fth.json().then(res => { 

          this.setState({
            citiesList: this.state.citiesList.concat({...res, "city": snap.val().city})
           
          })

        })})
          
         
          

    })

      
    }
    
    async searchFunc(){
      const { searchQuery } = this.state;
      let fth = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${searchQuery}&key=1ef2a51a49a748d1afd8e32f57c441d9`);
      let res = await fth.json();
      console.log(res)
      this.setState({
        searchList: res
      })
    }


  render(){
      
    const { cityName, temperature, eximage, rdate, main, citiesList, citiesLength, citiesName } = this.state


    return(
        <Container style={{
            padding: '5vh'
        }}>
        <Card.Group>
           
          {citiesLength == citiesList.length ?  citiesList.map((snap,i )=> {
                    console.log(citiesList)
                    
                return <CitiesCard  onClick={() => {
                  this.props.main.setState({
                    realTime: null,
                    sensorControl: null,
                    cities: null,
                    citydetail: true   
                  })
                }} title={snap.city} data={Math.round(snap.currently.temperature)} image={require('assest/images/clear-day.png')} date={new Date(snap.currently.time * 1000).toDateString()} unit='&#8451;' main={this.props.main}/>
             
           
           
             
          }) : ''}

        
            
        <Card  onClick={() => this.setState({ modalOpen: true })}
        style={{
        border: '2px solid teal',
        borderRadius: '5px'
      }}>
        <div style={{
          margin: 'auto',
          width: '100%',
         
        }}>
         
              <Image  size='small' src={plusimage} centered/>
              
    </div>
    </Card>

        <Modal closeIcon size='small'  open={this.state.modalOpen}>
    <Modal.Header>Add City</Modal.Header>
    <Modal.Content>
    <Form onSubmit={() => {
      console.log('cities')
      this.searchFunc();
    }}>
    <Form.Input fluid onChange={(e) => {
        this.setState({
            searchQuery: e.target.value
        })
    }} placeholder='Search...' action={{
        icon: 'search'
       
    }}/>
    </Form>
    {this.state.searchList && this.state.searchList.results.map((data) => {
        return data.confidence <= 3 ? <div onClick={() => {

          
          firebase.database().ref('cities').once("value", snap  => {
            if(snap.val() !== null){
              firebase.database().ref('cities').once("child_added", snap => {
              
                console.log(snap)
                if(snap.val().city !== data.components.city){
                  firebase.database().ref('cities').push({
                    lat: data.geometry.lat,
                    lng: data.geometry.lng,
                    city: data.components.city,
                    country: data.components.country
                  }, (err) => {
                    if(err){

                    }else{
                      this.setState({
                          modalOpen: false
                      })
                    }
                  })
                }else{
                  console.log('city already')
                }
              })
            }else{

              firebase.database().ref('cities').push({
                lat: data.geometry.lat,
                lng: data.geometry.lng,
                city: data.components.city,
                country: data.components.country
              }, (err) => {
                if(err){

                }else{
                  this.setState({
                      modalOpen: false
                  })
                }
              })

            }
          })
            
          



      }} key={data.annotations.geohash}  ><h3 style={{
        fontSize: '3em',
        fontFamily: 'vincHand'
       
      }}>{data.components.city +",    "+ data.components.country}</h3> </div>: ''
    })}
    </Modal.Content>
  </Modal>
            
            
            
            
        </Card.Group>
        </Container>

   
    )
  }
}

export default Cities;