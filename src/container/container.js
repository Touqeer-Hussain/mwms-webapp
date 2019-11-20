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
import logo from 'assest/images/logo.png'


const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}


class DesktopContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      e: ''
    }
  }
  
  
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
            color= {main.state.menuBarColor}
            vertical
          >
            <div style={{
                height: '100%',
                float: 'left',
                width: '100%',
            
            }} >
                  <h1 style={{
                    fontSize: '2em'
                  }} >My Weather Monitering System</h1>
              
              
            
            </div>
            
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
              color= {main.state.menuBarColor}
              
            > 
            
            <Container>
            
            <Image  src={logo} width="50px"  height="50px"/>
            
             
                <Menu.Item as='a' active={main.state.realTime} onClick={(e) => {
                   
                     
                    main.setState({
                      realTime: true,
                      sensorControl: null,
                      cities: null,
                      citydetail: null,
                      historical: null,
                      theme: null,
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
                      theme: null,
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
                    theme: null,
                    about: null
                  })
              }} >Cities</Menu.Item>
              <Menu.Item as='a' active={main.state.theme} onClick={(e) => {
                   
                     
                   main.setState({
                     realTime: null,
                     sensorControl: null,
                     cities: null,
                     citydetail: null,
                     historical: null,
                     theme: true,
                     about: null,

                   })
               }}>Theme</Menu.Item>
              <Menu.Item as='a' active={main.state.about} onClick={(e) => {
                   
                     
                   main.setState({
                     realTime: null,
                     sensorControl: null,
                     cities: null,
                     citydetail: null,
                     historical: null,
                     theme: null,
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
  constructor(props){
    super(props)
    this.state = {
   
    }
  }

  componentDidMount(){
    
  }

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
          width='very wide'
          direction='top'
          animation= 'push'
        >
          <Menu.Item style={{
            backgroundColor: main.state.menuBarColor,
            height: '73px'
            
          }}>
            <div style={{
            
              width: '100%',
              float: 'left'
              
            }} > 

             <div style={{
              
              width: '18%',
              float: 'left'
              
            }} > 
            
            
          <Image  src={logo} width="50px"  height="50px" />
          </div>
          <div style={{
            width:'78%',
            float: 'left'
          }}>
          
          <p style={{
              fontSize: '1.2em',
              fontWeight: 'bold',
              color: 'white',
              
              


          }}>My Weather Monitering System</p>
          </div>
          </div>
          </Menu.Item>
          
          
          <Menu.Item as='a' active={main.state.realTime} onClick={(e) => {
                   
                     
                   main.setState({
                     realTime: true,
                     sensorControl: null,
                     cities: null,
                     citydetail: null,
                     historical: null,
                     theme: null,
                     about: null,

                   })
                   this.setState({ sidebarOpened: false })
               }}>Realtime</Menu.Item>
               <Menu.Item as='a' active={main.state.sensorControl} onClick={(e) => {
                 
                   main.setState({
                     realTime: null,
                     sensorControl: true,
                     cities: null,
                     citydetail: null,
                     historical: null,
                     theme: null,
                     about: null
                   })
                   this.setState({ sidebarOpened: false })
               }}>Sensor Control</Menu.Item>
               <Menu.Item as='a' active={main.state.cities} onClick={(e) => {
                 
                 main.setState({
                   realTime: null,
                   sensorControl: null,
                   cities: true,
                   citydetail: null,
                   historical: null,
                   theme: null,
                   about: null
                 })
                 this.setState({ sidebarOpened: false })
             }} >Cities</Menu.Item>
             <Menu.Item as='a' active={main.state.theme} onClick={(e) => {
                  
                    
                  main.setState({
                    realTime: null,
                    sensorControl: null,
                    cities: null,
                    citydetail: null,
                    historical: null,
                    theme: true,
                    about: null,

                  })
                  this.setState({ sidebarOpened: false })
              }}>Theme</Menu.Item>
             <Menu.Item as='a' active={main.state.about} onClick={(e) => {
                  
                    
                  main.setState({
                    realTime: null,
                    sensorControl: null,
                    cities: null,
                    citydetail: null,
                    historical: null,
                    theme: null,
                    about: true,

                  })
                  this.setState({ sidebarOpened: false })
              }}>About</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ padding: '0.5em 0em', }}
            vertical
            color={main.state.menuBarColor}
            
          >
            <Container>
              <Menu inverted secondary  color={main.state.menuBarColor}>
                <Menu.Item onClick={this.handleToggle} >
                  <Icon name='sidebar' style={{fontSize: '1.5em'}}/>
                </Menu.Item>
                
                
            <Menu.Item position='left'>
                  <h4 style={{
                      fontSize: '1.5em'
                  }} >MWMS</h4>
              
              
            
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

