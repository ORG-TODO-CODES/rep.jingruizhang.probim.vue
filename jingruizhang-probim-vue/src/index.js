
import sumFunction from './myPlugin/sumFunction'
import zwebsocketFunction from './myPlugin/zwebsocket'
import zdialogFunction from './myPlugin/zdialog'
import zbuttonFunction from './myPlugin/zbutton'
import zselectFunction from './myPlugin/zselect'

const components = [
    sumFunction,
    zwebsocketFunction,
    zdialogFunction,
    zbuttonFunction,
    zselectFunction
];

//script标签方式映入
const install = function(Vue, opts = {}) {
    components.forEach(component => {
      Vue.component(component.name, component);
    });
  }
  
  //支持使用标签方式引入
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }
  
  
  export default {
    //总体
    install,
    //支持按需引入
    sumFunction,
    zwebsocketFunction,
    zdialogFunction,
    zbuttonFunction,
    zselectFunction
  }