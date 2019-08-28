const initState = {
    usersProfile:{},
    isLoading:false,
    isRejected:false,
    isFullfilled:false
}

const users = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFullfilled:false
            }
        case 'LOGIN_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true
            }
        case 'LOGIN_FULLFILLED':
            return{
                ...state,
                isLoading:false,
                isFullfilled:true,
                token: action.payload.data.token
            }
        case 'REGISTER_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFullfilled:false
            }
        case 'REGISTER_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true
            }
        case 'REGISTER_FULLFILLED':
            return{
                ...state,
                isLoading:false,
                isFullfilled:true
            }
        case 'GET_PROFILE_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFullfilled:false
            }
        case 'GET_PROFILE_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true
            }
        case 'GET_PROFILE_FULLFILLED':
            return{
                ...state,
                isLoading:false,
                isFullfilled:true,
                usersProfile: action.payload.data.data
            }
        default:
            return state
    }
}

export default users