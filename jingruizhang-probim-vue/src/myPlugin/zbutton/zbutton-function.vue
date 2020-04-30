<template>
    <div data-debug="zbutton" class="jingruizhang-probim-vue css-zbutton-all" 
        :style="getZbuttonAllStyle()"
        @click="_onclick($event)"
    >
        {{init_text}}

        <!-- 下拉部分 -->
        <div 
        v-show="isOpen"
        class="jingruizhang-probim-vue css-zbutton-body"
        :style="liststyle"
        >
            <div 
            @click="_itemclick($event, item)"
                v-for="item in init_ifchildren"
                :key="item.sign"
                class="jingruizhang-probim-vue css-zbutton-item">
                <div class="jingruizhang-probim-vue css-zbutton-iteminner">
                    <div 
               
                    class="jingruizhang-probim-vue css-zbutton-iteminner-icon" 
                    :class="item.iconclass"
                    ></div>
                    <div class="jingruizhang-probim-vue css-zbutton-iteminner-text" >{{item.text}}</div>
                </div>
            </div>
        </div>
        <!-- //下拉部分 -->

    </div>
</template>
<script>
// ctor para
//  init_width(string, def120px) 
//  init_height(string, def40px) 
//  init_radius(string, def4px)
//  init_text(string, require)
//  init_bgcolor(string, def#1890ff)
//  init_color(string, def#fff)
//  init_fontsize(Number, def14)
//  init_listzindex(Number, def1)
//  init_ifchildren(Array, def[{'text':'', 'sign':'', 'iconclass':''}]) // 是否有子按钮，值为[]时，点击直接触发onclick，否则点击子按钮触发onclick
// methods
//  getvalue()
//  setvalue(val)
// event
//  onclick(ev, [sign]) // 值为[]时，点击直接触发onclick，否则点击子按钮触发onclick
export default {
    name:'zbutton-function',
    data(){
        return {
            isOpen:false,
        };
    },
    computed:{
        liststyle:{
            get(){
                var _this = this;
                var _s = {};
                _s["z-index"] = _this.init_listzindex;
                return _s;
            }
        }
    },
    props:{

        // 宽度 高度 radius Text bgcolor
        init_width:{
            type: String,
            required: false,
            default:'120px'
        },

        // 高度
        // ----
        init_height: {
            type: String,
            required: false,
            default:'40px'
        },

        // 圆角
        // ----
        init_radius:{
            type: String,
            required: false,
            default: '4px'
        },

        // 文本
        // ----
        init_text:{
            type: String,
            required: true
        },

        // 背景色
        // -----
        init_bgcolor:{
            type: String,
            required: false,
            default:'#1890FF'
        },

        // 字体颜色
        // -------
        init_color:{
            type: String,
            required: false,
            default:'#fff'
        },

        // 字体大小
        // -------
        init_fontsize:{
            type: Number,
            required: false,
            default: 14
        },

        // 子按钮
        // ------
        init_ifchildren:{
            type: Array,
            required:false,
            default:[]
        },

        //
        init_listzindex:{
            type: Number,
            required: false,
            default:1
        },

        // 调试模式
        // -------
        debugmode:{
            type:Boolean,
            required:false,
            default: false
        }

    },
    mounted(){

        // 使用外部传递的变量初始化私有变量
        // -----------------------------
        var _this = this;

        // 中断
        // ----
        if (_this.debugmode) {
            console.log('in zbutton-function debugger');
        }
        

    },
    methods:{

        // 子按钮点击
        // ---------
        _itemclick(ev, item) {
            var _this = this;
            _this.$emit("onclick", item);
        },

        //
        _onclick(ev){
            var _this = this;
            if (_this.init_ifchildren && _this.init_ifchildren.length) {
                if (_this.isOpen) {
                    _this.isOpen = false;
                } else {
                    _this.isOpen = true;
                }
            } else {
                _this.$emit("onclick", undefined);
            }
            
        },

        //
        getZbuttonAllStyle(){
            var _this = this;
            var _s = {};
            _s["width"] = _this.init_width;
            _s["height"] = _this.init_height;
            _s["line-height"] = _this.init_height;
            _s["border-radius"] = _this.init_radius;
            _s["background-color"] = _this.init_bgcolor;
            _s["color"] = _this.init_color;
            _s["font-size"] = _this.init_fontsize + 'px';
            return _s;
        }
    }
}
</script>
<style scoped>
.jingruizhang-probim-vue.css-zbutton-all{
    position: relative;
    /* opacity: 0.8; */
    cursor:pointer;
    user-select: none;
}
.jingruizhang-probim-vue.css-zbutton-all:hover{
    opacity: 1;
}

.jingruizhang-probim-vue.css-zbutton-body{
    position:absolute;
    top:calc(100% + 4px);
    width:100%;
    /* overflow-y: scroll; */
    background-color: #fff;
    border: 1px solid rgba(0,0,0,0.09);
    box-sizing: border-box;
    border-radius: 4px;
}

.jingruizhang-probim-vue.css-zbutton-item{
    height:40px;
    line-height: 40px;
    display: flex;
    padding: 4px;
    box-sizing: border-box;
    align-items: center;
}

.jingruizhang-probim-vue.css-zbutton-iteminner{
    display: flex;
    width:100%;
    align-items: center;
}

.jingruizhang-probim-vue.css-zbutton-iteminner:hover{
    background-color: rgba(0,0,0,0.04);
    cursor:pointer;
}

.jingruizhang-probim-vue.css-zbutton-iteminner-icon{
    width:24px;
    height:24px;
}

.jingruizhang-probim-vue.css-zbutton-iteminner-text{
    flex:1;
    color:rgba(0,0,0,0.85);
    font-size: 14px;
    height:100%;
    margin-right: 24px;
    text-align: center;
}
</style>