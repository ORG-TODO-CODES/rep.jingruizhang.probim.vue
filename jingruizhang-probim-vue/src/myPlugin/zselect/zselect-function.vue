<template>
    <div data-debug="zselect" class="jingruizhang-probim-vue css-zselect-all"
    :style="allstyle"
    >
        <!-- 本体 -->
        <div
        @click="_bodyclick($event)"
         class="jingruizhang-probim-vue css-zselect-text-line"
         :class="{'css-dis': m_disabled}"
         >
            <div class="jingruizhang-probim-vue css-zselect-text"
            :class="{'css-novalue':getIfNoValue()}"
            >
                {{getIfNoValue()?placeholder:selectedItem.text}}
            </div>
            <div class="jingruizhang-probim-vue css-zselect-icon"
            :class="iconclass"
            >

            </div>
        </div>
        <!-- //本体 -->

        <!-- 下拉部分 -->
        <div 
        v-show="isOpen"
        class="jingruizhang-probim-vue css-zselect-body"
        :style="liststyle"
        >
            <div 
            @click="_itemclick($event, item)"
                v-for="item in items"
                :key="item.value"
                class="jingruizhang-probim-vue css-zselect-item">
                <div class="jingruizhang-probim-vue css-zselect-iteminner"
                :class="{'css-dis': m_disabled}"
                >
                    <div 
               
                    class="jingruizhang-probim-vue css-zselect-iteminner-icon" 
                    :class="item.iconclass"
                    ></div>
                    <div class="jingruizhang-probim-vue css-zselect-iteminner-text" >{{item.text}}</div>
                </div>
            </div>
        </div>
        <!-- //下拉部分 -->

    </div>
</template>
<script>
export default {
    name:'zselect-function',
    data(){
        return {
            // 是否已禁用
            // ---------
            m_disabled: undefined,

            m_debugmode: false,
            selectedItem:{ // 选中的数据

            },
            iconclass:'',  // 本体的右侧图标（一般是下拉箭头）
            isOpen:false,
            width:0,
            height:0,
            items:[]
        };
    },
    computed:{
        allstyle:{
            get(){
                var _this = this;
                var _s = {};
                _s["width"] = _this.width;
                _s["height"] = _this.height + 'px';
                return _s;
            }
        },
        liststyle:{
            get(){
                var _this = this;
                var _s = {};
                _s["max-height"] = _this.init_listmaxheight + 'px';
                _s["z-index"] = _this.init_listzindex;
                return _s;
            }
        },
        attrvalue:{
            get(){
                var _this = this;
                return _this.selectedItem;
            },
            set(item) {
                var _this = this;
                _this.selectedItem = item;
            }
        }
    },
    props:{

        // 调试模式
        // -------
        debugmode:{
            type:Boolean,
            required:false
        },

        // 无值显示
        // -------
        placeholder:{
            type: String,
            required: true
        },

        // 右侧图标（一般是向下箭头）
        // -----------------------
        init_iconclass:{
            type: String,
            required: false
        },

        // 下拉选项
        // -------
        init_items:{
            type: Array,
            required: true
        },

        // 宽度
        // ----
        init_width:{
            type: String,
            required: true
        },

        // 高度
        // ----
        init_height:{
            type: Number,
            required: false,
            default:40
        },

        // list maxheight
        // --------------
        init_listmaxheight:{
            type:Number,
            required:false,
            default: 180
        },

        init_listzindex:{
            type:Number,
            required: false,
            default:1
        }

    },
    mounted(){

        // 使用外部传递的变量初始化私有变量
        // -----------------------------
        var _this = this;

        // 中断
        // ----
        console.log('in zselect-function.vue 161');
        _this.m_debugmode = _this.debugmode;
        if (_this.m_debugmode) {
            window.zselectfunctionvue = _this;
            console.log('in zselect-function debugger');
        }

        // init
        // ----
        _this.items = _this.init_items;
        _this.width = _this.init_width;
        _this.height = _this.init_height;
        _this.iconclass = _this.init_iconclass;

        _this.attrvalue = {};

    },
    methods:{

        getIfNoValue(){
            var _this = this;
            if (_this.debugmode) {
                debugger;
            }
            if (!_this.selectedItem || !_this.selectedItem.value) {
                return true;
            }
            return false;
        },

        setIsOpen(val) {
            var _this = this;
            _this.isOpen = !!val;
        },

        setIsdisabled(val) {
            var _this = this;
            _this.m_disabled = !!val;
            _this.isOpen = false;
        },

        // 设置值
        // ------
        setvalue(item){
            var _this = this;
            _this.selectedItem = item;
        },

        _itemclick(ev, item){
            var _this = this;
           
            _this.selectedItem = item;
            _this.$emit("itemclick", item);// $parent.$emit?
            _this.isOpen = false;
        },
        _bodyclick(ev){
            var _this = this;
             if (_this.m_disabled) {
                return;
            }
            if (_this.isOpen) {
                _this.isOpen = false;
            } else {
                _this.isOpen = true;
            }
            _this.$emit("bodyclick", ev);
        }
    }
}
</script>
<style scoped>
.jingruizhang-probim-vue.css-zselect-all{
    box-sizing: border-box; /* 元组件必加 */
    position:relative;
    border:1px solid rgba(0,0,0,0.09);
    border-radius: 4px;
    user-select: none;
}
.jingruizhang-probim-vue.css-zselect-icon {
    width:24px;
    height:24px;
    line-height: 24px;
    text-align: center;
    position: absolute;
    right: 24px;
}
.jingruizhang-probim-vue.css-zselect-text-line{
    width:100%;
    height:100%;
    cursor:pointer;
    display: flex;
    align-items: center;
    padding:0 28px 0 28px;
    box-sizing: border-box;
}

.jingruizhang-probim-vue.css-zselect-text-line.css-dis{
    cursor: not-allowed;
    background-color: #f5f7fa;
    color: #c0c4cc;
}

.jingruizhang-probim-vue.css-zselect-body{
    position:absolute;
    top:calc(100% + 4px);
    width:100%;
    overflow-y: scroll;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,0.09);
    box-sizing: border-box;
    border-radius: 4px;
}

.jingruizhang-probim-vue.css-zselect-item{
    height:40px;
    line-height: 40px;
    display: flex;
    padding: 4px;
    box-sizing: border-box;
    align-items: center;
}

.jingruizhang-probim-vue.css-zselect-iteminner{
    display: flex;
    width:100%;
    align-items: center;
}

.jingruizhang-probim-vue.css-zselect-iteminner:hover{
    background-color: rgba(0,0,0,0.04);
    cursor:pointer;
}

.jingruizhang-probim-vue.css-zselect-iteminner.css-dis:hover{
    background-color: #f5f7fa;
    color: #c0c4cc;
    cursor: not-allowed;
}

.jingruizhang-probim-vue.css-zselect-iteminner-icon{
    width:24px;
    height:24px;
}

.jingruizhang-probim-vue.css-zselect-iteminner-text{
    flex:1;
    color:rgba(0,0,0,0.85);
    font-size: 14px;
    height:100%;
    text-align: left;
}

.jingruizhang-probim-vue.css-novalue{
    color:rgba(0,0,0,0.35);
}

</style>