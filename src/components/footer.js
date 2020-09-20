import React, { Component } from 'react';
import {Container,Row,Col} from 'reactstrap'

export default class Footer extends Component {
  render() {
    return (
       
        <div className=' bg-dark text-light justify-content-center'>
        <Container>
          <Row>
            <Col className='d-flex justify-content-center'>
              &copy; Admin blanja 2020
            </Col>
          </Row>
        </Container>
        </div>
    );
  }
}
