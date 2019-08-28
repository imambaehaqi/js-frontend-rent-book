const initState = {
    genreList:[],
    isLoading:false,
    isRejected:false,
    isFullfilled:false
}

const genres = (state = initState, action) => {
    switch(action.type){
        case 'GET_GENRES_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFullfilled:false
            }
        case 'GET_GENRES_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true
            }
        case 'GET_GENRES_FULLFILLED':
            return{
                ...state,
                isLoading:false,
                isFullfilled:true,
                genreList: action.payload.data.data
            }
        case 'ADD_GENRES_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFullfilled:false
            }
        case 'ADD_GENRES_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true
            }
        case 'ADD_GENRES_FULLFILLED':
            return{
                ...state,
                isLoading:false,
                isFullfilled:true,
                genreList: state.genreList.push(action.payload.data.data)
            }
        case 'EDIT_GENRES_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFullfilled:false
            }
        case 'EDIT_GENRES_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true
            }
        case 'EDIT_GENRES_FULLFILLED':
            return{
                ...state,
                isLoading:false,
                isFullfilled:true,
                genreList: state.genreList.map((genres) => {
                    return genres.genreid == newGenreData.genreid ? newGenreData : genres
                })
            }
        case 'DELETE_GENRES_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFullfilled:false
            }
        case 'DELETE_GENRES_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true
            }
        case 'DELETE_GENRES_FULLFILLED':
            return{
                ...state,
                isLoading:false,
                isFullfilled:true,
                genreList: state.genreList.filter((genres) => {
                    return genres.genreid != action.payload.data.data.genreid
                })
            }
        default:
            return state
    }
}

export default genres