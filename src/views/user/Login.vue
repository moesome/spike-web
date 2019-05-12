<template>
    <a-form
            :form="thisForm"
            @submit="handleSubmit"
    >
        <a-form-item
                label="用户名"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 8 }"
        >
            <a-input
                    v-decorator="['username',{rules: [{ required: true, message: '请输入用户名!' }]}]"
            />
        </a-form-item>

        <a-form-item
                label="密码"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 8 }"
        >
            <a-input
                    v-decorator="['password',{rules: [{ required: true, message: '请输入密码!' }]}]"
            />
        </a-form-item>
        <a-form-item
                :wrapper-col="{ span: 12, offset: 8}"
        >
            <a-button
                    type="primary"
                    html-type="submit"
                    size = "large"
                    style="width: 30%"
            >
                登录
            </a-button>

            <a-button
                    type="primary"
                    html-type="submit"
                    style="margin-left: 40px;width: 30%"
                    size = "large"
            >
                注册
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script>
    import Vue from 'vue'
    import { Form } from 'ant-design-vue';
    Vue.use(Form);
    import { Input } from 'ant-design-vue';
    Vue.use(Input);
    export default {
        name: "Login",
        data () {
            return {
                thisForm: this.$form.createForm(this),
            };
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.thisForm.validateFields((err, values) => {
                    if (!err) {
                        let me = this;
                        this.$axios.post('http://localhost:8080/login', {
                            "username" : values.username,
                            "password" : me.$md5(values.password),
                        })
                            .then(function resolve(response) {
                                if (response.data.status === 200){
                                    me.$router.push("/temp");
                                    me.$store.commit("login");
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>