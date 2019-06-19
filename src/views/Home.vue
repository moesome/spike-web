<template>
    <div id="content">
        <a-row type="flex" justify="start">
            <a-col id="title" :span="12" :offset="6">这里是 <del id="del">我的练手项目</del> MoeGift</a-col>
        </a-row>
        <a-row type="flex" justify="start" style="margin-top: 50px;">
            <a-col :span="4" :offset="1">你可以在这里：</a-col>
        </a-row>
        <a-row type="flex" justify="start" style="margin-top: 30px">
            <a-col :span="23" style="font-size: 40px" :offset="1">买各种虚拟物品，送各种虚拟物品。</a-col>
            <a-col :span="23" style="font-size: 16px;margin-top: 20px" :offset="1">但在此之前需要小小的注册一下（密码不限制长度和复杂度，经过多次加密。）</a-col>
        </a-row>
        <a-row type="flex" justify="end"  style="margin-top: 100px;">
            <a-col id="title" :span="4">玩得愉快</a-col>
        </a-row>
    </div>
</template>

<script>
    export default {
        name: "Home",
        mounted() {

        },
        methods:{

        }
    }
</script>

<style scoped>
    #content{
        font-family: "Microsoft YaHei UI",serif;
        font-size: 20px;
    }
    #title{
        font-size: 26px;
    }
    #del{
        text-decoration-color: red;
        font-size: 20px;
    }
</style>