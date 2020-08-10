<template>
    <div data-debug="zdialog" class="jingruizhang-probim-vue css-zdialog-all" 
        :style="getZdialogAllStyle()"
    >
        <div 
        :id="init_id"
        class="jingruizhang-probim-vue css-zdialog-inner" 
            v-zdrag="greet"
            :style="getZdialogInnerStyle()"
        >
            <!-- 对话框的标题（及右上角的关闭按钮） -->
            <div 
            class="jingruizhang-probim-vue css-zdialog-title" >


                <div
                v-if="!init_usecustomtitlearea"
                 class="jingruizhang-probim-vue css-zdialog-titlelabel" >
                    {{title}}
                </div>
                <slot 
                v-else
                name="customtitlearea"></slot>


                <div 
                @click="close_click($event)"
                class="jingruizhang-probim-vue css-zdialog-titleclosebtn"
                :class="getTitleCloseBtnClass()"
                 ></div>
            </div>
            <!-- //对话框的标题（及右上角的关闭按钮） -->

            <!-- 嵌入的主体部分 -->
            <slot name="mainslot" ></slot>
            <!-- //嵌入的主体部分 -->

            <!-- 嵌入的按钮部分 -->
            <slot name="buttonslot"></slot>
            <!-- //嵌入的按钮部分 -->

        </div>
    </div>
</template>
<script>
export default {
    name:'zdialog-function',
    data(){
        return {
            val:'123',  // drag
            style: {    // drag
                position: 'fixed', 
                left: 'calc(50% - 348px / 2)',
                top: 'calc(50% - 124px / 2)'
            },

            title:'',
            zindex:0,
            innerWidth: 0
        };
    },
    props:{

        // 调试模式
        // -------
        debugmode:{
            type:Boolean,
            required:false,
            default: false
        },

        // id
        init_id:{
            type: String,
            required:false,
            default:'id_jingruizhang_probim_vue_zdialog_inner'
        },
        
        // 对话框标题
        // ---------
        init_title:{
            type: String,
            required: true
        },

        // 整体zindex
        // ----------
        init_zindex:{
            type: Number,
            required: true
        },

        // 内部宽度
        // -------
        init_innerWidth:{
            type: Number,
            required: false,
            default: 348
        },

        // 关闭按钮 iconfontclass
        // ---------------------
        init_closebtniconfontclass:{
            type: String,
            required:false
        },

        // 是否使用自定义的 title dom 元素
        // -----------------------------
        init_usecustomtitlearea: {
            type: Boolean,
            required:false
        }

    },
    directives:{
        'zdrag':function (el, binding) {
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
    },
    mounted(){

        // 使用外部传递的变量初始化私有变量
        // -----------------------------
        var _this = this;
        window.zdialogFunctionVue = this;
        _this.title = _this.init_title;
        _this.zindex = _this.init_zindex;
        _this.innerWidth = _this.init_innerWidth;

        // 中断
        // ----
        if (_this.debugmode) {
            console.log('in zdialog-function debugger');
        }

        _this.$nextTick(()=>{

            // 设置 _this.style
            // ----------------
            var id = _this.init_id;
            var dom = document.getElementById(id);
            var height = dom.offsetHeight;
            var width = dom.offsetWidth;
//             left: "calc(50% - 348px / 2)"
// position: "fixed"
// top: "calc(50% - 124px / 2)"
            
            // 以居中
            // ------
            _this.style.left = `calc(50% - ${width}px / 2)`;
            _this.style.top = `calc(50% - ${height}px / 2)`;
        })
        

    },
    methods:{

        // drag
        // ----
        greet(val){
            var _this = this;
            _this.val = val;
        },

        // 关闭按钮点击
        // -----------
        close_click(ev) {
            var _this = this;
            _this.$emit("onclose", ev);
        },

        // 获取 css-zdialog-titleclosebtn 额外的 class 以使用 iconfont
        // ----------------------------------------------------------
        getTitleCloseBtnClass(){
            var _this = this;
            var _c = {};
            if (_this.init_closebtniconfontclass) {
                _c[_this.init_closebtniconfontclass] = true;
            }
            return _c;
        },

        // 计算 css-zdialog-all 的样式
        // 包括 z-index 的样式属性赋值
        // -------------------------
        getZdialogAllStyle(){
            var _this = this;
            var _s = {};
            _s["z-index"] = _this.zindex;

            return _s;
        },

        // 计算 css-zdialog-inner 的样式
        // ----------------------------
        getZdialogInnerStyle(){
            var _this = this;
            var _s = {};
            _s["width"] = _this.innerWidth + 'px';

            // tranverse style
            // ---------------
            for (var style_prop in _this.style) {
                _s[style_prop] = _this.style[style_prop];
            }

            return _s;
        }
    }
}
</script>
<style scoped>
.jingruizhang-probim-vue.css-zdialog-all{
    top:0;
    left:0;
    width:100%;
    height:100%;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: rgba(0,0,0,0.15);
}
.jingruizhang-probim-vue.css-zdialog-inner{
    min-height: 124px;
    background-color: #fff;
    box-shadow:0px 13px 24px -17px rgba(11,41,62,0.8);
    border-radius:4px;
}
.jingruizhang-probim-vue.css-zdialog-title{
    height:60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0,0,0,0.09);
    cursor:move;
}
.jingruizhang-probim-vue.css-zdialog-titlelabel {
    margin-left:24px;
    height:24px;
    line-height: 24px;
    flex:1;
    text-align: left;
    color:rgba(0,0,0,0.85);
    font-size: 16px;
}
.jingruizhang-probim-vue.css-zdialog-titleclosebtn {
    margin-right: 24px;
    width:24px;
    height:24px;
    cursor: pointer;
}





</style>