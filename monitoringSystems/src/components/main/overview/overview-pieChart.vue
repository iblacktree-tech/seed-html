<template>

    <div class="overview-pieChart main-item-box">
        <div class="chart-box ">
            <!-- 标题 时间 -->
            <div class="chart-head-wrapper">
                <div class="chart-head-title">
                    {{top.title}}
                  <i class="glyphicon glyphicon-question-sign tishi-box" data-toggle="tooltip" data-placement="top" :title='top.title'></i>
                </div>
                <div class="head-time">{{top.dates}}</div>
            </div> 
            <!-- 图表 -->
            <div class="echart-box echart-box2" :id="chartData.id">
            </div>
        </div>
    </div>
</template>

<script>
// var echarts = require('echarts');
export default {
    name : 'overview-pieChart',
    data() {
        return {
            top:{
                title: "页面浏览量趋势",
                dates:"2018/01/18"
            },
            duibi:{
                counts :200,
                num : 10,
                riseOrFall:"上升"
            },
            chartData:{
                id: "echart-box4"
            }
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
            let myChart = this.$echarts.init(document.getElementById(this.chartData.id))
            // 总访问用户量
            var  sum = 0;

            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    // formatter: "{a} <br/>{b}: {c} ({d}%)"
                    formatter: "{b} <br/> 访问用户量 ({d}%)"
                },
                legend: {
                    orient: 'horizontal',
                    x: 'center', //距离x轴的距离
                    // y: 'bottom', //距离Y轴的距离
                    bottom : 10,
                    // data: res.chartData.chartName
                    data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series: [
                    {
                        name:'',
                        type:'pie',
                        radius: ['40%', '60%'],
                        avoidLabelOverlap: false,
                        center: ['50%','40%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        // data: (function(){
                        //   // console.log(res.chartData.chartName.length)
                        //   var dataArr = [];
                        //   for (var i = 0; i < res.chartData.chartName.length; i++) {
                        //     dataArr.push({
                        //       name: res.chartData.chartName[i],
                        //       value: res.chartData.chartValue[i]
                        //     });

                        //     sum+= parseInt(res.chartData.chartValue[i])
                        //   }
                        //   return dataArr;
                        // })()
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
                        ]
                    }
                ]
            });

            // 生成饼图圆圈内文本
            var textBox = $('<div class="echart-textBox" style=" text-align: center; white-space: nowrap;position:absolute;top: 62px;left: 50%;transform: translate(-50%,0);visibility: visible;"></div>')
            $('<p class="echart-textP1_b" style="color: #999;font-size: 12px;">总访问用户量</p>').appendTo(textBox);
            $('<p class="echart-textP2_b" style="color: #333;font-size: 22px;">'+2000+'</p>').appendTo(textBox);
            textBox.appendTo('#' +this.chartData.id)
            // main-item-box 提示hover 显示
            $('.main-box-container').find('[data-toggle="tooltip"]').tooltip()
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
