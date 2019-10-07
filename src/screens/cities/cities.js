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
         searchList: ''
         
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
      
    const { cityName, temperature, eximage, rdate, main } = this.state


    return(
        <Container style={{
            padding: '5vh'
        }}>
        <Card.Group>
           
        <CitiesCard  onClick={() => {
          this.props.main.setState({
            realTime: null,
            sensorControl: null,
            cities: null,
            citydetail: true   
          })
        }} title={cityName} data={temperature} image={eximage} date={rdate} unit='&#8451;' main={this.props.main}/>
           
        <CitiesCard   title={cityName} data={temperature} image={eximage} date={rdate} unit='&#8451;' main={this.props.main}/>
            
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
            
          



      }} key={data.annotations.geohash}  ><h3>{data.components.city +", "+ data.components.country}</h3> </div>: ''
    })}
    </Modal.Content>
  </Modal>
            
            
            
            
        </Card.Group>
        </Container>

   
    )
  }
}

export default Cities;