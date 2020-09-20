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
  Input,
} from "reactstrap";

export default class HomePage extends React.Component {
  state = {
    items:[],
    allItems: [],
    count: null,
    dataPerPage: null,
    currentPage: 1,
    search:''
  };

  componentDidMount() {
    this.getItems();
  }

  getItems =  (number) => {
    axios.get(`http://localhost:8080/items?page=${number}`).then((res) => {
      const allItems = res.data.data;
      const items= res.data.data;
      const page = res.data.pageInfo;
      console.log(items);
      // console.log('data',items);
      this.setState({
        allItems,
        items,
        count: page.count,
        dataPerPage: page.dataPerPage,
        currentPage: page.currentPage,
      });
    });
  };

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      items: this.state.allItems.filter((items) => new RegExp(event.target.value, "i").exec(items.name))
    })
    
  }
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
          <PaginationLink key={number} className={classes} onClick={() => this.getItems(number)}>
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
        <Input type='text' placeholder="Search......." value={this.state.search}
            onChange={this.handleSearch}/>
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
