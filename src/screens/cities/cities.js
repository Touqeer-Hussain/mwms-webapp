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




class Cities extends Component {
    constructor(props){
      super(props);
      this.state ={
         searchQuery: ''
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
    
  render(){
      
    return(
        <Container style={{
            padding: '5vh'
        }}>
        <Card.Group>
        <MainCard title='Temperature' data={'temperature'} unit='&#8451;' image={plusimage}/>
            
            
        <Modal trigger={<Card
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
    </Card>} closeIcon size='small'>
    <Modal.Header>Add City</Modal.Header>
    <Modal.Content>
    <Form onSubmit={console.log('dark sky')}>
    <Form.Input fluid onChange={(e) => {
        this.setState({
            searchQuery: e.target.value
        })
    }} placeholder='Search...' action={{
        icon: 'search',
        onClick: () => {
            console.log('dark sky')
        }
    }}/>
    </Form>
    </Modal.Content>
  </Modal>
            
            
            
            
        </Card.Group>
        </Container>

   
    )
  }
}

export default Cities;