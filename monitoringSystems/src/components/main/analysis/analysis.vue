<template>
    <!-- 分析 -->
    <div class="analysis">
        <!-- 渠道与来源 -->
        <channelsAndSources v-if="itemindex==1"></channelsAndSources>
        <!-- 落地页 -->
        <landingPage v-else-if="itemindex==2"></landingPage>
        <!-- 用户留存 -->
        <userRetention v-else-if="itemindex==3"></userRetention>
        




    </div>
</template>

<script>
import channelsAndSources from '@/components/main/analysis/channelsAndSources'
import landingPage from '@/components/main/analysis/landingPage'
import userRetention from '@/components/main/analysis/userRetention'
export default {
    name : 'analysis',
    data() {
        return {
            itemindex : ''
        }
    },
    computed:{
        itemIndex(){
            return this.$store.state.analysis.itemIndex;
        },
    },
    mounted(){
        this.init();
    },
    watch:{
        itemIndex(){
            this.a();
        }
    },
    methods:{
        init(){
            this.itemindex = this.$route.params.id;
        },
        a(){
            // 下标
            // this.itemindex = sessionStorage.getItem('analysisIndex')
            this.itemindex = this.$route.params.id;
            console.log(this.itemIndex)
            console.log("ccccc")
        }
    },
    components:{
        channelsAndSources:channelsAndSources,
        landingPage:landingPage,
        userRetention:userRetention,

    }
}
</script>

<style scoped>
    
</style>
