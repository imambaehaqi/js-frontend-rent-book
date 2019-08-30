import Axios from 'axios'

export const getGenres = () => {
    return {
        type: 'GET_GENRES',
        payload: Axios.get('http://localhost:1150/genres', {
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    }
}

export const addGenre = (data) => {
    return {
        type: 'ADD_GENRE',
        payload: Axios.post('http://localhost:1150/genres', data, {
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    }
}

export const deleteGenre = (id) => {
    return {
        type: 'DELETE_GENRE',
        payload: Axios.delete(`http://localhost:1150/genres/${id}`, {
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    }
}

export const editGenre = (id, data) => {
    return {
        type: 'EDIT_GENRE',
        payload: Axios.patch(`http://localhost:1150/genres/${id}`, data, {
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    }
}
