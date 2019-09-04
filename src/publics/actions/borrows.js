import Axios from 'axios';
export const borrow = (data) => {
  return {
    type:'BORROW_BOOK',
    payload: Axios.post(`http://localhost:1708/borrows/`,data,{
        headers:{
          Authorization : window.localStorage.getItem("token")
        }
      }
    )
  }
}
export const returnBook = (data) => {
  return {
    type:'RETURN_BOOK',
    payload: Axios.patch(`http://localhost:1708/borrows/`,data,{
        headers:{
          Authorization : window.localStorage.getItem("token")
        }
      }
    )
  }
}

export const getLatestBorrowingByBookId = (id) => {
  return {
    type:'GET_LATEST_BOOK_BORROWING',
    payload: Axios.get(`http://localhost:1708/borrows/book/${id}`,{
        headers:{
          Authorization : window.localStorage.getItem("token")
        }
      }
    )
  }
}

export const getBorrowingHistory = (data) => {
  return {
    type:'GET_BORROWING_HISTORY',
    payload: Axios.get(`http://localhost:1708/borrows/history`, data,{
        headers:{
          Authorization : window.localStorage.getItem("token")
        }
      }
    )
  }
}