<template>
    <a-table
            :columns="columns"
            :dataSource="data"
            :loading="loading"
            :pagination="pagination"
            @change="handleTableChange"
    >
        <a-button :loading="record.loading" v-if="(record.remain !== '已结束') && (record.stock > 0)"  type="primary" ghost slot="action" href="javascript:;" slot-scope="record" @click="spike(record)">秒杀</a-button>
    </a-table>

</template>

<script>
    import Vue from 'vue'
    import { Table } from 'ant-design-vue';
    Vue.use(Table);
    const columns = [
        { title: 'ID', sorter: true,width: '10%',dataIndex: 'id', key: 'id' },
        { title: '名称',width: '10%', dataIndex: 'name', key: 'name' },
        { title: '描述', width: '40%',dataIndex: 'detail', key: 'detail' },
        { title: '余量', width: '10%',dataIndex: 'stock', key: 'stock' },
        { title: '剩余时间',width: '20%', dataIndex: 'remain', key: 'remain' },
        { title: '秒杀', width: '10%',dataIndex: '', key: 'spike', scopedSlots: { customRender: 'action' } },
    ];

    export default {
        mounted() {
            this.fetch();
        },
        data() {
            return {
                data:[],
                columns,
                selectedRowKeys: [],
                pagination: {},
                loading: false,
            }
        },
        methods:{
            spike(record){
                if (this.$store.state.isLogin === false) {
                    this.$router.push("/user/login");
                }else{
                    record.loading = true;
                    this.$axios.post("http://api.moesome.com/spike_order/"+record.id,{},{withCredentials: true})
                        .then((response) => {
                            record.loading = false;
                            let data = response.data;
                            if (data.code === 0){
                                this.showSuccessMsg("秒杀成功")
                                record.stock--;
                            }else{
                                this.showWrongMsg(data.code===-652?"已经秒杀过了":data.message)
                            }
                        })
                        .catch(function () {
                            record.loading = false;
                        });
                }
            },

            handleTableChange (pagination, filters, sorter) {
                //console.log(pagination);
                //console.log(filters);
                //console.log(sorter);
                const pager = { ...this.pagination };
                pager.current = pagination.current;
                this.pagination = pager;
                this.fetch({
                    results: pagination.pageSize,
                    page: pagination.current,
                    sortField: sorter.field,
                    sortOrder: sorter.order,
                    ...filters,
                });
            },
            fetch (params = {}) {
                this.loading = true
                let page;
                if (params.page === undefined){
                    page = 1;
                }else{
                    page = params.page;
                }
                this.$axios.get('http://api.moesome.com/spike/index/'+page+"?order="+params.sortOrder,{withCredentials: true}
                ).then((response) => {
                    console.log("index:")
                    console.log(response)
                    const pagination = { ...this.pagination };
                    pagination.total = response.data.count;
                    let now = response.data.now;
                    this.loading = false;
                    let list = response.data.object;
                    for (let i = 0;i < list.length;i++) {
                        let item = list[i];
                        item.key = item.id;
                        if (item.stock === -1){
                            item.stock = "无限";
                        }
                        item.now = this.$dateFormat(now);
                        item.startAt = this.$dateFormat(item.startAt);
                        item.endAt = this.$dateFormat(item.endAt);
                        let remainStamp = item.endAt - item.now;
                        if (remainStamp < 0){
                            item.remain = "已结束";
                        }else{
                            let beforeStamp = item.startAt - item.now;
                            if (beforeStamp > 0){
                                item.remain = "距离开始还有："+this.$convertTimestampToString(beforeStamp);
                            }else{
                                item.remain = this.$convertTimestampToString(remainStamp);
                            }

                        }
                        item.loading = false;
                    }
                    this.data = list;
                    this.pagination = pagination;
                }).catch(function (e) {
                    console.log(e)
                });
            },
            showWrongMsg(msg){
                this.$modal.error(({
                    title: '发生错误',
                    content: msg,
                }));
            },
            showSuccessMsg(msg){
                this.$modal.success(({
                    title: '成功',
                    content: msg,
                }));
            },
        }
    }
</script>

<style scoped>

</style>