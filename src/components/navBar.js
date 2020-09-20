import React, { Component } from 'react';
import logo from "../image/logo.svg";
import profile from "../image/dwarf.svg"
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  Row,
  Col
} from "reactstrap";
import {Link} from 'react-router-dom'

export default class Navigation extends Component {
  constructor(props){
    super(props);
    this.state={
      navbarOpen:false
    }
  }
  render() {
    return (
        <Navbar  color='dark' dark expand='md'>
        <Container className='pt-3'>
          <NavbarBrand>
            <img src={logo} alt='logo' />
          </NavbarBrand>
          <NavbarToggler onClick={()=>this.setState({navbarOpen: !this.state.navbarOpen})} />
          <Collapse navbar isOpen={this.state.navbarOpen}>
            <Nav navbar className="ml-auto">
            <NavItem>
                <Link className='nav-link' to='/'>Home</Link>
              </NavItem>
              <NavItem>
                <Link className='nav-link' to='/admin'>Admin</Link>
              </NavItem>
            </Nav>
            <div>
            <Row>
            <Col>
            <img src={profile} alt='profile'/>
  
            </Col>
           
            </Row>
           
            </div>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
