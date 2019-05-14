<template>
    <a-layout id="app">
        <a-layout-sider :collapsed="collapsed" width="200" style="background: #fff">
            <a-menu
                    mode="inline"
                    :defaultSelectedKeys="['1']"
                    :defaultOpenKeys="['']"
                    :style="{ height: '100%', borderRight: 0 }"
            >
                <a-menu-item key="index">
                    <router-link to="/spike/index"><a-icon type="shopping-cart"/>秒杀</router-link>
                </a-menu-item>
                <a-sub-menu key="production">
                    <span slot="title"><a-icon type="shopping-cart" /><span>商品管理</span></span>
                    <a-menu-item key="2"><router-link to="/item/category">分类管理</router-link></a-menu-item>
                    <a-menu-item key="3"><router-link to="/item/brand">品牌管理</router-link></a-menu-item>
                    <a-menu-item key="4">商品列表</a-menu-item>
                    <a-menu-item key="5">规格参数</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="vip">
                    <span slot="title"><a-icon type="crown" /><span>会员管理</span></span>
                    <a-menu-item key="6">会员统计</a-menu-item>
                    <a-menu-item key="7">会员管理</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sold">
                    <span slot="title"><a-icon type="dollar" /><span>销售管理</span></span>
                    <a-menu-item key="8">交易统计</a-menu-item>
                    <a-menu-item key="9">订单管理</a-menu-item>
                    <a-menu-item key="10">物流管理</a-menu-item>
                    <a-menu-item key="11">促销管理</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="permission">
                    <span slot="title"><a-icon type="setting" /><span>权限管理</span></span>
                    <a-menu-item key="12">权限管理</a-menu-item>
                    <a-menu-item key="13">角色管理</a-menu-item>
                    <a-menu-item key="14">人员管理</a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout style="padding: 0 10px 10px">
            <a-layout-header class="header" style="background-color:rgb(145,145,145)">
                <div>
                    <a-row>
                        <a-col :offset="20" :span="4">
                            <a-button v-show="!isLogin" type="dashed" ghost style="margin-right: 30px"><router-link to="/user/login">登录</router-link></a-button>
                            <a-button v-show="!isLogin" type="dashed" ghost><router-link to="/user/register">注册</router-link></a-button>
                            <span v-show="isLogin" id="nickname">{{this.$store.state.user===null?"":this.$store.state.user.nickname}}<a href="#" style="margin-left: 20px;color:white">退出</a></span>
                        </a-col>
                    </a-row>
                </div>
            </a-layout-header>
            <a-breadcrumb separator=">" style="margin: 5px 15px">
                <a-breadcrumb-item v-show="first !== ''">{{first}}</a-breadcrumb-item>
                <a-breadcrumb-item v-show="second !== ''">{{second}}</a-breadcrumb-item>
            </a-breadcrumb>
            <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
                <router-view/>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
    import Vue from 'vue'
    import { Breadcrumb } from 'ant-design-vue';
    Vue.use(Breadcrumb);
    import { Icon } from 'ant-design-vue';
    Vue.use(Icon);
    import { Menu } from 'ant-design-vue';
    Vue.use(Menu);
    import { Button } from 'ant-design-vue';
    Vue.use(Button);

    export default {
        name:"layout",
        data(){
            return {
                collapsed: false,
                first: "",
                second: "",
            }
        },
        mounted(){
            this.updateBreadcrumb();
            // 用 cookies 向服务器拉取用户数据存到 vuex 中
            this.$axios.get("http://api.moesome.com/check",{withCredentials: true})
                .then((response) => {
                    if (response.data.code === 0){
                        console.log(response)
                        this.$store.commit("login",response.data.user);
                    }
                })
                .catch(function () {
                    // 不处理
                });
        },
        updated() {
            this.updateBreadcrumb();
        },
        computed: {
            isLogin () {
                return this.$store.state.isLogin
            }
        },
        methods: {
            updateBreadcrumb(){
                let first = this.$route.fullPath.split("/")[1];
                let second = this.$route.fullPath.split("/")[2];
                switch (first) {
                    case "spike":
                        first = "秒杀";
                        break;
                    case "user":
                        first = "用户";
                        break;
                }
                switch (second) {
                    case "index":
                        second = "总览";
                        break;
                    case "login":
                        second = "登录";
                        break;
                }
                this.first = first;
                this.second = second;
            },
        }
    }
</script>


<style>
    #app{
        min-height:100%;
    }
    #nickname{
        font-size: 20px;
    }
</style>
