const initState = {
    booksList:[],
    publishList:[],
    popularBooksList:[],
    errMessage:'',
    message:'',
    isLoading: false,
    isRejected: false,
    isFulfilled: false
}

const books = (state = initState, action) => {
    switch(action.type){
        case 'GET_BOOKS_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'GET_BOOKS_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
                errMessage: action.payload.response.data.message
            }
        case 'GET_BOOKS_FULFILLED':
            return{
                ...state,
                isLoading: false,
                isFulfilled: true,
                booksList: action.payload.data.data
            }
        case 'GET_BOOK_BY_ID_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'GET_BOOK_BY_ID_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
                errMessage: action.payload.response.data.message
            }
        case 'GET_BOOK_BY_ID_FULFILLED':
            state.booksList.push(action.payload.data.data[0])
            return{
                ...state,
                isLoading:false,
                isFulfilled:true
            }
        case 'ADD_BOOK_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'ADD_BOOK_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true 
            }
        case 'ADD_BOOK_FULFILLED':
            state.booksList.unshift(action.payload.data.data)
            return{
                ...state,
                isLoading:false,
                isFulfilled:true
            }
        case 'EDIT_BOOK_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'EDIT_BOOK_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
                errMessage: action.payload.response.data.message
            }
        case 'EDIT_BOOK_FULFILLED':
            const newBookData = action.payload.data.data[0]
            return{
                ...state,
                isLoading:false,
                isFulfilled:true,
                booksList: state.booksList.map((books) => {
                    return books.bookid === newBookData.bookid ? newBookData : books
                })
            }
        case 'DELETE_BOOKS_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'DELETE_BOOKS_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
                errMessage:action.payload.response.data.message
            }
        case 'DELETE_BOOKS_FULFILLED':
            return{
                ...state,
                isLoading:false,
                isFulfilled:true,
                booksList: state.booksList.filter((books) => {
                    return books.bookid !== action.payload.data.data.bookid
                })
            }
        case 'GET_BOOKS_PUBLISH_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'GET_BOOKS_PUBLISH_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
                errMessage:action.payload.response.data.message
            }
        case 'GET_BOOKS_PUBLISH_FULFILLED':
            return{
                ...state,
                isLoading:false,
                isFulfilled:true,
                publishList: action.payload.data.data
            }
        case 'GET_POPULAR_BOOKS_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'GET_POPULAR_BOOKS_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
                errMessage:action.payload.response.data.message
            }
        case 'GET_POPULAR_BOOKS_FULFILLED':
            return{
                ...state,
                isLoading:false,
                isFulfilled:true,
                popularBooksList: action.payload.data.data
            }
        default:
            return state
    }
}

export default books