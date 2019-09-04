import React, { Fragment } from 'react'
import { Modal, Button } from 'react-bootstrap'
import FormAddBook from './formAddBook'

class ModalAddBook extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  render () {
    return (
      <Fragment>
        <Button
          variant={this.props.variant || 'light'}
          style={{ width: '100%' }}
          onClick={() => { this.setState({ showModal: true }) }}>
          <b>* Add Book</b>
        </Button>
        <Modal
          show={this.state.showModal}
          onHide={() => { this.setState({ showModal: false }) }}
          size='lg'
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>
              Add Book
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormAddBook closeModal={() => { this.setState({ showModal: false }) }} history={this.props.history} />
          </Modal.Body>
        </Modal>
      </Fragment>
    )
  }
}

export default ModalAddBook
