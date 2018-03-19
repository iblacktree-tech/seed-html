<template>
    <div class="login" ref="ttttt" data-test001="20">
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
                            <input type="text" class="form-control" id="username" placeholder="请输入" v-model="username" >
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

    },
    mounted(){
      this.consolelog()
    },
    created(){
      // this.ajax()
    },
    methods:{
        consolelog(){
              console.log(this.$refs.ttttt);
              console.log(document.getElementById('username'));
              console.log($('#username').length)
        },
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
                  this.$router.push('/home/overview');
                }else{
                  alert('账号或密码错误，请重试')
                  // console.log('账号或密码错误，请重试')
                }
            },function(resp){
                alert('登录失败，请重试')
            }); 
        }
    },
    components:{
        // pageNav : pageNav,
        // pageMain : pageMain,
    }
}
</script>

<style scoped>
.login{
    margin-top: 90px;
}
</style>
