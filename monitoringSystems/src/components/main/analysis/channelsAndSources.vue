<template>
    <!-- 分析 -->
    <div class="channelsAndSources">
        <!-- 顶部 -->
        <div class="top-box">
            <!-- 右侧 日期btn-->
            <button type="button" class="channelsAndSources-btn pull-right" >
                <i class="anticon glyphicon glyphicon-list-alt"></i>
                <span>昨天</span>
            </button>
            <!-- 标题 -->
            <div class="itemTitleBox">
                <h2 class="itemTitle">渠道分析</h2>
                <button type="button" class="btn btn-default btn-xs pull-left" aria-label="Left Align">
                    昨天
                    <span class="glyphicon glyphicon-remove " aria-hidden="true"></span>
                </button>
            </div>
        </div>
        <!-- 主体模块 -->
        <div class="channelsAndSources-main">
            <!-- 标题及描述 -->
            <div>
                <h3 class="m-tittle">渠道分析</h3>
                <p class="m-tittle-des">
                    针对web端，包含“全渠道概况”，“各类渠道流量分布及趋势”，“各明细渠道深度评估”三个模块。其中，“各明细渠道深度评估”从获客能力、拉新能力、获客质量三个角度，准确甄别优劣渠道，帮助您提升渠道投放ROI
                </p>
            </div>
            <!-- 底部细分模块 第一部分 -->
            <div class="partOne">
                <h4 class="partOneTitle">一、全渠道概况：<span class="partOneTitleSpan">整体描述了全渠道的获客能力及拉新能力</span></h4>
                <p class="partOneDes">
                    获客能力：“访问用户量”和“登录用户量”代表了获客规模<br/>拉新能力：“新访问用户量”和“新登录用户量”和各自的占比，反映了拉新能力
                </p>
                <section class="partOneMain">
                    <div class="col-xs-4" v-for="(item,index) in box.partOne">
                        <analysisLineChart :chartdates="box.partOne[index]"></analysisLineChart>
                    </div>
                </section>
            </div>
            <!-- 第二部分 -->
            <div class="partTwo">
               <h4 class="partTwoTitle">二、各渠道流量分部及对比</h4>
               <p class="partTwoDes">
                   提供4类一级流量来源的流量情况，包括：直接访问、搜索引擎、外部链接、社交媒体；反应当前渠道投放组合情况，各自的流量规模和拉新能力。以及访问来源分类请参考：https://docs.iblacktree.com/dimensions.html
               </p> 
               <section class="partTwoMain">
                   <div class="col-xs-6" v-for="(item,index) in box.partOne">
                       <analysisBarChart :chartdates="box.partOne[index]" v-if="index==0||index==2"></analysisBarChart>
                       <analysisLineChart2 :chartdates="box.partOne[index]" v-else></analysisLineChart2>
                   </div>
               </section>
            </div>
        </div>






    </div>
</template>

