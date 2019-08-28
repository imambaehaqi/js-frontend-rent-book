import { statement } from "@babel/template";

const initState = {
    booksList:[],
    publishList:[],
    popularBooksList:[],
    isLoading: false,
    isRejected: false,
    isFullfilled: false
}

const books = (state = initState, action) => {
    switch(action.type){
        case 'GET_BOOKS_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFullfilled:false
            }
        case 'GET_BOOKS_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true
            }
        case 'GET_BOOKS_FULLFILLED':
            return{
                ...state,
                isLoading: false,
                isFullfilled: true,
                booksList: action.payload.data.data
            }
        case 'ADD_BOOKS_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFullfilled:false
            }
        case 'ADD_BOOKS_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected: true
            }
        case 'ADD_BOOKS_FULLFILLED':
            return{
                ...state,
                isLoading:false,
                isFullfilled:true,
                booksList: state.booksList.push(action.payload.data.data)
            }
        case 'EDIT_BOOKS_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFullfilled:false
            }
        case 'EDIT_BOOKS_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true
            }
        case 'EDIT_BOOKS_FULLFILLED':
            const newBookData = action.payload.data.data
            return{
                ...state,
                isLoading:false,
                isFullfilled:true,
                booksList: state.booksList.map((books) => {
                    return books.bookid == newBookData.bookid ? newBookData : books
                })
            }
        case 'DELETE_BOOKS_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFullfilled:false
            }
        case 'DELETE_BOOKS_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true
            }
        case 'DELETE_BOOKS_FULLFILLED':
            return{
                ...state,
                isLoading:false,
                isFullfilled:true,
                booksList: state.booksList.filter((books) => {
                    return books.bookid != action.payload.data.data.bookid
                })
            }
        case 'GET_BOOK_PUBLISH_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFullfilled:false,
            }
        case 'GET_BOOK_PUBLISH_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
            }
        case 'GET_BOOK_PUBLISH_FULLFILLED':
            return{
                ...state,
                isLoading:false,
                isFullfilled:true,
                publishList: action.payload.data.data
            }
        case 'GET_POPULAR_BOOKS_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFullfilled:false
            }
        case 'GET_POPULAR_BOOKS_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true
            }
        case 'GET_POPULAR_BOOKS_FULLFILLED':
            return{
                ...state,
                isLoading:false,
                isFullfilled:true,
                popularBooksList: action.payload.data.data
            }
        default:
            return state
    }
}

export default books