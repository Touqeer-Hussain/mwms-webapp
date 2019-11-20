import React, { Component } from 'react'
import {
    Card,
    Image,
    Button,
    Container,
    Modal,
    Header,
    Input,
    Form,
    Icon

} from 'semantic-ui-react'





import firebase from 'config/firebase'
import plusimage from 'assest/images/plus.png'
import MainCard from 'components/maincard'
import CitiesCard from 'components/citiescard'
import Exximg from 'assest/images/fist.jpg'


import DotLoader from 'react-spinners/DotLoader';
import swal from 'sweetalert'

class Cities extends Component {
    constructor(props){
      super(props);
      this.state ={
         searchQuery: '',
         cityName: '',
         temperature: '',
         eximage: Exximg , 
         rdate:   '',
         searchList: '',
         citiesList: [],
         citiesName: [],
         citiesLength: '',
         load: false,
         searchLoad: true
         
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
      this.getCityData();
      
    }

    async getCityData(){

      this.setState({
        citiesList: [],
        citiesLength: 0,
        load: false
      })

      firebase.database().ref('cities').once("value", async snap => { 
        this.setState({
          citiesLength: snap.numChildren()
        })
      })

    firebase.database().ref('cities').on("child_added", async snap => { 
    
     
      

      fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/04eaa61891ba6ace0154c6b2b6ce1c60/${snap.val().lat},${snap.val().lng}?units=si`).then(fth => {
        fth.json().then(res => { 
          
          this.setState({
            citiesList: this.state.citiesList.concat({...res, "city": snap.val().city, "cityKey": snap.key})
           
          }, () => {
            this.setState({
              load: true
            })
            
        console.log('list',this.state.citiesList)
        console.log('lenght',this.state.citiesLength)
            
          })

        })})
         
          

    })


    }
    
    async searchFunc(){
      const { searchQuery } = this.state;
      if(searchQuery.length >= 1){
        this.setState({
          searchLoad: false
        })
        let fth = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${searchQuery}&key=1ef2a51a49a748d1afd8e32f57c441d9`);
        let res = await fth.json();
        this.setState({
          searchList: res
        }, () => {
          console.log(res)

          if(res.total_results >= 1){
              
          }else{
            swal('No Results Found','','warning')
          }
          this.setState({
            searchLoad: true
          })
        })
      
      }else{
          swal('Input Error!', 'Please give proper Input.', 'error' )
      }
    }


  render(){
      
    const { cityName, temperature, eximage, rdate, citiesList, citiesLength, citiesName, load, searchLoad } = this.state
    const { main } = this.props;

    return( load ? 
        <Container style={{
            padding: '5vh'
        }}>
        <Card.Group>
           
          {citiesLength == citiesList.length ?  citiesList.map((snap,i )=> {
                    
                    
                return <CitiesCard key={snap.cityKey} data={snap} title={snap.city} temp={Math.round(snap.currently.temperature)} image={require(`assest/images/${snap.currently.icon}.png`)} date={new Date(snap.currently.time * 1000).toDateString()} unit='&#8451;' main={this.props.main}/>
             
           
           
             
          }) : ''}

        
            
        <Card  onClick={() => this.setState({ modalOpen: true })}
        style={{
        border: `2px solid ${main.state.outlineColor}`,
        borderRadius: '5px'
      }}>
        <div style={{
          margin: 'auto',
          width: '100%',
         
        }}>
         
              <Image  size='small' src={plusimage} centered/>
              
    </div>
    </Card>

        <Modal size='small'  open={this.state.modalOpen}>
    <Modal.Header>Add City</Modal.Header>
    <Modal.Content>
    <Form onSubmit={() => {
      
      this.searchFunc();

    }}>
    <Form.Input fluid onChange={(e) => {
        this.setState({
            searchQuery: e.target.value
        })
    }} placeholder='Search...' action={{
        icon: 'search'
       
    }}/>
    </Form> {
      
      searchLoad ? 
    
    this.state.searchList  &&this.state.searchList.results.length >= 1 && this.state.searchList.results.map((data, i) => {
            
        return data.confidence <= 5  && ( data.components.city || data.components.state ) && data.components.country ? <div onClick={() => {

          
          firebase.database().ref('cities').once("value", snap  => {
            if(snap.val() !== null){
              firebase.database().ref('cities').once("child_added", snap => {
              
                
                if(snap.val().city !== data.components.city || snap.val().state !== data.components.state){
                  firebase.database().ref('cities').push({
                    lat: data.geometry.lat,
                    lng: data.geometry.lng,
                    city: data.components.city ? data.components.city : data.components.state,
                    country: data.components.country
                  }, (err) => {
                    if(err){

                    }else{
                      this.setState({
                          modalOpen: false,
                          citiesLength: this.state.citiesLength + 1
                      })
                      
                    }
                  })
                }else{
                  swal('Duplicate!', 'City is already added!', 'warning')
                }
              })
            }else{

              firebase.database().ref('cities').push({
                lat: data.geometry.lat,
                lng: data.geometry.lng,
                city: data.components.city ? data.components.city : data.components.state,
                country: data.components.country
              }, (err) => {
                if(err){

                }else{
                  this.setState({
                      modalOpen: false,
                      citiesLength: this.state.citiesLength + 1
                  })
                  
                }
              })

            }
          })
            
          



      }} key={data.annotations.geohash}  >
        <p style={{
        fontSize: '1.5em',
        fontFamily: 'vincHand'
       
      }}>{data.formatted}</p> </div>: <span>
          
      </span>
    })
     : <div className='sweet-loading'>
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
    </div> }
    </Modal.Content>
    <Modal.Actions>
          <Button  color='red' onClick={() => {
            this.setState({
              modalOpen: false
            })
          }} >
            <Icon name='cancel' /> Cancel
          </Button>
        </Modal.Actions>
  </Modal>
            
            
            
            
        </Card.Group>
        </Container> : <div className='sweet-loading'>
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

   
    )
  }
}

export default Cities;