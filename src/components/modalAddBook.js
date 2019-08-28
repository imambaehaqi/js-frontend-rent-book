import React,{Fragment} from 'react'
import {Row, Col, Form, Button, Modal} from 'react-bootstrap'
import {connect} from 'react-redux'

import {addBook} from '../publics/actions/books'
import {getGenres} from '../publics/actions/genres'

class AddBookForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            genreList:[],
            formData:{
                title: '',
                description:'',
                image:'',
                released:'',
                genreid:''
            },
            showModal:false,
            modalTitle:"",
            modalMessage:"",
            history:props.history
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose  = this.handleClose.bind(this)
    }

    handleClose = () => {
        this.setState({showModal: false})
    }

    handleChange(event){
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

    handleSubmit = async (event) => {
        await this.props.dispatch(addBook(this.state.formData))
        console.log(this.props.book)
        this.setState({
            showModal: true,
            modalTitle:"Success",
            modalMessage:"Success Attachment Book"
        })
        event.preventDefault()
    }

    componentDidMount = async () => {
        await this.props.dispatch(getGenres())
        this.setState ({genreList: this.props.genre.genresList})
    }

  render(){
    const {genreList} = this.state
    return (
        <Fragment>
            <Form onSubmit={this.handleSubmit}>
            <Form.Group as={Row} controlId="formPlaintextTitle">
                <Form.Label column sm="2">
                    Title
                </Form.Label>
                <Col sm="10">
                <Form.Control onChange={this.handleChange} type="text" name="title" placeholder="Title..." />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextDescription">
                <Form.Label column sm="2">
                    Description
                </Form.Label>
                <Col sm="10">
                <Form.Control onChange={this.handleChange} type="text" name="description" placeholder="Description..." />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextImageURL">
                <Form.Label column sm="2">
                    Image URL
                </Form.Label>
                <Col sm="10">
                <Form.Control onChange={this.handleChange} type="text" name="image" placeholder="Image URL..." />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextDateReleased">
                <Form.Label column sm="2">
                    Date Released
                </Form.Label>
                <Col sm="10">
                <Form.Control onChange={this.handleChange} name="released" type="date" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextGenre">
                <Form.Label column sm="2">Genre</Form.Label>
                <Col sm="10">
                <Form.Control onChange={this.handleChange} as="select" name="genreid">
                    {genreList.length !== 0 ? genreList.map((genres) => {
                    return <option value={genres.genreid} key={genres.genreid}> {genres.name} </option>
                    })
                    :<option>Loading...</option>
                }
                </Form.Control>
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
    genres: state.genres
  }
}

export default connect(mapStateToProps)(AddBookForm)
