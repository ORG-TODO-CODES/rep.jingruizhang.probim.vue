// // sumFunction 插件对应组件的名字
// import sumFunction from './sum-function';
// sumFunction.install = Vue => Vue.component(sumFunction.name, sumFunction);//注册组件
// export default sumFunction;

import sumFunction from './sum-function'
sumFunction.install = Vue => Vue.component(sumFunction.name, sumFunction);//注册组件
export default sumFunction;