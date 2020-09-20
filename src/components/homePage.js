import React from "react";
import Footer from "./footer";
import Navigation from "./navBar";
import logo from "../image/dwarf.svg";
import AdminPage from "./adminPage";
import Login from "./login";
import axios from "axios";
import {
  Container,
  Jumbotron,
  Row,
  Col,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Card,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
} from "reactstrap";

export default class HomePage extends React.Component {
  state = {
    items: [],
    count: null,
    dataPerPage: null,
    currentPage: 1,
  };

  componentDidMount() {
    this.getItems();
  }

  getItems = async (number) => {
    axios.get(`http://localhost:8080/items?page=${number}`).then((res) => {
      const items = res.data.data;
      const page = res.data.pageInfo;
      console.log(page);
      // console.log('data',items);
      this.setState({
        items,
        count: page.count,
        dataPerPage: page.dataPerPage,
        currentPage: page.currentPage,
      });
    });
  };

  render() {
    let renderPageNumber;
    const pageNumbers = [];
    if (this.state.count !== null) {
      for (
        let i = 1;
        i <= Math.ceil(this.state.count / this.state.dataPerPage);
        i++
      ) {
        pageNumbers.push(i);
      }

      renderPageNumber = pageNumbers.map((number) => {
        let classes = this.state.currentPage === number;

        return (
          <PaginationLink key={number} onClick={() => this.getItems(number)}>
            {" "}
            {number}
          </PaginationLink>
        );
      });
    }

    return (
      <>
        <Navigation />
        <Container sm={4}>
          <Jumbotron className="mt-5">
            <h1>Hello</h1>
          </Jumbotron>
          <Row>
            {this.state.items.map((items) => (
              <Col xs={6} sm={4} md={3}>
                <Card xs={4} sm={4} md={3} className="mt-3 shadow">
                  <CardBody>
                    <CardImg className="bg-dark mb-2" src={logo} />
                    <CardText>{items.name}</CardText>
                    <CardText>Rp.{items.price}</CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="d-flex justify-content-center mt-5">
            <Pagination size="md">{renderPageNumber}</Pagination>
          </Row>
        </Container>

        {/* <div>
      <ul>
        
      </ul>
      </div> */}
        <Footer className="position-fixed" />
      </>
    );
  }
}
