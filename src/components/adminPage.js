import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import axios from "axios";
import Navbar from './navBar'
class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      pages:[],

      name: "",
      price: "",
      description: "",
      category_id: "",
      editMode: false,
    };
  }
  componentDidMount() {
    this.getData();
    this.paginationLength()
  }
  getData = () => {
    axios.get(`http://localhost:8080/items`).then((res) => {
      
      const items = res.data.data;
      console.log("data", items);
      this.setState({ items: items });
      console.log("ini edit", this.state.editMode);
    });
  };

  paginationLength = () => {
    const url = `http://localhost:8080/items`
    axios.get(url).then((res)=>{
      console.log('coba:',res.data.pageInfo);
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: this.state.name,
      price: this.state.price,
      description: this.state.price,
      category_id: this.state.category_id,
    };

    axios
      .post(`http://localhost:8080/items`, data)
      .then((res) => {
        console.log("ini post:", res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.getData();
        this.setState({
          name: "",
          price: "",
          description: "",
          category_id: "",
          editMode: false,
        });
      });
  };

  handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:8080/items/${id}`)
      .then((res) => {
        console.log("delete", res.data.message);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.getData();
      });
  };

  handleEdit = (id) => {
    axios
      .get(`http://localhost:8080/items/${id}`)
      .then((res) => {
        //  console.log("coba:",res.data);
        this.setState({
          id: res.data.choosenData.id,
          name: res.data.choosenData.name,
          price: res.data.choosenData.price,
          category_id: res.data.choosenData.category_id,
          description: res.data.choosenData.description,
          editMode: true,
        });
        // console.log('ini edit',this.state.editMode)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleEditItems = (event) => {
    event.preventDefault();
    const id = this.state.id;
    const data = {
      name: this.state.name,
      price: this.state.price,
      category_id: this.state.category_id,
      description: this.state.description,
    };
    axios
      .patch(`http://localhost:8080/items/${id}`, data)
      .then((res) => {
        if (res) {
          this.setState({
            id: "",
            name: "",
            price: "",
            description: "",
            category_id: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.getData();
        this.setState({
          editMode: false,
        });
      });
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
     <>
     <Navbar/>
      <Container className="mt-5">
        <Row>
          <Col>
            <legend>Manage Data</legend>
            <Form
              onSubmit={
                this.state.editMode ? this.handleEditItems : this.handleSubmit
              }
            >
              <FormGroup>
                <Label>Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  dark
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </FormGroup>
              <FormGroup>
                <Label>Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="text"
                  placeholder="Rp."
                  onChange={this.handleChange}
                  value={this.state.price}
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input
                  id="description"
                  name="description"
                  type="textarea"
                  onChange={this.handleChange}
                  value={this.state.description}
                />
              </FormGroup>
              <FormGroup>
                <Label>Category Id</Label>
                <Input sm={2}
                  id="category_id"
                  name="category_id"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.category_id}
                />
              </FormGroup>
              <FormGroup>
                <Button>
                  {this.state.editMode ? "Edit an Item" : "Add new Item"}
                </Button>
              </FormGroup>
            </Form>
          </Col>
          <Col md={4} >
            <legend>List of items</legend>
            <Table  responsive  dark>
              <thead responsive >
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">CategoryId</th>
                  {/* <th scope="col">Description</th> */}
                  {/* <th>Description</th> */}
                </tr>
              </thead>
              <tbody responsive >
                {this.state.items.map((items) => (
                  <tr>
                    {/* <th scope='row'>{items.id}</th> */}
                    <th scope="row">{items.id}</th>
                    <td>{items.name}</td>
                    <td>{items.price}</td>
                    <td>{items.category_id}</td>
                    {/* <td>{items.description}</td> */}
                    <Button sm={3} md={12}
                        className="btn btn-warning text-light mx-2"
                        onClick={() => this.handleEdit(items.id)}
                      >
                        Edit
                      </Button>
                
                    <Button  md={12}
                        className="btn btn-danger text-light mx-2"
                        onClick={() => this.handleDelete(items.id)}
                      >
                        Delete
                      </Button>
                    
                    
                   
                  </tr>
                  
                ))}
              </tbody>
            </Table>
            
            <div className="justify-content-center">
            <Pagination aria-label="Page navigation example">
              <PaginationItem disabled>
                <PaginationLink first href="#" />
              </PaginationItem>
              <PaginationItem disabled>
                <PaginationLink previous href="#" />
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink next href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink last href="#" />
              </PaginationItem>
            </Pagination>
            </div>
           
          </Col>
        </Row>
        <Row>
      
         
        </Row>
      </Container>
     </>
    );
  }
}

export default AdminPage;
