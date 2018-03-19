<template>
    <div class="overview">
        <!-- 右侧导航 -->
        <overviewTop></overviewTop>
        <!-- 主体 -->
        <overviewMain></overviewMain>
    </div>
</template>

<script>
import overviewTop from '@/components/main/overview/overview-top'
import overviewMain from '@/components/main/overview/overview-main'
export default {
    name : 'overview',
    data() {
        return {
            
        }
    },
    created(){
        
    },
    computed:{
        
    },
    methods:{
        // changIndexItem(){
            
        // },
    },
    components:{
        overviewTop : overviewTop,
        overviewMain : overviewMain
    }
}
</script>

<style scoped>
    .overview {
      width: 100%;
      height: 100%;
      margin: 0;
      /*position: relative;*/
      /*overflow-y: auto;*/
      padding: 0px 30px 80px;
    }
</style>
