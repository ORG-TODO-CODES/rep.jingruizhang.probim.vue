<template>
  <div id="app">

    <!-- 测试对话框组件 -->
    <zdialog-function
      :init_title="'对话框标题'"
      :init_zindex="2"
      :init_innerWidth="undefined"
      :debugmode="true"
      @onclose=""
    >
      <!-- 主体部分内容 -->
      <div slot="mainslot">
        abc
        <br />
        <br />

        <!-- 下拉框 -->
        <zselect-function
        :init_items="inititems"
        :init_width="'100%'"
        :init_height="undefined"
        :init_listzindex="undefined"
        :init_iconclass="'icon-cc1'"
        placeholder="请选择"
        :debugmode="true"
        ></zselect-function>
        <!-- //下拉框 -->

        <br />
        <br />
        <br />
        <br />
      </div>
      <!-- //主体部分内容 -->

      <!-- 按钮部分 -->
      <div slot="buttonslot">
        <zbutton-function
          :init_text="'确定'"
          :init_fontsize="14"
          :debugmode="true"
          @onclick=""
          >
        </zbutton-function>
      </div>
      <!-- //按钮部分 -->

    </zdialog-function>
    <!-- //测试对话框组件 -->
   
  </div>
</template>

<script>
import sumFunction from './myPlugin/sumFunction/sum-function'; // 引入
import zdialogFunction from './myPlugin/zdialog/zdialog-function';
import zbuttonFunction from './myPlugin/zbutton/zbutton-function';
import zselectFunction from './myPlugin/zselect/zselect-function';
export default {
  name: 'app',
  data () {
    return {
      num1: 4,
      num2: 5,
      sumFromChild:0,
      inititems:[
        {
          value:'1',
          text:'text_1',
          iconclass:'icon-test'
        },
        {
          value:'2',
          text:'text_2',
          iconclass:'icon-test2'
        },
         {
          value:'3',
          text:'text_3',
          iconclass:'icon-test2'
        },
         {
          value:'4',
          text:'text_4',
          iconclass:'icon-test2'
        },
         {
          value:'5',
          text:'text_5',
          iconclass:'icon-test2'
        }
      ]
    }
  },
  components:{ //注册插件
    sumFunction,
    zdialogFunction,
    zbuttonFunction,
    zselectFunction
  },
  methods:{
    receiveChildSum(sum){ //自定义事件，接收子组件的和
      this.sumFromChild = sum;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>