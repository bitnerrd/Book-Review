import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Container,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import "../assests/styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    publishYear: "",
    edition: "",
    price: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBookIndex, setSelectedBookIndex] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("authorization");
        if (!token) {
          navigate("/user/login");
          toast.error("Login to access the resource!");
        } else {
          const response = await fetch("http://localhost:3003/book/all", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          if (data.status === true && data.data) {
            setBooks(data.data);
          } else if (data.status === false) {
            navigate("/user/login");
            toast.error(data.message);
          }
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const addOrUpdateBook = async () => {
    try {
      const token = localStorage.getItem("authorization");
      if (!token) {
        toast.error("Authorization Failed");
        navigate("/user/login");
      }
      const response = await fetch("http://localhost:3003/book/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBook),
      });

      const data = await response.json();

      if (response.status === 201) {
        setBooks([...books, newBook]);
        toast.success(data.message);
        resetForm();
      } else {
        toast.error(data.message || "Error adding book!");
      }
    } catch (error) {
      console.error("Error adding/updating book:", error);
      toast.error("Error adding/updating book!");
    }
  };

  const editBook = () => {};

  const deleteBook = (index) => {};

  const resetForm = () => {
    setNewBook({
      title: "",
      author: "",
      publishYear: "",
      edition: "",
      price: "",
    });
    setShowModal(false);
    setIsEditMode(false);
    setSelectedBookIndex(null);
  };

  return (
    <div>
      <Button onClick={() => setShowModal(true)} className="add-book">
        <i class="fa-solid fa-plus"></i> Add Book
      </Button>
      <div className="container-fluid mt-3">
        <div className="row">
          {books.map((book, index) => (
            <div key={index} className="py-3">
              {/* <div className="card">
                <div
                  className="card-body"
                  style={{ backgroundColor: "#F4F5FF" }}
                >
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">By: {book.author}</p>
                  <p className="card-text">Published on: {book.publishYear}</p>
                  <p className="card-text">Edition: {book.edition}</p>
                  <p className="card-text">Price: ${book.price}</p>
                  <div className="book-buttons">
                    <Button onClick={() => editBook(index)}>Edit Book</Button>
                    <Button
                      onClick={() => deleteBook(index)}
                      className="btn btn-danger"
                    >
                      Delete Book
                    </Button>
                  </div>
                </div>
              </div> */}
              <Card>
                <Row>
                  <Col md={7} className="px-3">
                    <Card.Body className="px-6">
                      <Card.Title>{book.title}</Card.Title>
                      <Card.Text>
                        by: {book.author}, Published on: {book.publishYear},
                        Edition: {book.edition}, Price: ${book.price}{" "}
                      </Card.Text>
                      <Card.Text>
                        Made for usage, commonly searched for. Fork, like and
                        use it. Just move the carousel div above the col
                        containing the text for left alignment of images
                      </Card.Text>
                      <div className="book-buttons">
                        <Button onClick={() => editBook(index)}>
                          Edit Book
                        </Button>
                        <Button
                          onClick={() => deleteBook(index)}
                          className="btn btn-danger"
                        >
                          Delete Book
                        </Button>
                      </div>
                    </Card.Body>
                  </Col>
                  <Col md={5}>
                    <Card.Img
                      variant="top"
                      src="https://picsum.photos/450/300?image=1072"
                    />
                  </Col>
                </Row>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Modal show={showModal} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit Book" : "Add Book"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newBook.title}
                onChange={handleInputChange}
                placeholder="Enter title"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={newBook.author}
                onChange={handleInputChange}
                placeholder="Enter author"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Publish Year</Form.Label>
              <Form.Control
                type="text"
                name="publishYear"
                value={newBook.publishYear}
                onChange={handleInputChange}
                placeholder="Enter publish year"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Edition</Form.Label>
              <Form.Control
                type="text"
                name="edition"
                value={newBook.edition}
                onChange={handleInputChange}
                placeholder="Enter edition"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={newBook.price}
                onChange={handleInputChange}
                placeholder="Enter price"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetForm}>
            Close
          </Button>
          <Button variant="primary" onClick={addOrUpdateBook}>
            {isEditMode ? "Save Changes" : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
