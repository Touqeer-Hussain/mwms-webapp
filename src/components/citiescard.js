import React, {Component} from 'react'
import {Card, Image, Button, Container} from 'semantic-ui-react';
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

    const { title, data, image, date, unit, main } = this.props

    return ( 
        
      <Card onClick={() => {
        main.setState({
            cities: null,
            citydetail: true
        })
        
        this.setState({
        
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
                paddingLeft: '2px',
              }}>{title}</h1>
            </div>
           
          </div>

          <div style={{
            height: '60%',
        
          }}>

         
            <div
         style={{

            height: '100%',
            width: '50%',
            float: 'left',
            border: '1px solid blue'

         }
         }><h1 style={{
            fontSize: '4em',
            paddingLeft: '2px',
          }}>{data}
          <span style={{
            fontSize: '0.8em'
            
          }}> {unit} </span></h1>
        
              </div>

              
            <div
         style={{

            height: '50%',
            width: '50%',
            float: 'right',
            border: '1px solid blue'

         }
         }>
             <Image src={image}/>
              </div>

              <div >
              </div>

              
      </div>

<div
              style={{
                height: '10%',
                width: '100%',
                float: 'left',
                border: '1px solid red'
            


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