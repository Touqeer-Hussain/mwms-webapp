import React, {Component} from 'react'
import {Card, Image, Button, Container} from 'semantic-ui-react';
import Fist from '../assest/images/temp.jpg'

class MainCard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {

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
                fontSize: '2.5em'
              }}>Temperature</h1>
            </div>
            <div
              style={{
              width: '25%',
              float: 'right',
              height: '100%'
            }}>
              <Image floated='right' size='medium' src={Fist}/>
            </div>

          </div>

          <div style={{
            height: '70%'
          }}>

            <h1 style={{
          fontSize: '5.5em',
          fontFamily: ''
        }} >
          25 &#8451;
        </h1>
              </div>

              <div >
              </div>
      </div>
    </Card>

    )
  }
}

export default MainCard;
