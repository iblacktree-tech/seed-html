<template>
    <!-- partOne折线图 -->
    <div class="landingPage-lineChart main-item-box">
        <div class="chart-box">
            <!-- 标题 时间 -->
            <div class="chart-head-wrapper">
                <div class="chart-head-title">
                    {{partOneData.title}}
                  <i class="glyphicon glyphicon-question-sign tishi-box" data-toggle="tooltip" data-placement="top" :title='partOneData.des'></i>
                </div>
                <div class="head-time">{{partOneData.dates}}</div>
            </div> 
            <!-- 图表 -->
            <div class="echart-box" :id="partOneData.id" :style="{width:this.chartWidth}" v-show='!partOneData.isNull' :class='{"chartShow":chartLoading=="hide"}'> 
            </div>
            <div class="echart-center" v-show='partOneData.isNull&&chartLoading=="hide"'>暂无数据</div>
            <img alt="" class="loading" :src="imgUrl" v-show="chartLoading=='show'">
        </div>
    </div>
</template>

<script>


export default {
    name : 'landingPage-lineChart',
    data() {
        return {
          imgUrl:'../../static/img/loading.png',
        }
    },
    computed:{
      chartLoading(){
          return this.$store.state.analysis.chartLoading;
      },
      charts(){
          return this.$store.state.analysis.charts;
      }
    },
    props:['partOneData'],
    // props:{partOneData:'partOneData'},
    mounted(){
        this.chartWidth()
    },
    watch: {
       chartLoading(){

        // console.log(this.chartLoading)
          if (this.chartLoading =="hide") {
              this.drawLine()
          }
       }
    },

    methods:{
        chartWidth(){
            this.chartWidth = $("#"+this.partOneData.id).siblings('.chart-duibi-info').width()
            // if (this.charts.length!=0) {
            //     this.charts[this.partOneData.id].init()  
            // }
            this.drawLine()
            // console.log(this.chartWidth)
        },
        drawLine(){
          // console.log(this.chartLoading)
          var that = this;
            // console.log(this.partOneData.chartX)
            // 基于准备好的dom，初始化echarts实例
            if (this.partOneData.id==''||this.partOneData.id==null) return;

            var myChart = this.$echarts.init(document.getElementById(that.partOneData.id))
            // console.log(myChart)
            // 绘制图表
            myChart.setOption({
                // 给echarts图设置背景色
                backgroundColor: '#FBFBFB',                    
                calculable: true,
                grid: {
                    right: '5%',
                    top: 20
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: { 
                    // align: 'center', //水平方向位置
                    // verticalAlign: 'bottom', //垂直方向位置
                    x: 'left', //距离x轴的距离
                    y: 'bottom', //距离Y轴的距离
                    data:this.partOneData.cycle
                },
                xAxis: [{
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisLabel:{
                        color: '#000'
                    },
                    type: 'category',
                    boundaryGap: false,
                    data: this.partOneData.chartX,
                }],
                yAxis: [{
                    show: true,
                    type: 'value',
                    name:this.partOneData.chartTitle,
                    nameLocation:'middle',
                    nameGap:35,
                    axisLine:{
                        show : false
                    },
                    splitLine:{
                        lineStyle:{
                            type: 'dotted'
                        }
                    }
                }],
                axisLine: {
                    lineStyle: {
                        color: '#CECECE'
                     }
                 },
                series: [
                  {
                      name: this.partOneData.cycle[0],
                      type: 'line',
                      color:['rgb(0, 0, 99)'],
                      label:{
                          position:['50%', '50%']
                      },
                      data: this.partOneData.chartY1
                  },{
                      name: this.partOneData.cycle[1],
                      type: 'line',
                      color:['rgb(0, 44, 99)'],
                      label:{
                          position:['50%', '50%']
                      },
                      data: this.partOneData.chartY2
                  },{
                      name: this.partOneData.cycle[2],
                      type: 'line',
                      color:['rgb(88, 0, 99)'],
                      label:{
                          position:['50%', '50%']
                      },
                      data: this.partOneData.chartY3
                  },{
                      name: this.partOneData.cycle[3],
                      type: 'line',
                      color:['rgb(22, 66, 99)'],
                      label:{
                          position:['50%', '50%']
                      },
                      data: this.partOneData.chartY4
                  }
                ]
            },true);
            // 用于宽度自适应
            this.charts.push(myChart);

            this.$store.commit('analysisData',{
                charts : this.charts
            })
            // main-item-box 提示hover 显示
            $('.landingPage-lineChart').find('[data-toggle="tooltip"]').tooltip()
        }
    },
    components:{
        
        
    } 
   
}
</script>

<style scoped>
    .loading{
        width: 50px;
        height: 50px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left:-25px;
        margin-top: -25px;
        z-index: 50;
        -webkit-animation: load 2s infinite ease;
        animation: load 2s infinite ease;
    }
    .chartShow{
        opacity: 1 !important;
    }
    @-webkit-keyframes load {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes load {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    .main-item-box{
      border: 1px solid #dae2e5;
      height: 270px;
    }
    .main-box-container>div{
      padding:5px;
    }


    /*main-item-box内容*/

    .chart-box{
      position: relative;
      height: 100%;
      width: 100%;
      background-color: #fff;
      padding: 10px 10px 0 15px;
     
    }


    .chart-head-wrapper{
      height: 40px;
      /*overflow: hidden;*/
      text-align: left;
    }

    .chart-head-title{
      font-size: 14px;
      font-weight: 700;
      color: #333;
    }
    .head-time{
      color: #999;
      font-size: 12px;
    }
    .tishi-box{
      color: rgb(153, 153, 153);
      border:0 !important;
      background-color: transparent !important;
      /*vertical-align: middle;*/
    }
    .tooltip.top {
        /*padding: 5px 0;*/
        margin-top: -3px;
    }
    .tooltip-inner{
      max-width: 240px;
      padding: 6px 8px;
    }



    .chart-overview-wrapper{
        height: calc(100% - 40px);
        width: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .chart-duibi-info{
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: right;
      position: relative;
      z-index: 5;
    }
    .chart-aggregate-percent{
      display: inline-block;
      margin-left: 6px;
      font-size: 12px;
      position: relative;
      top: -36px;
      line-height: 1;
          text-align: right;
    }
    .chart-trend{
      font-size: 20px;
      line-height: 20px;
    }

    .chart-trend-desc{
        font-size: 12px;
        color: #9698a3;
    }
    .echart-box{
      height: 183px;
      width: 100%;
      opacity: 0;
      /*margin-top: -30px;*/
    }

    .echart-box2{
      height: 218px;
      /*margin-top: -20px;*/
    }

    .echart-center{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      color: rgb(153, 153, 153);
      font-size: 16px;
      font-weight: 200;
      text-align: center;
    }

    .echart-textBox{
        text-align: center;
        white-space: nowrap;
        position: absolute;
        top: 62px;
        left: 50%;
        transform: translate(-50%,0);
        visibility: visible;
    }

    .echart-textP1{
        color: #999;
        font-size: 12px;
    }

    .echart-textP2{
        color: #333;
        font-size: 22px;
    }
</style>
