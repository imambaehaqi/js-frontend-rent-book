import Axios from 'axios'

module.exports = {
    borrows: (data) => {
        return{
            type: 'BORROWS_BOOKS',
            payload: Axios.post('http://localhost:1150/borrows', data,{
                headers:{
                    Authorization: window.localStorage.getItem('token')
                }
            })
        }
    },
    returnBook: (data) => {
        return{
            type: 'RETURN_BOOKS',
            payload: Axios.patch('http://localhost:1150/borrows', data,{
                headers:{
                    Authorization: window.localStorage.getItem('token')
                }
            })
        }
    },
    getLatestBorrowsByBookId: (borrowid) => {
        return{
            type: 'GET_LATEST_BOOKS_BORROWS',
            payload: Axios.get(`http://localhost:1150/borrows/book/${borrowid}`,{
                headers:{
                    Authorization: window.localStorage.getItem('token')
                }
            })
        }
    }
}