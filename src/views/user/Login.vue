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
                    :loading="btnLoading"
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
    import { Modal } from 'ant-design-vue';
    Vue.use(Modal);
    export default {
        name: "Login",
        data () {
            return {
                thisForm: this.$form.createForm(this),

                btnLoading: false
            };
        },
        methods: {
            showMsg(msg){
                Modal.error(({
                    title: '发生错误',
                    content: msg,
                }));
            },
            handleSubmit(e) {
                e.preventDefault();
                this.thisForm.validateFields((err, values) => {
                    if (!err) {
                        this.btnLoading = true;
                        this.$axios.post('http://api.moesome.com/login', {
                            "username" : values.username,
                            "password" : this.$md5(values.password),
                            },{withCredentials: true})
                            .then((response) => {
                                this.btnLoading = false;
                                if (response.data.code === 0){
                                    this.$router.push("/spike/index");
                                    this.$store.commit("login",response.data.user);
                                }else{
                                    this.btnLoading = false;
                                    this.showMsg(response.data.message);
                                }
                            })
                            .catch(function () {
                                this.btnLoading = false;
                                this.showMsg("未知错误")
                            });
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>