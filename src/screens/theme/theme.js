import React, {Component} from 'react'
import {Card, Image, Button, Container, Confirm, Icon, Grid, Segment, GridColumn, GridRow} from 'semantic-ui-react';
import 'typeface-roboto'
import firebase from 'config/firebase'
import swal from 'sweetalert'

class Theme extends Component {
  constructor(props) {
    super(props);
    this.state = {
        colorList: ["red","orange","yellow","olive","green","teal",
        "blue","violet","purple","pink","brown","grey","black"]
    }


  
  }

  render() {

    const { main } = this.props
    const { colorList } = this.state

    return ( 
                <div style={{

                width: '100%',
                height: '100%',
                
                float: 'left',
                padding: '10px'
                
                }}>

                    <div style={{
                        
                        padding: '10px',
                        border: `2px solid ${main.state.outlineColor}`,
                        borderRadius: '10px'
                    }}>

                    <h1 style={{
                        fontSize: '3.0em'
                    }}>Theme</h1>

                        
                        <Grid>
                            <Grid.Row>
                            <Grid.Column style={{
                                width: '100%'
                                
                            }}>
                                <h1 style={{
                                    width: '100%'
                                }}>Menubar Color:</h1>
                                
                                                { colorList.map(color => {
                                                    return <Segment floated='left' color={color} inverted  horizontal
                                                        circular style={{
                                                        
                                                            width: 10,
                                                            height: 10
                                                        }}
                                                    onClick={() => {
                                                        firebase.database().ref('theme/web/menuBarColor').set(color);
                                                        localStorage.setItem('menuBarColor', color);
                                                            main.setState({
                                                                menuBarColor: color
                                                            })
                                                    }}>

                                                    </Segment>
                                                }) }




                            </Grid.Column>
                            
                            
                            </Grid.Row>
                            
                            
                            
                            <Grid.Row>
                            
                            
                            <Grid.Column style={{
                                width: '100%'
                                
                            }}>
                                
                                <h1 style={{
                                    width: '100%'
                                }} >Outline Color:  </h1>
                                                     
                                                { colorList.map(color => {
                                                    return <Segment floated='left' color={color} inverted  horizontal
                                                    circular style={{
                                                    
                                                        width: 10,
                                                        height: 10
                                                    }} onClick={() => {
                                                        firebase.database().ref('theme/web/outlineColor').set(color);
                                                        localStorage.setItem('outlineColor', color);
                                                            main.setState({
                                                                outlineColor: color
                                                            })
                                                    }}>

                                                    </Segment>
                                                }) }
                                                
                            </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        </div> 
                        </div>

           
      
        )
}
}

export default Theme;