<script>
import analysisLineChart from '@/components/main/analysis/analysis-lineChart'
import analysisLineChart2 from '@/components/main/analysis/analysis-lineChart2'
import analysisBarChart from '@/components/main/analysis/analysis-barChart'
export default {
    name : 'channelsAndSources',
    data() {
        return {
            box:{
                partOne:[
                    {
                        title: "访问用户量趋势",//标题
                        des: "访问用户量趋势",//描述
                        dates:"2018-03-26-2018-03-26",//日期
                        counts :5,//数量
                        cycle:"本周期",// 周期
                        id : "1",
                        // chartX:[],
                        chartX:['17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05'],
                        // chartYNow:[],
                        chartYNow:[800, 300, 500, 800, 300, 600, 500, 600,200],
                        chartYBefore:[600, 300, 400, 200, 300, 300, 200, 400,800],
                        isNull: false, //是否显示暂无数据
                        chartWidth:  0//宽度
                    },
                    {
                        title: "新访问用户量趋势",//标题
                        des: "新访问用户量趋势",//描述
                        dates:"2018-03-26-2018-03-26",//日期
                        counts :5,//数量
                        cycle:"本周期",// 周期
                        id : "2",
                        chartX:['17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05'],
                        chartYNow:[800, 300, 500, 800, 300, 600, 500, 600,200],
                        chartYBefore:[600, 300, 400, 200, 300, 300, 200, 400,800],
                        isNull: false, //是否显示暂无数据
                        chartWidth:  0//宽度
                    },
                    {
                        title: "新访问用户占比",//标题
                        des: "新访问用户占比",//描述
                        dates:"2018-03-26-2018-03-26",//日期
                        counts :'100%',//数量
                        cycle:"本周期",// 周期
                        id : "3",
                        chartX:['17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05'],
                        chartYNow:[800, 300, 500, 800, 300, 600, 500, 600,200],
                        chartYBefore:[600, 300, 400, 200, 300, 300, 200, 400,800],
                        isNull: false, //是否显示暂无数据
                        chartWidth:  0//宽度
                    },
                    {
                        title: "登录用户量趋势",//标题
                        des: "登录用户量趋势",//描述
                        dates:"2018-03-26-2018-03-26",//日期
                        counts :0,//数量
                        cycle:"本周期",// 周期
                        id : "4",
                        chartX:['17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05'],
                        chartYNow:[800, 300, 500, 800, 300, 600, 500, 600,200],
                        chartYBefore:[600, 300, 400, 200, 300, 300, 200, 400,800],
                        isNull: false, //是否显示暂无数据
                        chartWidth:  0//宽度
                    },
                    {
                        title: "新登录用户量趋势",//标题
                        des: "新登录用户量趋势",//描述
                        dates:"2018-03-26-2018-03-26",//日期
                        counts :0,//数量
                        cycle:"本周期",// 周期
                        id : "5",
                        chartX:['17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05'],
                        chartYNow:[800, 300, 500, 800, 300, 600, 500, 600,200],
                        chartYBefore:[600, 300, 400, 200, 300, 300, 200, 400,800],
                        isNull: false, //是否显示暂无数据
                        chartWidth:  0//宽度
                    },
                    {
                        title: "新登录用户占比",//标题
                        des: "新登录用户占比",//描述
                        dates:"2018-03-26-2018-03-26",//日期
                        counts :'100%',//数量
                        cycle:"本周期",// 周期
                        id : "6",
                        chartX:['17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05'],
                        chartYNow:[800, 300, 500, 800, 300, 600, 500, 600,200],
                        chartYBefore:[600, 300, 400, 200, 300, 300, 200, 400,800],
                        isNull: false, //是否显示暂无数据
                        chartWidth:  0//宽度
                    }
                    
                ],
                partTwo:[
                    {
                        title: "访问用户来源分布",//标题
                        des: "访问用户来源分布",//描述
                        dates:"2018-03-26-2018-03-26",//日期
                        id : "1",
                        // chartX:[],
                        chartX:['17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05'],
                        // chartYNow:[],
                        chartYNow:[800, 300, 500, 800, 300, 600, 500, 600,200],
                        chartYBefore:[600, 300, 400, 200, 300, 300, 200, 400,800],
                        isNull: false, //是否显示暂无数据
                        chartWidth:  0//宽度
                    },
                    {
                        title: "访问用户访问来源趋势",//标题
                        des: "访问用户访问来源趋势",//描述
                        dates:"2018-03-26-2018-03-26",//日期
                        id : "2",
                        chartX:['17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05'],
                        chartYNow:[800, 300, 500, 800, 300, 600, 500, 600,200],
                        chartYBefore:[600, 300, 400, 200, 300, 300, 200, 400,800],
                        isNull: false, //是否显示暂无数据
                        chartWidth:  0//宽度
                    },
                    {
                        title: "新访问用户来源分布",//标题
                        des: "新访问用户来源分布",//描述
                        dates:"2018-03-26-2018-03-26",//日期
                        id : "3",
                        chartX:['17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05'],
                        chartYNow:[800, 300, 500, 800, 300, 600, 500, 600,200],
                        chartYBefore:[600, 300, 400, 200, 300, 300, 200, 400,800],
                        isNull: false, //是否显示暂无数据
                        chartWidth:  0//宽度
                    },
                    {
                        title: "新访问用户访问来源趋势",//标题
                        des: "新访问用户访问来源趋势",//描述
                        dates:"2018-03-26-2018-03-26",//日期
                        id : "4",
                        chartX:['17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05'],
                        chartYNow:[800, 300, 500, 800, 300, 600, 500, 600,200],
                        chartYBefore:[600, 300, 400, 200, 300, 300, 200, 400,800],
                        isNull: false, //是否显示暂无数据
                        chartWidth:  0//宽度
                    }
                ]
            }
        }
    },
    computed:{

    },
    mounted(){
        this.a();
    },
    watch:{
        // itemIndex(){
        //     this.a();
        // }
    },
    methods:{
        a(){
            // console.log(this.itemIndex)
        }
    },
    components:{
        analysisLineChart:analysisLineChart,
        analysisLineChart2:analysisLineChart2,
        analysisBarChart:analysisBarChart,
    }
}
</script>

