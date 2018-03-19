<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
// var echarts = require('echarts');
export default {
    name: 'App'
}
</script>

<style>
    @import './assets/css/baseStyle.css'
    *{
        margin:0;
        padding:0;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
        overflow-y: auto;
    }
</style>
