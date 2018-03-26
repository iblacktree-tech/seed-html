<template>
    <!-- 分析 -->
    <div class="landingPage">
        <!-- 顶部 -->
        <div class="top-box">
            <!-- 右侧 日期btn-->
            <button type="button" class="landingPage-btn pull-right" >
                <i class="anticon glyphicon glyphicon-list-alt"></i>
                <span>昨天</span>
            </button>
            <!-- 标题 -->
            <div class="itemTitleBox">
                <h2 class="itemTitle">落地页</h2>
                <button type="button" class="btn btn-default btn-xs pull-left" aria-label="Left Align">
                    昨天
                    <span class="glyphicon glyphicon-remove " aria-hidden="true"></span>
                </button>
            </div>
        </div>
        <!-- 主体模块 -->
        <div class="landingPage-main">
            <!-- 标题及描述 -->
            <div>
                <h3 class="m-tittle">渠道分析</h3>
                <p class="m-tittle-des">
                    针对web端，包含“全渠道概况”，“各类渠道流量分布及趋势”，“各明细渠道深度评估”三个模块。其中，“各明细渠道深度评估”从获客能力、拉新能力、获客质量三个角度，准确甄别优劣渠道，帮助您提升渠道投放ROI
                </p>
            </div>
            <!-- 底部细分模块 第一部分 -->
            <div>
                <h4 class="partOneTitle">一、全渠道概况：<span class="partOneTitleSpan">整体描述了全渠道的获客能力及拉新能力</span></h4>
                <p class="partOneDes">
                    获客能力：“访问用户量”和“登录用户量”代表了获客规模<br/>拉新能力：“新访问用户量”和“新登录用户量”和各自的占比，反映了拉新能力
                </p>
                <section class="partOneMain">
                       
                </section>
            </div>
        </div>






    </div>
</template>

<script>
// import channelsAndSources from '@/components/main/landingPage/channelsAndSources'
export default {
    name : 'landingPage',
    data() {
        return {

        }
    },
    computed:{
        // itemIndex(){
        //     return this.$store.state.landingPage.itemIndex;
        // },
    },
    mounted(){
        this.a();
    },
    watch:{
        itemIndex(){
            this.a();
        }
    },
    methods:{
        a(){
            // console.log(this.itemIndex)
        }
    },
    components:{
        // channelsAndSources:channelsAndSources
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
    .landingPage-btn{
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
    }
    .landingPage-btn .anticon {
        transition: margin-left .3s cubic-bezier(.645,.045,.355,1);
    }

    .landingPage-btn>.anticon {
        line-height: 1;
    }

    .landingPage-btn>i, .top-choosedate-btn>span {
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
        position: absolute;
        left: 20px;
        top: 80px;
    }
    .itemTitle{
        font-size: 16px;
        font-weight: 700;
        color: #333;
        text-indent: 5px;
    }
    .itemTitleBox button{
        background-color: #ccc;
        color:#fff;
        font-size: 12px;
    }
    /*主体模块*/
    .landingPage-main{
        width: 100%;
        text-align: left;
        margin-top: 50px;
        padding:10px 25px;
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
    .partOneTitle{
        font-weight: 600;
    }
    .partOneTitleSpan{
        font-weight: 500;
    }
    .partOneDes{
        font-size: 12px; 
        padding-left: 15px;
        box-sizing: border-box; 

    }
</style>
