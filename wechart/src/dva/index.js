import { create } from 'dva-core'
import createLoading from 'dva-loading'

export default class CreatApp {
  constructor(option) {
    this.option = option
    console.log(option)
    this.app = null
    this.initDva()
  }
  initDva() {
    let { app, option } = this
    app = create(option)
    app.use(createLoading({}))
    option.models.forEach(model => app.model(model))
    app.start()
    this.app = app
  }
  getStore() {
    return this.app._store
  }
  getDispatch() {
    return this.app._store.dispatch
  }
}
