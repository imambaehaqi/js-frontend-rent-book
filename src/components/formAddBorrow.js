import React,{Fragment} from 'react';
import {Row, Col, Form, Button, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';

import {borrowBook} from '../publics/actions/borrows';

class FormEditBook extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      formData:{
        user_id: undefined,
        book_id: props.bookId
      },
      showModal:false,
      modalTitle:"",
      modalMessage:"",
      history:props.history,
    }
  }

  handleClose = ()=>{
    this.setState({showModal: false})
    this.props.closeModal()
  }

  handleChange = (event) => {
    let newFormData = {...this.state.formData}
    const target = event.target
    const name = target.name
    const value = target.value
    newFormData[name] = value
    this.setState({
      formData: newFormData
    })
    console.log(this.state.formData)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(borrowBook(this.state.formData))
      .then(()=>{
        this.setState({
          showModal: true,
          modalTitle:"Success",
          modalMessage:"Success Borrowing Book",
        })
      })
      .catch(() => {
        this.setState({
          showModal:true,
          modalTitle:"Failed",
          modalMessage:this.props.borrows.errMessage
        })
      })
  }
  render(){
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="formPlaintextUserId">
            <Form.Label column sm="2">
              User ID
            </Form.Label>
            <Col sm="10">
              <Form.Control onChange={this.handleChange} type="text" name="user_id" placeholder="User ID..." />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextBookId">
            <Form.Label column sm="2">
            Book ID
            </Form.Label>
            <Col sm="10">
              <Form.Control onChange={this.handleChange} value={this.props.bookId} type="text" name="book_id" placeholder="Book ID..." />
            </Col>
          </Form.Group>

          <Button style={{float:"right"}} variant="warning" type="submit" className="btn-black">
            Save
          </Button>
        </Form>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>{this.state.modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.modalMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return{
    books: state.books,
    genres: state.genres,
    borrows: state.borrows
  }
}
export default connect(mapStateToProps)(FormEditBook)