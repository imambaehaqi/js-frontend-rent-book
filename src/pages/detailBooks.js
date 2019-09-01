import React, { Component } from 'react'
import {connect} from 'react-redux'
import {deleteBook, getBookById} from '../publics/actions/books'
import {getProfile} from '../publics/actions/users'
import {returnBook, getLatestBorrowBook} from '../publics/actions/borrows'
import store from '../publics/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {Alert, Modal, Button, Badge} from 'react-bootstrap'
import ModalEditBook from '../components/modalEditBook'
import ModalAddBorrow from '../components/modalAddBorrow'
import {Link} from 'react-router-dom'
import ModalReturnBook from '../components/modalReturnBook'
import deleteBookPrompt from '../components/deleteBookPrompt'

class detailBooks extends Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      bookUrl: props.bookUrl,
      bookData: props.books.booksList.find((books) => {return books.bookid === Number(props.bookid)}),
      userData:{},
      borrowedBy: 0,
      showModal: false,
      modalTitle:'',
      modalMessage:'',
      unsubscribe: store.subscribe(this.listener)
    }
  }

  listener = () => {
    const current = store.getState().books.booksList.find ((books) => {
      return books.bookid === Number(this.props.bookid)
    })
    console.log(current, this.state.bookData)
    if(current !== this.state.bookData){
      this.setState({bookData: current})
    }
  }

  getBookData = async () => {
    await this.props.dispatch(getBookById(this.props.bookid))
    this.setState(
      {bookData: this.props.books.booksList.find((books) => {
        return books.bookid === Number(this.props.bookid)
      })},
      async () => {
        console.log(this.state)
        await this.props.dispatch(getLatestBorrowBook(this.props.bookid))
        const borrowedBy = this.props.borrows.borrowingData ? this.props.borrows.borrowingData[0]
          .userid: 0
        this.setState({
          borrowedBy: borrowedBy
        })
      }
    )
  }

  componentDidMount = async () => {
    if(!window.localStorage.getItem("token"))
      this.props.history.push('/')

    if(!this.state.bookData){
      this.getBookData()
    }
    await this.props.dispatch(getProfile())
      this.setState({
        userData: this.props.users.usersProfile
      })
  }

  componentWillMount = () => {
    this.state.unsubscribe()
  }

  handleDelete = (event) => {
    this.props.dispatch(deleteBook(this.state.bookData.bookid))
      .then(() => {
        this.setState({
          showModal: true,
          modalTitle: "Succes",
          modalMessage: 'Succes deleting Book',
          redirectOnCloseModal: true
        })
      })
      .catch(() => {
        this.setState({
          showModal: true,
          modalTitle: 'Failed',
          modalMessage: this.props.books.errMessage
        })
      })
  }

  handleReturn = async (event) => {
    const data = {
      bookid: this.state.bookData.bookid,
      userid: this.state.userData.bookid
    }
    this.props.dispatch(returnBook(data))
      .then(() => {
        this.setState({
          showModal: true,
          modalTitle: "Success",
          modalMessage: 'Book Returned',
          borrowedBy: 0,
          bookData:{
            ...this.state.bookData,
            available: 1
          }
        })
      })
      .catch (() => {
        this.setState({
          showModal: true,
          modalTitle: 'Failed',
          modalMessage: this.props.borrows.errMessage
        })
      })
  }

  handleClose = () => {
    this.setState({showModal: false})
    if (this.state.redirectOnCloseModal)
      this.props.history.push('/')
  }

  render () {
    const {bookData} = this.state
    console.log(this.state)    

    if(bookData === undefined){
      console.log(this.state)
      return (
        <div className="container">
          <h2>Loading ....</h2>
        </div>
      )
    } else if (bookData === null){
      console.log(this.state)
      return (
        <Alert variant="danger">Book Not Found</Alert>
      )
    } else {
      let stringDateReleased = new Date (bookData.released).toDateString()
      return (
        <div>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-12 p-0'>
                <div className='bg-header' style={{ backgroundImage: `url('${bookData.image}')` }}>
                  <div className='col-8 col-sm-6 p-3'>
                    <Link to="../../home" class='btn btn-warning' style={{position:'fixed'}}>
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                  </div>
                  {this.state.userData.level === 'admin' ? 
                    <div className='d-flex align-items-end flex-column bd-highlight mb-3' style={{ height: '200px' }}>
                      <div className='p-2 bd-highlight' style={{ marginTop: '-25px' }}>
                        <ModalEditBook history={this.props.history} bookid={bookData.bookid} bookData={bookData}/>
                        <deleteBookPrompt bookData={bookData} history={this.props.history}/>
                      </div>
                    </div>
                  :''}
                </div>
              </div>
            </div>
          </div>
          <div className='container'>
            <div class='d-flex bd-highlight'>
              <div class='p-2 w-100 bd-highlight'>
                <div class='row'>
                  <div className='col-sm-8 mb-12 p-2'>
                    <Badge pill variant="warning">
                      <h6>{this.props.genres.genreList.find(genre => genre.genreid === bookData.genreid).name}</h6>
                    </Badge>
                  </div>
                  <div className='col-sm-0 mb-0 p-0 bd-highlight' style={{ marginLeft: '95vh' }}>
                    {bookData.available === 1 ? 
                      <font color='green'><h3>Available</h3></font> : 
                      <font color='red'><h3>Not Available</h3></font>}
                  </div>
                </div>
                <div className='d-flex align-items-start flex-column bd-highlight mb-3'>
                  <div class='p-0 bd-highlight'>
                    <font>
                      <h2>{bookData.title}</h2>
                    </font>
                  </div>
                  <div class='p-0 mb-3 bd-highlight'>
                    <font>
                      <h3>
                        <b>{stringDateReleased}</b>
                      </h3>
                    </font>
                  </div>
                  <div class='p-0 bd-highlight'>{bookData.description}</div>
                </div>
              </div>
              <div class='row align-items-start' style={{ marginLeft: '20vh' }}>
                <div class='row justify-content-start'>
                  <div class='col-6 col-md-4'>
                    <div className='bocil' style={{ backgroundImage: `url('${bookData.image}')`}}></div>
                  </div>
                </div>
                <div class='row justify-content-end'>
                  <div class='col-4 col-md-8'>
                    {this.state.userData.level === 'admin' ? 
                      bookData.available === 1 ?
                      <ModalAddBorrow bookid={bookData.bookid} variant="warning" />
                      :
                      <ModalReturnBook  bookid={bookData.bookid} className="borrow-button" variant="warning" readOnlyBookId={true}/>
                      :''}
                  </div>
                </div>
              </div>
              <Modal show={this.state.showModal} onHide={this.handleClose}>
                <Modal.Header>
                  <Modal.Title>{this.state.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {this.state.modalMessage}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
            </Modal>
            </div>
          </div>
        </div>
      )}
  }
}

const mapStateToProps = (state) => {
  return{
    books: state.books,
    users: state.users,
    borrows: state.borrows,
    genres: state.genres
  }
}

export default connect(mapStateToProps)(detailBooks)
