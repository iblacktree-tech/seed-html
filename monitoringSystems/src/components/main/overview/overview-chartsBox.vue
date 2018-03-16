<template>
    <!-- 一行两个 -->
    <div class="overview-chartsBox">
            <div class="main-item-box">
                <div class="chart-box">

                </div>
            </div> 
    </div>
</template>

<script>
// var echarts = require('echarts');
export default {
    name : 'overview-chartsBox',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    computed:{
        setHomeMsg(){
            return this.$store.state.homeMsg;
        },
    },
    mounted(){
       this.drawLine();
    },
    methods:{
        addBtnFn(){
            this.$store.commit('setHomeMsg',{
                msg:'你好'
            })
        },
        drawLine(){
            // // 基于准备好的dom，初始化echarts实例
            // let myChart = this.$echarts.init(document.getElementById('myChart'))
            // // 绘制图表
            // myChart.setOption({
            //     title: { text: '在Vue中使用echarts' },
            //     tooltip: {},
            //     xAxis: {
            //         data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            //     },
            //     yAxis: {},
            //     series: [{
            //         name: '销量',
            //         type: 'bar',
            //         data: [5, 20, 36, 10, 10, 20]
            //     }]
            // });
        }
    },
    components:{
        // ovDateModal : ovDateModal
    }
}
</script>

<style scoped>

</style>
