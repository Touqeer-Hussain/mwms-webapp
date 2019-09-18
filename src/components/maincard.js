import React, {Component} from 'react'
import {Card, Image, Button, Container} from 'semantic-ui-react';
import 'typeface-roboto'

class MainCard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
      console.log(this.props)
      const { title, data, unit, image } = this.props
    return (
      <Card
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
              width: '75%'
            }}>
              <h1 style={{
                fontSize: '2.5em',
                paddingLeft: '2px',
              }}>{title}</h1>
            </div>
            <div
              style={{
              width: '25%',
              float: 'right',
              height: '100%',
              paddingTop: '2px',
              paddingRight: '2px',
            }}>
              <Image floated='right' size='medium' src={image}/>
              
            </div>

          </div>

          <div style={{
            height: '70%',
            paddingLeft: '13%'
          }}>

            <p style={{
          fontSize: '5.5em',
          fontFamily: 'typeface-roboto',
          
        }} >
          {data}<span style={{
          fontSize: '0.7em',
          fontFamily: 'typeface-roboto',
          
        }}>{unit}</span>
        </p>
              </div>

              <div >
              </div>
      </div>
    </Card>

    )
  }
}

export default MainCard;
