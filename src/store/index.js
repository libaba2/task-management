import { createStore } from 'redux'
import { reducer } from './actions'
const store = createStore(reducer)

store.subscribe(()=>{
    console.log('subscribe ', store.getState());
})

export default store