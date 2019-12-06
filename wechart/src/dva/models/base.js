export default {
  state: {},
  effect: {},
  reducers: {
    save(state, { payload }) {
      return Object.assign({}, state, payload)
    }
  }
}
