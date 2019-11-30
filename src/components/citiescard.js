import React, {Component} from 'react'
import { Card, Image } from 'semantic-ui-react';
import 'typeface-roboto'

export default class CitiesCard extends Component {
 
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
        border: `2px solid ${main.state.outlineColor}`,
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
                marginLeft: '3px',
                
              
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
            borderTop: `2px solid ${main.state.outlineColor}`,
            borderBottom: `2px solid ${main.state.outlineColor}`,
            borderRight: `2px solid ${main.state.outlineColor}`
          

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
            borderTop: `2px solid ${main.state.outlineColor}`,
            borderBottom: `2px solid ${main.state.outlineColor}`,

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

            <div style={{
                    height: '15%',
                    width: '100%',
                    float: 'left',
                    paddingTop: '1%'
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


