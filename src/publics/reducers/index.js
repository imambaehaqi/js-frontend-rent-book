import {combineReducers} from 'redux'

import book from './books'
import genre from './genres'
import user from './users'
import borrowing from './borrows'

const appReducer = combineReducers({
  borrowing,
  user,
  genre,
  book,
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer