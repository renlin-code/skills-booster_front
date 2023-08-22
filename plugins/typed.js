import Vue from 'vue'
import Typed from 'typed.js'

Vue.use({
  install(Vue) {
    Vue.prototype.$typed = Typed
  }
})
