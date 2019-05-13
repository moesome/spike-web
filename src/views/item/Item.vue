<template>
    <div>
        <a-button type="danger" @click="submit">点我</a-button>
        {{$route.params}}
    </div>
</template>

<script>
    export default {
        name: "Item",
        methods:{
            submit(){
                let me = this;
                this.$axios.patch('http://api.moesome.com/item/'+this.$route.params.itemId
                    ,{},{withCredentials: true})
                    .then(function resolve() {

                    })
                    .catch(function () {

                    });
            }
        }
    }
</script>

<style scoped>

</style>