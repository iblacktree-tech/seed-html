<template>
    <div class="pageMain">
        <p>fenxi</p>
    </div>
</template>

<script>
export default {
    name : 'pageMain',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    computed:{
        setHomeMsg(){
            return this.$store.state.homeMsg;
        },
    },
    methods:{
        addBtnFn(){
            this.$store.commit('setHomeMsg',{
                msg:'你好'
            })
        },
    }
}
</script>

<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
    .hello1{
        background: red;
    }
</style>
