<template>
    <div data-debug="zwebsocket" style="display:none;" ></div>
</template>
<script>
export default {
    name:'zwebsocket',
    data(){
        return {
            url:'',

            // websocket 对象
            // -------------
            wsobj: undefined
        };
    },
    props:{

        // websocket 连接地址
        // -----------------
        init_url:{
            type: String,
            required: true
        },

        // 是否直接初始化ws对象
        // ------------------
        init_createobjOnMounted:{
            type: Boolean,
            required: false
        }

    },
    mounted(){

        // 使用外部传递的变量初始化私有变量
        // -----------------------------
        var _this = this;
        _this.url = _this.init_url;

        // 当……时，直接初始化ws对象
        // ----------------------
        if (_this.init_createobjOnMounted) {
            _this.initwsobj();
        }

    },
    methods:{

        // 初始化 websocket 对象，并注册相关事件
        // -----------------------------------
        initwsobj(){
            var _this = this;
            _this.wsobj = new WebSocket(_this.url);
            _this.wsobj.onopen = function(para){
                _this.$emit("onopen", para);
            };
            _this.wsobj.onmessage = function(para){
                _this.$emit("onmessage", para);
            };
            _this.wsobj.onerror = function(para){
                _this.$emit("onerror", para);
            };
            _this.wsobj.onclose = function(para){
                _this.$emit("onclose", para);
            }
        },

        // 获取 wsobj 对象
        // --------------
        getwsobj(){
            var _this = this;
            return _this.wsobj;
        }
    }
}
</script>