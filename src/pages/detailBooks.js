import React, { Component } from 'react'
import Axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import Background from '../libpict.svg'

import ModalEdit from '../components/modalEditForm'

class detailBooks extends Component {
  // constructor(props){
  //     super(props)
  //     this.state= {
  //         bookUrl:props.bookUrl,
  //         bookData:undefined,
  //         userData:{
  //         level:'regular',
  //         id:undefined,
  //         },
  //         borrowedBy:0,
  //         showModal:false,
  //         modalTitle:"",
  //         modalMessage:"",
  //     }
  //     this.handleDelete=this.handleDelete.bind(this);
  //     this.handleBorrow=this.handleBorrow.bind(this);
  //     this.handleClose=this.handleClose.bind(this);
  // }

  // // componentDidMount(){
  // //     if(!document.cookie.includes('token'))
  // //         window.location.replace("http://localhost:3000/")

  // //     Axios.get(this.state.bookUrl)
  // //         .then(result => {
  // //         console.log(result.data.data)
  // //         const bookData = result.data.data !== null? result.data.data[0]:null
  // //         this.setState({bookData:bookData})
  // //         return Axios.get(`http://localhost:1150/borrows/book/${bookData.id}`,{
  // //             headers:{
  // //             Authorization : document.cookie.split("=")[1],
  // //             }
  // //         })
  // //     })
  // //     .then(res=> this.setState({
  // //         borrowedBy: res.data.data[0].user_id
  // //     }))
  // //     .catch(err => console.log(err))

  // //     Axios.get("http://localhost:3030/users/profile",{
  // //         headers:{
  // //         Authorization : document.cookie.split("=")[1],
  // //         }
  // //     })
  // //     .then(res => {
  // //         const userData=res.data.data;
  // //         console.log("userdata", userData)
  // //         this.setState({
  // //             userData:userData,
  // //         })
  // //     })
  // //     .catch(err => console.log(err))
  // // }

  // // handleDelete(event){
  // //     Axios.delete(`http://localhost:3030/books/${this.state.bookData.id}`,{
  // //         headers:{
  // //         Authorization : document.cookie.split("=")[1],
  // //         }
  // //     })
  // //     .then(res => {
  // //         this.setState({
  // //             showModal:true,
  // //             modalTitle:"Success",
  // //             modalMessage:res.data.message,
  // //         })
  // //     })
  // //     .catch(err => console.log(err))
  // // }

  // // handleBorrow(event){
  // //     const target= event.target
  // //     const action = target.innerHTML
  // //     const data = {
  // //         book_id:this.state.bookData.id,
  // //         user_id:this.state.userData.id,
  // //     }
  // //     if(action === "Borrow"){
  // //         Axios.post(`http://localhost:3030/borrowings/`,data,{
  // //             headers:{
  // //                 Authorization : document.cookie.split("=")[1],
  // //             }
  // //         })
  // //         .then(res => {
  // //             this.setState({
  // //             showModal:true,
  // //             modalTitle:"Success",
  // //             modalMessage:res.data.message,
  // //             })
  // //         })
  // //         .catch(err => console.log(err))
  // //     }else if(action === "Return"){
  // //         Axios.patch(`http://localhost:3030/borrowings/`,data,{
  // //             headers:{
  // //                 Authorization : document.cookie.split("=")[1],
  // //             }
  // //         })
  // //         .then(res => {
  // //             this.setState({
  // //             showModal:true,
  // //             modalTitle:"Success",
  // //             modalMessage:res.data.message,
  // //             })
  // //         })
  // //         .catch(err => console.log(err))
  // //     }
  // // }

  // // handleClose = ()=>{
  // //     this.setState({showModal: false})
  // //     window.location.reload()
  // // }

  render () {
    return (
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12 p-0'>
              <div className='bg-header' style={{ backgroundImage: `url(${Background})` }}>
                <div className='col-8 col-sm-6 p-3'>
                  <button type='button' class='btn btn-warning' aria-hidden='true'>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                </div>
                <div className='d-flex align-items-end flex-column bd-highlight mb-3' style={{ height: '200px' }}>
                  <div className='p-2 bd-highlight' style={{ marginTop: '-60px' }}>
                    {/* <ModalEdit /> */}
                    <a>&nbsp;</a>
                    <button type='button' class='btn btn-warning' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div class='d-flex bd-highlight'>
            <div class='p-2 w-100 bd-highlight'>
              <div class='row'>
                <div className='col-sm-8 mb-12 p-2'>
                  <a class='rounded' style={{ backgroundColor: '#ffcc00' }}>&nbsp;Categories&nbsp;</a>
                </div>
                <div className='col-sm-0 mb-0 p-0 bd-highlight' style={{ marginLeft: '100vh' }}>
                  <font color='green'><h2>Available</h2></font>
                </div>
              </div>
              <div className='d-flex align-items-start flex-column bd-highlight mb-3'>
                <div class='p-0 bd-highlight'>
                  <font>
                    <h1>Judul Buku</h1>
                  </font>
                </div>
                <div class='p-0 mb-3 bd-highlight'>
                  <font>
                    <h3>
                      <b>Publish Buku</b>
                    </h3>
                  </font>
                </div>
                <div class='p-0 bd-highlight'>Detail Buku</div>
              </div>
            </div>
            <div class='row align-items-start' style={{ marginLeft: '20vh' }}>
              <div class='row justify-content-start'>
                <div class='col-6 col-md-4'>
                  <img className='bocil' src={require('../libpict.svg')} />
                </div>
              </div>
              <div class='row justify-content-end'>
                <div class='col-4 col-md-8'>
                  <button type='button' class='btn btn-warning'>
                    <h4>Borrow</h4>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default detailBooks
