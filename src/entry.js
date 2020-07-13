
import FlowVisualizer from './FlowVisualizer.vue'

function install(Vue) {
    if (install.installed) return
    install.installed = true
    Vue.component('flow-visualizer', FlowVisualizer)
  }
  
  const plugin = {
    install
  }
  
  let GlobalVue = null
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.vue
  }
  
  if (GlobalVue) {
    GlobalVue.use(plugin)
  }
  
  FlowVisualizer.install = install

  export default FlowVisualizer