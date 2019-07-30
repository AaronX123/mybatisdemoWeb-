<template>
    <div class="login_wrapper">
        <div class="login">
            <el-form :model="formLogin">
                <el-form-item>
                    <h2 class="title">后台管理系统</h2>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="formLogin.loginName" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="password" v-model="formLogin.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login(formLogin)">登陆</el-button>
                    <span v-show="this.errorInfo.isShowError" class='error'>
                        {{this.errorInfo.text}}
                    </span>
                </el-form-item>

            </el-form>
            
        </div>
    </div>
</template>

<style lang="scss">
$input_width:300px;

.login_wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .login {
        width: 460px;
        height: 296px;
        margin-top: -150px;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            text-align: center;
            color: #505458;
        }
        .el-form-item__content {
            width: $input_width;
        }
        .el-button {
            width: $input_width;
        }
        .el-form {
            margin: 30px 80px auto 80px;
            .error {
                display: block;
                text-align: center;
                color: red;
            }
        }
    }
}
.recover{
    position:absolute;
    bottom:0px; 
    cursor:pointer; 
    color:#E6A23C;
    // display: none;
}
.bei{
    position:absolute;
    bottom:20px; 
    cursor:pointer; 
    color:#505458;
}
</style>

<script>
    import Axios from 'axios'
export default {
    name: 'login',
    data() {
        return {
            formLogin: {   //表单对象
                loginName: '',
                password: ''
            },
            errorInfo: {
                text: '登陆失败,请重试',
                isShowError: false //显示错误提示
            }

        }
    },
    mounted() {
        document.onkeydown = (event) => {
            var router=this.$route.path;
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13&&this.$route.path=='/login') { // enter 键 
                this.login();
            }
        };
    },
    methods: {
        login:function ({loginName,password}) {
            if (loginName==''||loginName==null||password==''|password==null){
                alert("用户名或密码不能为空！！");
                return false;
            }
            var data={
                username:loginName,
                password:password
            }
            var CommonRequest = {
                url:"http:localhost:8090/user/login",
                method:"POST",
                data:data
            };
            Axios({
                method:'POST',
                baseURL:"/api/user/login",
                data:CommonRequest
            }).then(CommonResponse => {
                if (CommonResponse && CommonResponse.data.status=="success"){
                    //获取用户名和id
                    var username=CommonResponse.data.data.name;
                    var id=CommonResponse.data.data.id;
                    //将用户存在session中
                    sessionStorage.setItem(id,username);
                    alert("欢迎"+username+"登陆");
                    this.$router.replace({ path: "/dictionary" });
                }else {
                    alert(CommonResponse.data.data.errorMessage);
                }
            })
        },

    }
}
</script>
