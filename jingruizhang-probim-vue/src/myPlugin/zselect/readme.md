### how to use
#### install package
1. npm i --save jingruizhang-probim-vue

#### import package and register component
```
import zprobimvue from 'jingruizhang-probim-vue'
~~Vue.component('zselect-function', zprobimvue.zselectFunction);~~
Vue.use(zprobimvue)
```

#### use component like this
```
     <zselect-function
    :init_items="[{value:'a', text:'b'}]"
    :init_width="'164px'"
    :init_height="undefined"
    :init_listzindex="undefined"
    :init_iconclass="'icon-cc1'"
    :debugmode="true"
    placeholder="请选择"
    ></zselect-function>
```
```
export default {
  name: 'app',
  data () {
    return {
      inititems:[
        {
          value:'1',
          text:'text_1',
          iconclass:'icon-test'
        },
    ...
```