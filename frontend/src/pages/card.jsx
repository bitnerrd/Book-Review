import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";

const YourComponent = () => {
  return (
    <Container className="py-3">
      {/* Card Start */}
      <Card>
        <Row>
          <Col md={7} className="px-3">
            <Card.Body className="px-6">
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>by: {book.author}, Published on: {book.publishYear}, Edition: {book.edition}, Price: ${book.price} </Card.Text>
              <Card.Text>
                Made for usage, commonly searched for. Fork, like and use it.
                Just move the carousel div above the col containing the text for
                left alignment of images
              </Card.Text>
              <div className="book-buttons">
                    <Button onClick={() => editBook(index)}>Edit Book</Button>
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
      {/* End of card */}
    </Container>
  );
};

export default YourComponent;


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