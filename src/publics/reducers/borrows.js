const initState = {
    borrowsData:{},
    isLoading:false,
    isRejected:false,
    isFullfilled:false
}

const borrows = (state = initState, action) => {
    switch(action.type){
        case 'BORROWS_BOOKS_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFullfilled:false
            }
        case 'BORROWS_BOOKS_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true
            }
        case 'BORROWS_BOOKS_FULLFILLED':
            return{
                ...state,
                isLoading:false,
                isFullfilled:true,
                borrowsData: action.payload.data.data
            }
        case 'RETURN_BOOKS_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFullfilled:false
            }
        case 'RETURN_BOOKS_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true
            }
        case 'RETURN_BOOKS_FULLFILLED':
            return{
                ...state,
                isLoading:false,
                isFullfilled:true,
                borrowsData: action.payload.data.data
            }
        case 'GET_LATEST_BOOKS_BORROW_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFullfilled:false
            }
        case 'GET_LATEST_BOOKS_BORROW_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true
            }
        case 'GET_LATEST_BOOKS_BORROW_FULLFILLED':
            return{
                ...state,
                isLoading:false,
                isFullfilled:true,
                borrowsData: action.payload.data.data
            }
        default:
            return state
    }
}

export default borrows