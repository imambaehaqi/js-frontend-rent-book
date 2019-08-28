import Axios from 'axios'

module.exports = {
    login: (data) => {
        return{
            type: 'LOGIN',
            payload: Axios.post('http://localhost:1150/users/login', data)
        }
    },
    register: (data) => {
        return{
            type: 'REGISTER',
            payload: Axios.post('http://localhost:1150/users/register', data)
        }
    },
    getProfile: () => {
        return{
            type: 'GET_PROFILE',
            payload: Axios.get('http://localhost:1150/users/profile', {
                headers:{
                    Authorization: window.localStorage.getItem('token')
                }
            })
        }
    }
}