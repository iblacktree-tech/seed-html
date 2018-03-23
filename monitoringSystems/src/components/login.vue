<template>
    <div class="login">
        <!-- 登录 -->
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">SEED - admin</a>
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="col-md-4 col-md-offset-4">
                <div class=" panel panel-default">
                    <div class="panel-body">
                        <div class="form-group">
                            <label for="username">账号</label>
                            <input type="text" class="form-control" id="username" placeholder="请输入" v-model="username">
                        </div>
                        <div class="form-group">
                            <label for="password">密码</label>
                            <input type="password" class="form-control" id="password" placeholder="" v-model="password" v-on:keyup.enter="loginIn">
                        </div>
                        <div class="text-center">
                            <a href="javascript:;" id="logon-submit" class="btn btn-primary" @click="loginIn" >　登录　</a>
                            <a href="forgetpwd.html" class="btn btn-default" >忘记密码</a>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template> 
<script>

export default {
    name : 'login',
    data() {
        return {
           username:'test01',
           password:'test01'
        }
    },
    computed:{
        ajaxCanShu(){
            return this.$store.state.ajaxCanShu;
        }
    },
    created(){
      // this.ajax()
    },
    mounted(){
        this.getDay();  
    },
    methods:{
        loginIn(){
            this.$http.get('/api/gl/logon', {
                params: {
                    'username': this.username,
                    'password': this.password
                }
            },{
                emulateJSON: true,
                credentials: true
            }).then(function(resp) {
                // console.log(resp.body.logon)
                if(resp.body.logon){
                  alert('登录成功')
                  // console.log('登录成功')
                  this.getCanshu()
                  
                }else{
                  alert('账号或密码错误，请重试')
                  // console.log('账号或密码错误，请重试')
                }
            },function(resp){
                alert('登录失败，请重试')
            }); 
        },
        // 获取昨天日期
        getDay() {
            var now = new Date()
            var date = new Date(now.setDate(now.getDate() - 1));
            var myyear = date.getFullYear();
            var mymonth = date.getMonth() + 1;
            var myweekday = date.getDate();
            if (mymonth < 10) {
                mymonth = "0" + mymonth;
            }
            if (myweekday < 10) {
                myweekday = "0" + myweekday;
            }
            let days = myyear + "-" + mymonth + "-" + myweekday
            sessionStorage.setItem('days',days);
        },
        //获取页面参数 siteid 及网站列表数据 当前登录的用户名称
        getCanshu(){  
            this.$http.get('/api/gl/getuserapp', {
            },{
                credentials: true,
                emulateJSON: true
            }).then(function(data){  
                // console.log(data.body.data)
                let siteid =data.body.data[0].siteid
                // console.log(siteid)
                // 会话存贮
                sessionStorage.setItem('siteId',siteid)
                sessionStorage.setItem('period','day')
                // 网站列表数据
                sessionStorage.setItem('webList',JSON.stringify(data.body.data))
                // console.log(this.ajaxCanShu)

                // 获取当前登录账号账号名
                this.$http.get('/api/gl/getuser', {

                },{
                    credentials: true,
                    emulateJSON: true
                }).then(function(data) {
                    // 当前登录的用户名称
                    sessionStorage.setItem('userName',data.body.data.username);
                    // 默认 概览显示 nav 下标
                    sessionStorage.setItem('navItemIndex',0)
                    // 页面转跳到home
                    this.$router.push('/home/overview');

                },function(err){
                    console.log(err.status)
                });

                
            },function(err){
                console.log(err.status)
            });

            // if (true) {}
        }
    },
    components:{

    }
}
</script>

<style scoped>
.login{
    margin-top: 90px;
}
</style>
