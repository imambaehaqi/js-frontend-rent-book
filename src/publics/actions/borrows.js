import Axios from 'axios'

export const borrowBook = (data) => {
    return{
        type: 'BORROW_BOOK',
        payload: Axios.post('http://localhost:1150/borrows', data,{
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    }
}

export const returnBook = (data) => {
    return{
        type: 'RETURN_BOOK',
        payload: Axios.patch('http://localhost:1150/borrows', data,{
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    }
}

export const getLatestBorrowBook = (id) => {
    return{
        type: 'GET_LATEST_BOOK_BORROW',
        payload: Axios.get(`http://localhost:1150/borrows/book/${id}`,{
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    }
}

export const getHistoryBorrow = () => {
    return {
      type:'GET_BORROW_HISTORY',
      payload: Axios.get(`https://localhost:1150/borrows/history`,{
          headers:{
            Authorization : window.localStorage.getItem("token")
          }
        }
      )
    }
  }