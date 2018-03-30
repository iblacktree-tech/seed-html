<template>
    <!-- 分析 -->
    <div class="analysis">
        <!-- 渠道与来源 -->
        <channelsAndSources v-if="itemindex==1"></channelsAndSources>
        <!-- 落地页 -->
        <landingPage v-else-if="itemindex==2"></landingPage>
        <!-- 用户留存 -->
        <userRetention v-else-if="itemindex==3"></userRetention>
        <!-- 日期弹框 -->
        <analysisDateModal v-show="anis=='on'" :class='{"actives":anis=="on"}' class="tk"></analysisDateModal>
    </div>
</template>

<script>
import channelsAndSources from '@/components/main/analysis/channelsAndSources/channelsAndSources'
import landingPage from '@/components/main/analysis/landingPage/landingPage'
import userRetention from '@/components/main/analysis/userRetention/userRetention'
import analysisDateModal from '@/components/main/analysis/analysis-dateModal'
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
        anis(){
            return this.$store.state.analysis.modalIsShow;
        }
    },
    mounted(){
        this.init();
    },
    watch:{
        itemIndex(){
            this.init();
        },
        anis(){
            // console.log(this.anis )
        }
    },
    methods:{
        init(){
            this.itemindex = this.$route.params.id;
        }
    },
    components:{
        channelsAndSources:channelsAndSources,
        landingPage:landingPage,
        userRetention:userRetention,
        analysisDateModal:analysisDateModal
    }
}
</script>

<style scoped>
    
</style>
