export const state = () => ({
  scrollFixed: false
})

export const mutations = {
  setScrollFixedValue(state, value) {
    state.scrollFixed = value;
  },
}

export const getters = {
  getScrollFixedValue: state => {
    return state.scrollFixed;
  }
}
