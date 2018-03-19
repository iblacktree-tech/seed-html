<template>
    <div class="overview-top">
        <!-- 右侧导航 -->
        <div class="top-menu-box">
            <div class="main-top-menu-bar">
                <div class="top-menu-container">
                    <div class="btn-group top-menu-group" role="group" aria-label="">
                      <button type="button" v-for="(item, index) in ovTopBtn" class="btn btn-default top-group-btn" :class="{'top-group-btn-active': !item.dis}"  v-bind:disabled="item.dis">{{item.text}}</button>
                    </div>
                </div>
                <button type="button" class="top-choosedate-btn" @click.stop='modalShow'>
                    <i class="anticon glyphicon glyphicon-list-alt"></i>
                    <span>{{ov.modalDateChose}}</span>
                </button>
            </div>
            <ovDateModal v-show="ov.modalIsShow=='on'" :class='{"actives":ov.modalIsShow}'></ovDateModal>
        </div>
    </div>
</template>

<script>
import ovDateModal from '@/components/main/overview/overview-dateModal'
export default {
    name : 'overview-top',
    data() {
        return {
            ovTopBtn:[
                {"text":'网页','dis':false},
                {"text":'移动应用','dis':true},
                {"text":'IOS','dis':true},
                {"text":'Android','dis':true}

            ],
            isShow: false
        }
    },
    computed:{
        ov(){
            return this.$store.state.overview;
        },
    },
    created(){

    },
    methods:{
        // 弹框的显示与隐藏
        modalShow(){
          if (this.ov.modalIsShow=='on') {
            this.$store.commit('overviewData',{
                modalIsShow : 'off'
            })
          }else{
            this.$store.commit('overviewData',{
              modalIsShow : 'on'
            })
          }
        }
    },
    components:{
        ovDateModal : ovDateModal
    }
}
</script>

<style scoped>
    .main-box-bar{
      /*min-height: 550px;*/
      margin: auto;
      padding: 10px 0;
      position: relative;
      overflow-x: hidden;
      /*padding: 20px 30px;*/

    }

    .main-top-menu-bar{
      /*padding: 0 15px 5px;*/
        min-height: 40px;
        z-index: 200;
        width: 100%;
    }


    .top-menu-box{
      text-align: right; 
      padding-top: 5px;
    }

    .top-menu-container{
      display: inline-block; 
      margin-right: 10px;
    }



    .top-menu-group {
        display: inline-block;
        font-size: 12px;
    }

    .top-group-btn{
      margin: 0;
      height: 28px;
      line-height: 26px;
      color: rgba(0,0,0,.65);
      display: inline-block;
      transition: all .3s ease;
      cursor: pointer;
      border-color: #d9d9d9;
      background: #fff;
      padding: 0 16px;
      position: relative;
      font-size: 12px;
    }

    .top-menu-group  .top-group-btn-active.btn-default{
      background-color: #7f7583;
      box-shadow: none!important;
      border-color: #7f7583!important;
      color: #fff;
    }
    .top-menu-group  .top-group-btn-active:hover.btn-default {
        border-color: #7f7583;
        background-color: #7f7583;
        color: rgba(0,0,0,.25);
    }

    .top-choosedate-btn{
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

    .top-choosedate-btn .anticon {
        transition: margin-left .3s cubic-bezier(.645,.045,.355,1);
    }

    .top-choosedate-btn>.anticon {
        line-height: 1;
    }

    .top-choosedate-btn>i, .top-choosedate-btn>span {
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
</style>
