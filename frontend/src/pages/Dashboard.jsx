import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../assests/styles/dashboard.css";

const Dashboard = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const addOrUpdateBook = () => {
    if (isEditMode) {
      const updatedBooks = [...books];
      updatedBooks[selectedBookIndex] = newBook;
      setBooks(updatedBooks);
    } else {
      setBooks([...books, newBook]);
    }
    resetForm();
  };

  const editBook = (index) => {
    setSelectedBookIndex(index);
    setNewBook(books[index]);
    setIsEditMode(true);
    setShowModal(true);
  };

  const deleteBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

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
            <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card">
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
              </div>
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
