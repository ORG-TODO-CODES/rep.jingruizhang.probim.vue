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
Vue.directive('zdrag',function (el, binding) {
  let op = el;  //当前元素
  let self = this; //上下文
  op.onmousedown = function (e) {

    //鼠标按下，计算当前元素距离可视区的距离
    let disX = e.clientX - op.offsetLeft;
    let disY = e.clientY - op.offsetTop;
    document.onmousemove = function (e) {
      if (binding.arg != false) {
        //通过事件委托，计算移动的距离
        let l = e.clientX - disX;
        let t = e.clientY - disY;
        //移动当前元素
        op.style.left = l + 'px';
        op.style.top = t + 'px';
        //将此时的位置传出去
        binding.value({x:e.pageX,y:e.pageY})
      }
    };
    document.onmouseup = function (e) {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
}
);