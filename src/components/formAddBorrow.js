import React,{Fragment} from 'react'
import {Row, Col, Form, Button, Modal} from 'react-bootstrap'
import {connect} from 'react-redux'

import {borrowBook, getHistoryBorrow} from '../publics/actions/borrows'
import {setAvailability} from '../publics/actions/books'

class FormAddBorrow extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      formData:{
        userid: undefined,
        bookid: props.bookid
      },
      showModal:false,
      modalTitle:"",
      modalMessage:"",
      history:props.history
    }
  }

  handleClose = ()=>{
    this.props.closeModal()
    this.setState({showModal: false})
    if(this.state.modalTitle !== "Failed")
      this.props.dispatch(setAvailability(this.state.formData.bookid, 0))
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
      .then((res)=>{
        console.log(res)
        const borrowed_at = res.value.data.data.borrowed_at
        const borrowingDate = new Date(borrowed_at)
        let expirationDate = new Date()
        expirationDate.setTime(borrowingDate.getTime() + (1000*60*60*24*7))
        this.props.dispatch(getHistoryBorrow())
        this.setState({
          showModal: true,
          modalTitle:"Success",
          modalMessage:`Success Borrowing Book! Please return it before ${expirationDate.toDateString()}`,
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
              <Form.Control onChange={this.handleChange} type="text" name="userid" placeholder="User ID..." />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextBookId">
            <Form.Label column sm="2">
            Book ID
            </Form.Label>
            <Col sm="10">
              <Form.Control onChange={this.handleChange} value={this.props.bookId} type="text" name="bookid" placeholder="Book ID..." />
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
    )
  }
}

const mapStateToProps = state => {
  return{
    books: state.books,
    genres: state.genres,
    borrows: state.borrows
  }
}

export default connect(mapStateToProps)(FormAddBorrow)
