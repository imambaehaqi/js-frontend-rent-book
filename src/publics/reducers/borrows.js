import { stat } from "fs";
import { fas } from "@fortawesome/free-solid-svg-icons";

const initState = {
    borrowingData:{},
    isLoading:false,
    isRejected:false,
    isFullfilled:false
}

const borrows = (state = initState, action) => {
    switch(action.type){
        case 'BORROW_BOOK_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFullfilled:false
            }
        case 'BORROW_BOOK_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true
            }
        case 'BORROW_BOOK_FULLFILLED':
            return{
                ...state,
                isLoading:false,
                isFullfilled:true,
                borrowingData: action.payload.data.data
            }
        case 'RETURN_BOOK_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFullfilled:false
            }
        case 'RETURN_BOOK_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true
            }
        case 'RETURN_BOOK_FULLFILLED':
            return{
                ...state,
                isLoading:false,
                isFullfilled:true,
                borrowingData: action.payload.data.data
            }
        case 'GET_LATEST_BOOK_BORROW_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFullfilled:false
            }
        case 'GET_LATEST_BOOK_BORROW_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true
            }
        case 'GET_LATEST_BOOK_BORROW_FULLFILLED':
            return{
                ...state,
                isLoading:false,
                isFullfilled:true,
                borrowingData: action.payload.data.data
            }
        default:
            return state
    }
}

export default borrows