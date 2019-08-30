import React, {Fragment} from 'react'
import {Modal, Button} from 'react-bootstrap'
import FormAddBorrow from './formAddBorrow';

class ModalAddBorrow extends React.Component{
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
          className= {this.props.className}
          variant={this.props.variant || "light"}
          size = "lg"
          onClick={() => {this.setState({showModal:true})}}>
          Borrow
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
              Form Borrow
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormAddBorrow bookId={this.props.bookId} closeModal={()=>{this.setState({showModal:false})}} history={this.props.history}/>
          </Modal.Body>
        </Modal>
      </Fragment>
    )
  }
}
export default ModalAddBorrow