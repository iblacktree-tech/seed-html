<template>
    <!-- 一行两个 -->
    <div class="overview-barChart main-item-box">
      <div class="chart-box">
          <!-- 标题 时间 -->
          <div class="chart-head-wrapper">
              <div class="chart-head-title">
                  {{top.title}}
                <i class="glyphicon glyphicon-question-sign tishi-box" data-toggle="tooltip" data-placement="top" :title='top.title'></i>
              </div>
              <div class="head-time">{{top.dates}}</div>
          </div> 
          <!-- 图表 -->
          <div class="echart-box" :id="chartData.id">
              
          </div>
          
      </div>
    </div>
</template>

<script>
// var echarts = require('echarts');
export default {
    name : 'overview-barChart',
    data() {
        return {
            top:{
                title: "页面浏览量趋势",
                dates:"2018/01/18"
            },
            chartData:{
                id: "echart-box6"
            }
        }
    },
    computed:{
        setHomeMsg(){
            return this.$store.state.homeMsg;
        },
    },
    props:['chartdates'],
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
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById(this.chartData.id))
            // 定义样式和数据
            // 计算百分比
            // var sum = 0;
            // for (x in res.chartData.chartNow){
            //   sum+= parseInt(res.chartData.chartNow[x])
            //   // console.log(x)
            // }
             // console.log((18203/sum *100).toFixed(2) +"%")
            var arr =[18203, 23489, 29034, 104970, 131744, 630230]
             var sum = 0;
            for (var x in arr){
              sum+= parseInt(arr[x])
              // console.log(x)
            }
             myChart.setOption({
                  tooltip: {
                    show:true
                  },
                  legend: {
                      show:false
                  },
                  grid: {
                      right: '5%',
                      top: 20,
                      left:5,
                      bottom:20,
                      containLabel: true
                  },
                  xAxis: {
                    position: "top",
                      type: 'value',
                      boundaryGap: [0, 0.01],
                      axisLine:{
                        show:false
                      },
                      axisTick:{
                        show:false
                      },
                      splitLine:{
                        lineStyle:{
                          type: 'dotted'
                        }
                      }
                  },
                  yAxis: {
                      type: 'category',
                      axisLine:{
                        lineStyle:{
                          color:"#cccccc"
                        }
                      },
                      axisTick:{
                        alignWithLabel:true
                      },
                      axisLabel: {        
                            show: true,
                            color: "#000000"
                        },
                      data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
                      // data: res.chartData.chartTime
                  },
                  series: [
                      {
                          name: '2011年',
                          type: 'bar',
                          // data: res.chartData.chartNow,
                          data: [18203, 23489, 29034, 104970, 131744, 630230],
                          label: {
                                normal: {
                                    show: true,
                                    formatter: function(params){
                                      // return params.value + "("+ (params.value/sum *100).toFixed(2) +"%)"
                                      params.value + "("+ (params.value/sum *100).toFixed(2) +"%)"
                                    },
                                    position: 'right',
                                    color:"#000000"
                                }
                            },
                            barWidth: 10,
                            

                          color:['#90EC7D']
                      }
                  ]
              });
             // 只有一个数据
             // if (res.chartData.chartNow.length==1) {
             //     myChart.setOption({
             //       series: [{
             //        barWidth:'auto',
             //        barMaxWidth:80,
             //       }]
             //     })
             // }
             // echarts 宽度 自适应
             window.onresize = function(){
                 myChart.resize()
             }
        }
    },
    components:{
        // ovDateModal : ovDateModal
    }
}
</script>

<style scoped>
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

    .chart-aggregate-num{
          display: inline-block;
        font-family: PingFangSC;
        margin-left: 6px;
        font-size: 24px;
        color: #333;
    }


    .suffix{
      font-size: 18px;
        vertical-align: middle;
    }

    .chart-aggregate-percent{
      display: inline-block;
      margin-left: 6px;
      font-size: 12px;
      position: relative;
      top: -2px;
      line-height: 1;
          text-align: right;
    }
    .chart-trend{
      font-size: 18px;
      line-height: 18px;
    }
    .chart-trend-up{
      color: #28c29b;
    }

    .chart-trend-down{
      color: #f25252;
    }

    .chart-trend-desc{
        font-size: 12px;
        color: #9698a3;
    }

    svg:not(:root) {
        overflow: hidden;
    }
    .svg-icon {
        display: inline-block;
        width: 1em;
        height: 1em;
        fill: currentColor;
        vertical-align: middle;
        margin-right: -5px;
    }

    .echart-box{
      height: 183px;
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
