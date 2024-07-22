"use client";
import MyNavbar from "@/components/navBar";
import Cookies from 'js-cookie';
import { Button, Col, Container, Modal, Row, Table, Form } from "react-bootstrap";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Item {
  id : number ,
  name : string,
  company : string,
  price : number,
  quantity : string,
  description : string,
}

const Crud = () => {

  const [newFormData, setNewFormData] = useState<Item>({
    id: 0,
    name: '',
    company: '',
    price: 0,
    quantity: '',
    description: ''
  });
  const [updateFormData, setUpdateFormData] = useState<Item>({
    id: 0,
    name: '',
    company: '',
    price: 0,
    quantity: '',
    description: ''
  });

  const [products, setProducts] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [newModalShow, setNewModalShow] = useState(false)
  const [updateModalShow, setUpdateModalShow] = useState(false)

  const handleNewModalClose = () => setNewModalShow(false);
  const handleNewModalShow = () => setNewModalShow(true);

  const handleUpdateModalClose = () => setUpdateModalShow(false);
  const handleUpdateModalShow = (item:Item) => {
    setUpdateModalShow(true);
    setUpdateFormData(item)

  }

  const handleNewFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewFormData({ ...newFormData, [name]: value });
  };
  const handleUpdateFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  const handleNewFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = "http://127.0.0.1:8000/newProduct/";
    try {
      var csrf = Cookies.get('csrftoken')
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf?csrf:"",
        },
        body: JSON.stringify(newFormData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
      setNewFormData({
        id: 0,
        name: '',
        company: '',
        price: 0,
        quantity: '',
        description: ''
      });
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = "http://127.0.0.1:8000/updateProduct/";
    try {
      var csrf = Cookies.get('csrftoken')
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf?csrf:"",
        },
        body: JSON.stringify(updateFormData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
      setUpdateModalShow(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/getProducts");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Item[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const deleteProduct = async (id: number) => {
    const url = "http://127.0.0.1:8000/deleteProduct/";
    const product_id = {
      "id" : id
    }
    try {
      var csrf = Cookies.get('csrftoken')
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf?csrf:"",
        },
        body: JSON.stringify(product_id),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }



  return (
    <div style={{color:'black'}}>
        <MyNavbar />
        
        <h2>Update Products</h2>

        <Container className="m-4">
          <Row style={{flexDirection:'row'}}>
            <Col sm={10}>
              <h4>Products List</h4>
            </Col>
            <Col sm={2}>
              <button onClick={handleNewModalShow} className="btn" style={{background:'transparent',border:"1px solid black", padding:'5px', color:'black'}}>New +</button>
            </Col>
          </Row>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Company</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index)=>(
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.company}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.description}</td>
                  <td><button className="btn" onClick={(e)=>handleUpdateModalShow(product)}>Edit</button></td>
                  <td><button className="btn" onClick={()=>deleteProduct(product.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </Table>
          {products.length ==0&&(
              <h4>Add New Products
                <button onClick={handleNewModalShow} className="btn" style={{background:'transparent',border:"1px solid black", padding:'5px', color:'black'}}>New +</button>
              </h4>
            )}
        </Container>
        <Modal style={{color:'black'}} show={newModalShow} onHide={handleNewModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form onSubmit={handleNewFormSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newFormData.name}
                    onChange={handleNewFormChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formCompany">
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    value={newFormData.company}
                    onChange={handleNewFormChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={newFormData.price}
                    onChange={handleNewFormChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formQuantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="text"
                    name="quantity"
                    value={newFormData.quantity}
                    onChange={handleNewFormChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={newFormData.description}
                    onChange={handleNewFormChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Container>
          </Modal.Body>
        </Modal>

        <Modal style={{color:'black'}} show={updateModalShow} onHide={handleUpdateModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form onSubmit={(e) =>handleUpdateFormSubmit(e)}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={updateFormData.name}
                    onChange={handleUpdateFormChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formCompany">
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    value={updateFormData.company}
                    onChange={handleUpdateFormChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={updateFormData.price}
                    onChange={handleUpdateFormChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formQuantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="text"
                    name="quantity"
                    value={updateFormData.quantity}
                    onChange={handleUpdateFormChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={updateFormData.description}
                    onChange={handleUpdateFormChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Container>
          </Modal.Body>
        </Modal>
    </div>
  );
};

export default Crud;
