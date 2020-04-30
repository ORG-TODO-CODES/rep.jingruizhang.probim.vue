<template>
    <div data-debug="zbutton" class="jingruizhang-probim-vue css-zbutton-all" 
        :style="getZbuttonAllStyle()"
        @click="_onclick($event)"
    >
        {{init_text}}
    </div>
</template>
<script>
export default {
    name:'zbutton-function',
    data(){
        return {
        };
    },
    props:{

        // 宽度 高度 radius Text bgcolor
        init_width:{
            type: Number,
            required: false,
            default: 110
        },

        // 高度
        // ----
        init_height: {
            type: Number,
            required: false,
            default: 40
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

        //
        _onclick(ev){
            var _this = this;
            _this.$emit("onclick", ev);
        },

        //
        getZbuttonAllStyle(){
            var _this = this;
            var _s = {};
            _s["width"] = _this.init_width + 'px';
            _s["height"] = _this.init_height + 'px';
            _s["line-height"] = _this.init_height + 'px';
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
    opacity: 0.8;
    cursor:pointer;
    user-select: none;
}
.jingruizhang-probim-vue.css-zbutton-all:hover{
    opacity: 1;
}
</style>