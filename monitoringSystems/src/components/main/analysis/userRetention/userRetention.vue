<template>
    <!-- 分析 -->
    <div class="userRetention">
        <!-- 顶部 -->
        <div class="top-box">
            <!-- 右侧 类型选择弹框-->
            <button type="button" class="userRetention-btn pull-right" >
                <!-- <i class="anticon glyphicon glyphicon-list-alt"></i> -->
                <span>访问用户</span>
            </button>
            <!-- 标题 -->
            <div class="itemTitleBox">
                <h2 class="itemTitle">用户留存分析</h2>
            </div>
        </div>
        <!-- 主体模块 -->
        <div class="userRetention-main">
            <!-- 标题及描述 -->
            <div>
                <h3 class="m-tittle">落地页分析</h3>
                <p class="m-tittle-des">
                    适用于您的APP或者网站；用户留存分析针对（新）访问用户和（新）登录用户分别提供2大类信息：<br/>
                    1.（新）用户留存趋势：追踪用户每天的留存变化，帮助您掌握留存的长期趋势；<br/>
                    2.次日和次周留存率趋势：能够反映拉新或者其他用户运营活动的整体效率和稳定性。举例来说，如果新访问用户次日留存同期波动较大，说明拉新效果不够稳定，可以进一步分析原因，提升新访问上午次日留存。
                </p>
            </div>
            <!-- 底部细分模块 第一部分 -->
            <div class="partOne">
                <h4 class="partOneTitle">一、落地页访问量分布和趋势</h4>
                <p class="partOneDes">
                    整体描述落地页的流量集中度和流量趋势；建议您重点关注流量较大的落地页，落地页集中度的变化可以反映您近期流量投放策略的调整。
                </p>
                <section class="partOneMain">
                    <div class="col-xs-6" v-for="(item,index) in box.partOne">
                        <userRetentionBarChart :partOneData="box.partOne[index]" v-if="index==0"></userRetentionBarChart>
                        <userRetentionLineChart :partOneData="box.partOne[index]" v-else></userRetentionLineChart>
                    </div>
                </section>
            </div>
            <!-- 第二部分 -->
            <div class="partTwo">
               <h4 class="partTwoTitle">二、不同落地页的流量和质量分析</h4>
               <p class="partTwoDes">
                   “访问量”描述不同落地页的流量大小；“跳出率”衡量不同落地页的质量<br/>针对流量较大而质量较低的落地页需要重点分析原因
               </p> 
               <section class="partTwoMain">
                   <div class="col-xs-12">
                       <userRetentionTable :partTwoData="box.partTwo[0]"></userRetentionTable>
                   </div>
               </section>
            </div>
            <!-- 第三部分 -->
            <div class="partThree">
               <h4 class="partThreeTitle">三、各渠道落地页分析</h4>
               <p class="partThreeDes">
                   各类渠道落地页流量和质量分析：描述了4类一级访问来源的落地页流量分布和跳出率情况；<br/>搜索词与落地页分析：用户搜索词往往表明了用户的搜索意向，落地页与用户上午意向不匹配也会造成落地页跳出率变高；SEM中用户的搜索词与落地页不匹配会造成投放资源浪费；<br/>广告流量与落地页分析：自主投放的广告您可以自主配置投放落地页和广告创意；如果广告创意和落地页不符也会导致落地页的跳出率较高，自主投放广告追踪最多支持5个参数，您可以通过配置UTM参数来实现。
               </p> 
               <section class="partThreeMain">
                   <div class="col-xs-12" v-for="(item,index) in box.partThree">
                       <userRetentionTable :partTwoData="box.partThree[index]"></userRetentionTable>
                   </div>
               </section>
            </div>
        </div>






    </div>
</template>

