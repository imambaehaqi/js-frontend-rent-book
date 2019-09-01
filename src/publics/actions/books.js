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
        payload: Axios.get(`https://calm-beach-21365.herokuapp.com/books/${id}`,{
            headers:{
                Authorization: token
            }
        })
    }
}

export const addBook = (data) => {
    return {
        type: 'ADD_BOOK',
        payload: Axios.post(`https://calm-beach-21365.herokuapp.com/books`, data, {
            headers:{
                Authorization: token
            }
        })
    }
}

export const deleteBook = (id) => {
    return {
        type: 'DELETE_BOOK',
        payload: Axios.delete(`https://calm-beach-21365.herokuapp.com/books/${id}`,{
            headers:{
                Authorization: token
            }
        })
    }
}

export const editBook = (id, data) => {
    return{
        type: 'EDIT_BOOK',
        payload: Axios.patch(`https://calm-beach-21365.herokuapp.com/books/${id}`, data, {
            headers:{
                Authorization: token
            }
        })
    }
}

export const getBookPublish = () =>{
    return{
        type: 'GET_BOOKS_PUBLISH',
        payload: Axios.get(`https://calm-beach-21365.herokuapp.com/books/publish`,{
            headers:{
                Authorization: token
            }
        })
    }
}

export const getBookPopular = () => {
    return{
        type: 'GET_POPULAR_BOOKS',
        payload: Axios.get(`https://calm-beach-21365.herokuapp.com/books/popular`,{
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