import Axios from 'axios'

module.exports = {
    getGenres: () => {
        return {
            type: 'GET_GENRES',
            payload: Axios.get('http://localhost:1150/genres', {
                headers:{
                    Authorization: window.localStorage.getItem('token')
                }
            })
        }
    },
    addGenres: (data) => {
        return {
            type: 'ADD_GENRES',
            payload: Axios.post('http://localhost:1150/genres', data, {
                headers:{
                    Authorization: window.localStorage.getItem('token')
                }
            })
        }
    },
    deleteGenres: (genreid) => {
        return {
            type: 'DELETE_GENRES',
            payload: Axios.delete(`http://localhost:1150/genres/${genreid}`, {
                headers:{
                    Authorization: window.localStorage.getItem('token')
                }
            })
        }
    },
    editGenres: (genreid, data) => {
        return {
            type: 'EDIT_GENRES',
            payload: Axios.patch(`http://localhost:1150/genres/${genreid}`, data, {
                headers:{
                    Authorization: window.localStorage.getItem('token')
                }
            })
        }
    }
}