<style scoped>
    /*顶部*/
    .top-box{
        width: 100%;
        padding:10px 20px;
        box-sizing: border-box;
    }
    .channelsAndSources-btn{
        background-color: rgb(255, 255, 255);
        -webkit-appearance: button;
        vertical-align: middle;
        padding: 6px 12px;
        line-height: 1.5;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        display: inline-block;
        margin-bottom: 0;
        font-weight: 500;
        text-align: center;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        white-space: nowrap;
        line-height: 1.15;
        padding: 0 15px;
        font-size: 12px;
        border-radius: 4px;
        height: 28px;
        user-select: none;
        transition: all .3s cubic-bezier(.645,.045,.355,1);
        position: relative;
        color: rgba(0,0,0,.65);
        background-color: #fff;
        border-color: #d9d9d9;
        z-index: 5;
    }
    .channelsAndSources-btn .anticon {
        transition: margin-left .3s cubic-bezier(.645,.045,.355,1);
    }

    .channelsAndSources-btn>.anticon {
        line-height: 1;
    }

    .channelsAndSources-btn>i, .top-choosedate-btn>span {
        pointer-events: none;
    }
    .anticon {
        display: inline-block;
        font-style: normal;
        vertical-align: baseline;
        text-align: center;
        text-transform: none;
        line-height: 1;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .itemTitleBox{
        position: relative;
        left: 20px;
        top: 0px;
    }
    .itemTitle{
        font-size: 16px;
        font-weight: 700;
        color: #333;
        text-indent: 5px;
        text-align: left;
    }
    .itemTitleBox button{
        background-color: #ccc;
        color:#fff;
        font-size: 12px;
    }
    /*主体模块*/
    .channelsAndSources-main{
        width: 100%;
        text-align: left;
        /*margin-top: -10px;*/
        padding:0px 25px 10px;
        box-sizing: border-box;
        overflow-x: hidden;
    }
    .m-tittle,.partOneTitle{
        font-size: 14px;
        font-weight: 600;
        color: #000;
        padding-left: 15px;
        box-sizing: border-box;
    }
    .m-tittle-des{
        width: 120%;
        font-size: 12px;
        padding-left: 15px;
        box-sizing: border-box;
        /*transform: scale(0.8);*/
        /*-webkit-transform-origin-x: 0;   
        -webkit-transform: scale(0.9);   
        -webkit-transform: scale(0.9);*/
        /*font-size: 11px;*/
        /*color: #999;*/
    }
    .partOne{
        overflow:hidden;
    }
    .partOneMain{
        margin-top: 20px;
    }
    .partOneTitle,.partTwoTitle{
        font-weight: 600;
    }
    .partOneTitleSpan{
        font-weight: 500;
    }
    .partOneDes,.partTwoDes{
        font-size: 12px; 
        padding-left: 15px;
        box-sizing: border-box; 

    }
    .partOneMain>div,.partTwoMain>div{
        margin-bottom:10px;
        padding:0 5px;
    }
    .partTwo{
        margin-top: 10px;

    }
    .partTwoTitle{
        font-size: 14px;
        font-weight: 600;
        color: #000;
        padding-left: 15px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
</style>
