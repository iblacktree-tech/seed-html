<template>
    <div class="overview-main">
        <div class="row main-box-container">
            <div class='col-xs-6' v-for="(item, index) in chartDatas"></div>
        </div>
    
    </div>
</template>

<script>
import chartsBox from '@/components/main/overview/overview-chartsBox'
import chartsBox2 from '@/components/main/overview/overview-chartsBox2'
export default {
    name : 'overview-main',
    data() {
        return {

        }
    },
    created(){

    },
    computed:{
        chartDatas(){
            return this.$store.state.overview.chartsData;
        },
    },
    methods:{

    },
    components:{
        chartsBox : chartsBox,
        chartsBox2 : chartsBox2
    }
}
</script>

<style scoped>
    .main-box-container{
      height: auto;
      position: relative;
      transition: height .2s ease;
      padding:0;
    }
</style>
