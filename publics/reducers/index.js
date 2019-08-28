import {combineReducers} from 'redux'

import books from './books'
import genres from './genres'
import users from './users'
import borrows from './borrows'

const rootReducers = combineReducers({
    borrows,
    users,
    genres,
    books
})

export default rootReducers