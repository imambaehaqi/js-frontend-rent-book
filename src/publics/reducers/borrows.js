const initState = {
    borrowsData:{},
    errMessage:'',
    message:'',
    isLoading:false,
    isRejected:false,
    isFulfilled:false
}

const borrows = (state = initState, action) => {
    switch(action.type){
        case 'BORROWS_BOOKS_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'BORROWS_BOOKS_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
                errMessage:action.payload.response.data.message
            }
        case 'BORROWS_BOOKS_FULFILLED':
            return{
                ...state,
                isLoading:false,
                isFulfilled:true,
                borrowsData: action.payload.data.data
            }
        case 'RETURN_BOOKS_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'RETURN_BOOKS_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
                errMessage:action.payload.response.data.message
            }
        case 'RETURN_BOOKS_FULFILLED':
            return{
                ...state,
                isLoading:false,
                isFulfilled:true,
                borrowsData: action.payload.data.data
            }
        case 'GET_LATEST_BOOKS_BORROW_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'GET_LATEST_BOOKS_BORROW_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
                errMessage:action.payload.response.data.message
            }
        case 'GET_LATEST_BOOKS_BORROW_FULFILLED':
            return{
                ...state,
                isLoading:false,
                isFulfilled:true,
                borrowsData: action.payload.data.data
            }
        default:
            return state
    }
}

export default borrows