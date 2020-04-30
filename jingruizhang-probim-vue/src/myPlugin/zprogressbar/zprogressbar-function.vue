<template>
    <div data-debug="zprogressbar" class="jingruizhang-probim-vue css-zprogressbar-all"
    :style="allstyle"
    >
        <div class="jingruizhang-probim-vue css-zprogressbar-showing" 
          :style="showstyle"
        ></div>
    </div>
</template>
<script>
// ctor para
//  init_width(string, require) 
//  init_height(string,def12) 
//  init_fillcolor(string, def#1890ff), 
//  init_backcolor(string, defrgba(241, 241, 241, 1)) 
//  init_percent(Number, def0) 
//  debugmode(Boolean, deffalse)
// methods
//  getvalue()
//  setvalue(val)
export default {
    name:'zprogressbar-function',
    data(){
        return {
            value:0
        };
    },
    computed:{
        allstyle:{
            get(){
                var _this = this;
                var _s = {};
                _s["width"] = _this.init_width;
                _s["height"] = _this.init_height;
                _s["background-color"] = _this.init_backcolor;
                return _s;
            }
        },
        showstyle:{
            get(){
                var _this = this;
                var _s = {};
                _s["width"] = _this.percent;
                _s["background-color"] = _this.init_fillcolor;
                return _s;
            }
        },
        percent:{
            get(){
                var _this = this;
                return _this.value + '%';
            }
        }
    },
    props:{

        // 调试模式
        // -------
        debugmode:{
            type:Boolean,
            required:false,
            default: false
        },

        // 构造参数
        // -------
        init_width:{
            type: String,
            required:true
        },
        init_height:{
            type: String,
            required:false,
            default:'12px'
        },
        init_fillcolor:{
            type: String,
            required:false,
            default:'#1890FF'
        },
        init_backcolor:{
            type: String,
            required: false,
            default:'rgba(241, 241, 241, 1)'
        },
        init_percent:{
            type:Number,
            required: false,
            default: 0
        }

    },
    mounted(){

        // 使用外部传递的变量初始化私有变量
        // -----------------------------
        var _this = this;

        // 中断
        // ----
        if (_this.debugmode) {
            window.zprogressbarvue = _this;
            console.log('in zprogressbar-function debugger');
        }

        // init
        // ----
        _this.value = _this.init_percent;

    },
    methods:{
        getvalue(){
            var _this = this;
            return _this.value;
        },
        setvalue(val){
            var _this = this;
            _this.value = val;
        }
    }
}
</script>
<style scoped>
.jingruizhang-probim-vue.css-zprogressbar-all{
    box-sizing: border-box; /* 元组件必加 */
    user-select: none;
    border-radius: 5px;
}
.jingruizhang-probim-vue.css-zprogressbar-showing{
    height:100%;
    width:25%;
    border-radius: 5px;
}
</style>