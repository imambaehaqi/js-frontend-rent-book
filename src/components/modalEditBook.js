import React, {Fragment} from 'react'
import {Modal, Button} from 'react-bootstrap'
import FormEditBook from './formEditBook'

class ModalEditBook extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showModal: false,
    }
  }
  render(){
    return(
      <Fragment>
        <Button 
          variant={this.props.variant || "warning"} 
          onClick={() => {this.setState({showModal:true})}}>
          Edit Book
        </Button>
        <Modal
          show={this.state.showModal}
          onHide={() => {this.setState({showModal:false})}}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Book
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormEditBook 
              closeModal={()=>{this.setState({showModal:false})}} 
              history={this.props.history}
              bookId={this.props.bookid}
              bookData= {this.props.bookData}
              />
          </Modal.Body>
        </Modal>
      </Fragment>
    )
  }
}

export default ModalEditBook