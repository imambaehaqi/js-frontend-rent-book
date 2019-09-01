import Axios from 'axios'

export const getGenres = () => {
    return {
        type: 'GET_GENRES',
        payload: Axios.get(`https://calm-beach-21365.herokuapp.com/genres`, {
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    }
}

export const addGenre = (data) => {
    return {
        type: 'ADD_GENRE',
        payload: Axios.post(`https://calm-beach-21365.herokuapp.com/genres`, data, {
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    }
}

export const deleteGenre = (id) => {
    return {
        type: 'DELETE_GENRE',
        payload: Axios.delete(`https://calm-beach-21365.herokuapp.com/genres/${id}`, {
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    }
}

export const editGenre = (id, data) => {
    return {
        type: 'EDIT_GENRE',
        payload: Axios.patch(`https://calm-beach-21365.herokuapp.com/genres/${id}`, data, {
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    }
}
