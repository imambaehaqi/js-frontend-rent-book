import Axios from 'axios'

const token = window.localStorage.getItem("token")

export const getBooks = (dataSource, page = 1, sortby, search) => {
    let url = `${dataSource}?page=${page}`
    if(sortby !== null)
        url += `&sortby = ${sortby}`
    if(search !== null)
        url += `&search = ${search}`

    return {
        type: 'GET_BOOKS',
        payload: Axios.get(url, {
            headers:{
                Authorization: token
            }
        })
    }
}

export const getBookById = (id) => {
    return {
        type: 'GET_BOOK_BY_ID',
        payload: Axios.get(`http://${process.env.REACT_APP_BACKEND_HOST}/books/${id}`,{
            headers:{
                Authorization: token
            }
        })
    }
}

export const addBook = (data) => {
    return {
        type: 'ADD_BOOK',
        payload: Axios.post(`http://${process.env.REACT_APP_BACKEND_HOST}/books`, data, {
            headers:{
                Authorization: token
            }
        })
    }
}

export const deleteBook = (id) => {
    return {
        type: 'DELETE_BOOK',
        payload: Axios.delete(`http://${process.env.REACT_APP_BACKEND_HOST}/books/${id}`,{
            headers:{
                Authorization: token
            }
        })
    }
}

export const editBook = (id, data) => {
    return{
        type: 'EDIT_BOOK',
        payload: Axios.patch(`http://${process.env.REACT_APP_BACKEND_HOST}/books/${id}`, data, {
            headers:{
                Authorization: token
            }
        })
    }
}

export const getBookPublish = () =>{
    return{
        type: 'GET_BOOKS_PUBLISH',
        payload: Axios.get(`http://${process.env.REACT_APP_BACKEND_HOST}/books/publish`,{
            headers:{
                Authorization: token
            }
        })
    }
}

export const getBookPopular = () => {
    return{
        type: 'GET_POPULAR_BOOKS',
        payload: Axios.get(`http://${process.env.REACT_APP_BACKEND_HOST}/books/popular`,{
            headers:{
                Authorization: token 
            }
        })
    }
}

export const setAvailability = (bookid,available) => {
    return {
      type:'SET_BOOK_AVAILABLE',
      payload: {bookid,available}
    }
  }