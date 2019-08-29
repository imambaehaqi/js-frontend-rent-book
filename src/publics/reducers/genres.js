const initState = {
    genreList:[],
    errMessage:'',
    message:'',
    isLoading:false,
    isRejected:false,
    isFulfilled:false
}

const genres = (state = initState, action) => {
    switch(action.type){
        case 'GET_GENRES_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'GET_GENRES_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
                errMessage:action.payload.response.data.message
            }
        case 'GET_GENRES_FULFILLED':
            return{
                ...state,
                isLoading:false,
                isFulfilled:true,
                genreList: action.payload.data.data
            }
        case 'ADD_GENRES_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'ADD_GENRES_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
                errMessage:action.payload.response.data.message
            }
        case 'ADD_GENRES_FULFILLED':
            return{
                ...state,
                isLoading:false,
                isFulfilled:true,
                genreList: state.genreList.push(action.payload.data.data)
            }
        case 'EDIT_GENRES_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'EDIT_GENRES_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
                errMessage:action.payload.response.data.message
            }
        case 'EDIT_GENRES_FULFILLED':
            const newGenreData = action.payload.data.data
            return{
                ...state,
                isLoading:false,
                isFulfilled:true,
                genreList: state.genreList.map((genres) => {
                    return genres.genreid === newGenreData.genreid ? newGenreData : genres
                })
            }
        case 'DELETE_GENRES_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'DELETE_GENRES_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
                errMessage:action.payload.response.data.message
            }
        case 'DELETE_GENRES_FULFILLED':
            return{
                ...state,
                isLoading:false,
                isFulfilled:true,
                genreList: state.genreList.filter((genres) => {
                    return genres.genreid !== action.payload.data.data.genreid
                })
            }
        default:
            return state
    }
}

export default genres