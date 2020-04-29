import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})

//全局自定义指令
// import directives from './directives/index'
//使用方法v-drag="draggreet"
//某些时候需要可拖动和不可拖动之间切换，使用下面的方法：
//定义一个变量 needDrag
//v-drag:[needDrag]="draggreet"  改变needDrag的值为true或false即可
// Vue.directive('zdrag',
// );