<script>
import userRetentionLineChart from '@/components/main/analysis/userRetention/userRetention-lineChart'
import userRetentionBarChart from '@/components/main/analysis/userRetention/userRetention-barChart'
import userRetentionTable from '@/components/main/analysis/userRetention/userRetention-table'
export default {
    name : 'userRetention',
    data() {
        return {
            box:{
                partOne:[
                    {
                        title: "落地页访问量分布",//标题
                        des: "落地页访问量分布",//描述
                        dates:"2018-03-26-2018-03-26",//日期
                        id : "partTwo1",
                        chartX:[1,2,5,8],
                        chartY:["/case/index.html","/products/index.html","/casess/index.html",'/'],
                        isOnlyOne:false, //是否只有一组数据
                        isNull: false, //是否显示暂无数据
                        chartWidth: 0//宽度
                    },
                    {
                        title: "新访问用户量趋势",//标题
                        des: "新访问用户量趋势",//描述
                        dates:"2018-03-26-2018-03-26",//日期
                        chartTitle:"访问量",
                        cycle:["/case/index.html","/products/index.html","/casess/index.html",'/'],// 周期
                        id : "2",
                        chartX:['17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05','17/05'],
                        chartY1:[800, 300, 500, 800, 300, 600, 500, 600,200],
                        chartY2:[600, 300, 400, 200, 300, 300, 200, 400,800],
                        chartY3:[300, 100, 20, 400, 50, 30, 2, 80,100],
                        chartY4:[200, 350, 43, 60, 150, 200, 20, 100,300],
                        isNull: false, //是否显示暂无数据
                        chartWidth:  0//宽度
                    }
                ],
                partTwo:[
                    {
                        title: "落地页流量和质量分析",//标题
                        des: "落地页流量和质量分析",//描述
                        dates:"2018-03-26-2018-03-26",//日期
                        id : "partTwo",
                        thData:[
                            {field: 'domainName', title: '域名', width: 50, titleAlign: 'center',columnAlign:'center',orderBy:'asc',isResize:true},
                            {field: 'page', title: '页面', width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'desc',isResize:true},
                            {field: 'nb_visits', title: '访问量', width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'desc',isResize:true,titleCellClassName:'td-bg1'},
                            {field: 'bounce_rate', title: '跳出率',width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'desc',isResize:true ,titleCellClassName:'td-bg2'}
                        ],
                        tables:[
                            { 
                                domainName: "www.iblacktree.com",//域名
                                page:'/',//页面
                                nb_visits:5,//访问量
                                bounce_rate:'80.0%' //跳出率
                            },
                            { 
                                domainName: "www.iblacktree.com",//域名
                                page:'/products/index.html',//页面
                                nb_visits:1,//访问量
                                bounce_rate:'80.0%' //跳出率
                            },
                            { 
                                domainName: "www.iblacktree.com",//域名
                                page:'/caseStudy/case-kangshifu.html',//页面
                                nb_visits:1,//访问量
                                bounce_rate:'80.0%' //跳出率
                            },
                            { 
                                domainName: "www.iblacktree.com",//域名
                                page:'/caseStudy/case-privatecinema.html',//页面
                                nb_visits:2,//访问量
                                bounce_rate:'80.0%' //跳出率
                            }
                        ]

                    }
                ],
                partThree:[
                    {
                        title: "各类渠道落地页流量和质量分析",//标题
                        des: "各类渠道落地页流量和质量分析",//描述
                        dates:"2018-03-26-2018-03-26",//日期
                        id : "partThree1",
                        thData:[
                            {field: 'domainName', title: '域名', width: 50, titleAlign: 'center',columnAlign:'center',orderBy:'asc',isResize:true},
                            {field: 'page', title: '页面', width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'desc',isResize:true},
                            {field: 'nb_visits', title: '访问量', width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'desc',isResize:true,titleCellClassName:'td-bg1'},
                            {field: 'bounce_rate', title: '跳出率',width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'desc',isResize:true ,titleCellClassName:'td-bg2'}
                        ],
                        tables:[
                            { 
                                domainName: "www.iblacktree.com",//域名
                                page:'/',//页面
                                nb_visits:5,//访问量
                                bounce_rate:'80.0%' //跳出率
                            },
                            { 
                                domainName: "www.iblacktree.com",//域名
                                page:'/products/index.html',//页面
                                nb_visits:1,//访问量
                                bounce_rate:'80.0%' //跳出率
                            },
                            { 
                                domainName: "www.iblacktree.com",//域名
                                page:'/caseStudy/case-kangshifu.html',//页面
                                nb_visits:1,//访问量
                                bounce_rate:'80.0%' //跳出率
                            },
                            { 
                                domainName: "www.iblacktree.com",//域名
                                page:'/caseStudy/case-privatecinema.html',//页面
                                nb_visits:2,//访问量
                                bounce_rate:'80.0%' //跳出率
                            }
                        ]

                    },
                    {
                        title: "搜索引擎流量分析",//标题
                        des: "搜索引擎流量分析",//描述
                        dates:"2018-03-26-2018-03-26",//日期
                        id : "partThree2",
                        thData:[
                            {field: 'keywords', title: '搜索词', width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'asc',isResize:true},
                            {field: 'domainName', title: '域名', width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'asc',isResize:true},
                            {field: 'page', title: '页面', width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'desc',isResize:true},
                            {field: 'nb_visits', title: '访问量', width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'desc',isResize:true,titleCellClassName:'td-bg1'},
                            {field: 'bounce_rate', title: '跳出率',width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'desc',isResize:true ,titleCellClassName:'td-bg2'}
                        ],
                        tables:[
                            { 
                                keywords : "黑叔科技",
                                domainName: "www.iblacktree.com",//域名
                                page:'/',//页面
                                nb_visits:5,//访问量
                                bounce_rate:'80.0%' //跳出率
                            }
                        ]
                    },
                    {
                        title: "广告流量与落地页分析",//标题
                        des: "广告流量与落地页分析",//描述
                        dates:"2018-03-26-2018-03-26",//日期
                        id : "partThree3",
                        thData:[
                            {field: 'advertisingSource', title: '广告来源', width: 100, titleAlign: 'center',columnAlign:'center',orderBy:'asc',isResize:true},
                            {field: 'advertisingContent', title: '广告来源', width: 100, titleAlign: 'center',columnAlign:'center',orderBy:'asc',isResize:true},
                            {field: 'domainName', title: '域名', width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'asc',isResize:true},
                            {field: 'page', title: '页面', width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'desc',isResize:true},
                            {field: 'nb_visits', title: '访问量', width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'desc',isResize:true,titleCellClassName:'td-bg1'},
                            {field: 'bounce_rate', title: '跳出率',width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'desc',isResize:true ,titleCellClassName:'td-bg2'}
                        ],
                        tables:[
                            { 
                                advertisingSource : "微信",
                                advertisingContent:"黑树good",
                                domainName: "www.iblacktree.com",//域名
                                page:'/',//页面
                                nb_visits:5,//访问量
                                bounce_rate:'80.0%' //跳出率
                            }
                        ]
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
        userRetentionLineChart:userRetentionLineChart,
        userRetentionBarChart:userRetentionBarChart,
        userRetentionTable:userRetentionTable,
    }
}
</script>

<style scoped>
    /*顶部*/
    .userRetention{
        margin-bottom: 30px;
    }
    .top-box{
        width: 100%;
        padding:10px 20px;
        box-sizing: border-box;
    }
    .userRetention-btn{
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
    .userRetention-btn .anticon {
        transition: margin-left .3s cubic-bezier(.645,.045,.355,1);
    }

    .userRetention-btn>.anticon {
        line-height: 1;
    }

    .userRetention-btn>i, .top-choosedate-btn>span {
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
    .userRetention-main{
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
    .partOneTitle,.partTwoTitle,.partThreeTitle{
        font-weight: 600;
    }
    .partOneTitleSpan{
        font-weight: 500;
    }
    .partOneDes,.partTwoDes,.partThreeDes{
        font-size: 12px; 
        padding-left: 15px;
        box-sizing: border-box; 

    }
    .partOneMain>div,.partTwoMain>div,.partThreeMain>div{
        margin-bottom:10px;
        padding:0 5px;
    }
    .partThreeMain{
        overflow:hidden;
        height: auto;
    }
    .partTwo,.partThree{
        margin-top: 10px;

    }
    .partTwoTitle,.partThreeTitle{
        font-size: 14px;
        font-weight: 600;
        color: #000;
        padding-left: 15px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
</style>
