import Axios from 'axios'

export const borrowBook = (data) => {
    return{
        type: 'BORROW_BOOK',
        payload: Axios.post(`http://${process.env.REACT_APP_BACKEND_HOST}/borrows`, data,{
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    }
}

export const returnBook = (data) => {
    return{
        type: 'RETURN_BOOK',
        payload: Axios.patch(`http://${process.env.REACT_APP_BACKEND_HOST}/borrows`, data,{
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    }
}

export const getLatestBorrowBook = (id) => {
    return{
        type: 'GET_LATEST_BOOK_BORROW',
        payload: Axios.get(`http://${process.env.REACT_APP_BACKEND_HOST}/borrows/book/${id}`,{
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    }
}

export const getHistoryBorrow = () => {
    return {
      type:'GET_BORROW_HISTORY',
      payload: Axios.get(`https://${process.env.REACT_APP_BACKEND_HOST}/borrows/history`,{
          headers:{
            Authorization : window.localStorage.getItem("token")
          }
        }
      )
    }
  }