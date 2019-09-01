import Axios from 'axios'

export const login = (data) => {
    return{
        type: 'LOGIN',
        payload: Axios.post(`https://calm-beach-21365.herokuapp.com/users/login`, data)
    }
}

export const register = (data) => {
    return{
        type: 'REGISTER',
        payload: Axios.post(`https://calm-beach-21365.herokuapp.com/users/register`, data)
    }
}
export const getProfile = () => {
    return{
        type: 'GET_PROFILE',
        payload: Axios.get(`https://calm-beach-21365.herokuapp.com/users/profile`, {
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    }
}