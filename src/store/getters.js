import state from './state'

const getters = {
}

Object.keys(state).forEach(prop => {
  getters[prop] = state => state[prop]
})

export default getters
