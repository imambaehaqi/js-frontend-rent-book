import Axios from 'axios'


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
                Authorization: window.localStorage.getItem('token')
            }
        })
    }
}

export const addBook = (data) => {
    return {
        type: 'ADD_BOOK',
        payload: Axios.post('http://localhost:1150/books', data, {
            headers:{
                Authorization: window.localStorage.getItem('token')
            }
        })
    }
}

export const deleteBook = (bookid) => {
    return {
        type: 'DELETE_BOOK',
        payload: Axios.delete(`http://localhost:1150/books/${bookid}`,{
            headers:{
                Authorization: window.localStorage.getItem('token')
            }
        })
    }
}

export const editBook = (bookid, data) => {
    return{
        type: 'EDIT_BOOK',
        payload: Axios.patch(`http://localhost:1150/books/${bookid}`, data,{
            headers:{
                Authorization: window.localStorage.getItem('token')
            }
        })
    }
}

export const getBookPublish = () =>{
    return{
        type: 'GET_BOOKS_PUBLISH',
        payload: Axios.get('http://localhost:1150/books/publish/',{
            headers:{
                Authorization: window.localStorage.getItem('token')
            }
        })
    }
}

export const getBookPopular = () =>{
    return{
        type: 'GET_POPULAR_BOOKS',
        payload: Axios.get('http://localhost:1150/books/available',{
            headers:{
                Authorization: window.localStorage.getItem('token')
            }
        })
    }
}
