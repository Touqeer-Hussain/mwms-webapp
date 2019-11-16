import React, {Component} from 'react'
import {Card, Image, Button, Container, Confirm, Icon} from 'semantic-ui-react';
import 'typeface-roboto'
import Eximg from 'assest/images/fist.jpg'
import CityDetail from 'screens/citydetail/citydetail'

class CitiesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    }


  
  }

  render() {

    const { title, temp, image, date, unit, main, data } = this.props

    return ( 
        
      <Card onClick={async () => {
        await localStorage.setItem('data', JSON.stringify(data))
        main.setState({
            cities: null,
            citydetail: true
        })
          
         
        
      }} 
        style={{
        border: '2px solid teal',
        borderRadius: '5px'
      }}>
        <div style={{
          height: '100%'
        }}>
          <div style={{
            height: '30%'
          }}>
            <div
              style={{
              height: '100%',
              float: 'left',
              width: '100%'
            }}>
              <h1 style={{
                fontSize: '2.5em',
                marginLeft: '3px'
              
              }}>{title}</h1>
            </div>
            
           
          </div>

          <div style={{
            height: '55%',
        
          }}>

         
            <div
         style={{

            height: '100%',
            width: '60%',
            float: 'left',
            borderTop: '2px solid teal',
            borderBottom: '2px solid teal',
            borderRight: '2px solid teal'
          

         }
         }><h1 style={{
            fontSize: '4em',
            paddingLeft: '5px',
          }}>{temp}
          <span style={{
            fontSize: '0.8em'
            
          }}> {unit} </span></h1>
        
              </div>

              
            <div
         style={{

            height: '100%',
            width: '40%',
            float: 'left',
            borderTop: '2px solid teal',
            borderBottom: '2px solid teal',

         }
         }>
             <Image style={{
          height:'95%',
          width: '95%' ,
          margin: '2px 0px 0px 2px'
          
             }} src={image}/>
              </div>

              <div >
              </div>

              
      </div>

<div
              style={{
                height: '15%',
                width: '100%',
                float: 'left',
             


              }}> 
              <span style={{
          fontSize: '1.6em',
          fontFamily: 'typeface-roboto',
          
          }}> {date} </span>
        
               </div>

      </div>
    </Card>

    )
  }
}

export default CitiesCard;
