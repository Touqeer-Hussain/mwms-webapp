import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import Exximg from 'assest/images/fist.jpg';
import logoname from 'assest/images/mwms.jpg'
import logo from 'assest/images/logo.PNG'


const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}


class DesktopContainer extends Component {
  state = {e: ''}
  
  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children, main } = this.props
    const { fixed, cons } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth} >
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{  padding: '0.5em 0em'}}
            color= 'teal'
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
              color= 'teal'
            > 
            
            <Container>
            <Image  src={logo} width='40px' height='40px' />
            
             
                <Menu.Item as='a' active={main.state.realTime} onClick={(e) => {
                   
                     
                    main.setState({
                      realTime: true,
                      sensorControl: null,
                      cities: null,
                      citydetail: null,
                      historical: null,
                      about: null,

                    })
                }}>Realtime</Menu.Item>
                <Menu.Item as='a' active={main.state.sensorControl} onClick={(e) => {
                  
                    main.setState({
                      realTime: null,
                      sensorControl: true,
                      cities: null,
                      citydetail: null,
                      historical: null,
                      about: null
                    })
                }}>Sensor Control</Menu.Item>
                <Menu.Item as='a' active={main.state.cities} onClick={(e) => {
                  
                  main.setState({
                    realTime: null,
                    sensorControl: null,
                    cities: true,
                    citydetail: null,
                    historical: null,
                    about: null
                  })
              }} >Cities</Menu.Item>
              <Menu.Item as='a' active={main.state.about} onClick={(e) => {
                   
                     
                   main.setState({
                     realTime: null,
                     sensorControl: null,
                     cities: null,
                     citydetail: null,
                     historical: null,
                     about: true,

                   })
               }}>About</Menu.Item>
                <Menu.Item position='right'>
                  {/* <Button as='a' inverted={!fixed}>
                    Log in
                  </Button>
                  <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button> */}
                </Menu.Item>
                
              </Container>
            </Menu>
            
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children, main } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item>
            
          <Image  size='tiny' src={require('assest/images/fist.jpg')}/>
          <p>MWMS</p>
          </Menu.Item>
          
          
          <Menu.Item as='a' active={main.state.realTime} onClick={(e) => {
                   
                     
                   main.setState({
                     realTime: true,
                     sensorControl: null,
                     cities: null,
                     citydetail: null,
                     historical: null,
                     about: null,

                   })
               }}>Realtime</Menu.Item>
               <Menu.Item as='a' active={main.state.sensorControl} onClick={(e) => {
                 
                   main.setState({
                     realTime: null,
                     sensorControl: true,
                     cities: null,
                     citydetail: null,
                     historical: null,
                     about: null
                   })
               }}>Sensor Control</Menu.Item>
               <Menu.Item as='a' active={main.state.cities} onClick={(e) => {
                 
                 main.setState({
                   realTime: null,
                   sensorControl: null,
                   cities: true,
                   citydetail: null,
                   historical: null,
                   about: null
                 })
             }} >Cities</Menu.Item>
             <Menu.Item as='a' active={main.state.about} onClick={(e) => {
                  
                    
                  main.setState({
                    realTime: null,
                    sensorControl: null,
                    cities: null,
                    citydetail: null,
                    historical: null,
                    about: true,

                  })
              }}>About</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ padding: '0.5em 0em', }}
            vertical
            color='teal'
          >
            <Container>
              <Menu inverted secondary  color='teal'>
                <Menu.Item onClick={this.handleToggle} >
                  <Icon name='sidebar' style={{fontSize: '1.5em'}}/>
                </Menu.Item>
                <Menu.Item position='right'>
                  {/* <Button as='a' inverted>
                    Log in
                  </Button>
                  <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button> */}
                </Menu.Item>
              </Menu>
            </Container>
            
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}



class MainContainer extends Component {
    constructor(props){
        super(props);

    }



    render(){
        const { children, main } = this.props;
        return(
        <div style={{
            height: '100vh'
        }}>
        <DesktopContainer main={main}>{children}</DesktopContainer>
        <MobileContainer main={main}>{children}</MobileContainer>
      </div>
      )
    }
} 


export default MainContainer;

