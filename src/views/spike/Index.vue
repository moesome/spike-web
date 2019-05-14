<template>
    <a-table
            :columns="columns"
            :dataSource="data"
            :loading="loading"
            :pagination="pagination"
            @change="handleTableChange"
    >
        <a-button v-show="record.remain !== '已结束'" type="primary" ghost slot="action" href="javascript:;" slot-scope="record" @click="spike(record)">秒杀</a-button>
    </a-table>

</template>

<script>
    import Vue from 'vue'
    import { Table } from 'ant-design-vue';
    Vue.use(Table);
    const columns = [
        { title: 'ID', sorter: true,width: '10%',dataIndex: 'id', key: 'id' },
        { title: '名称', dataIndex: 'name', key: 'name' },
        { title: '描述', dataIndex: 'detail', key: 'detail' },
        { title: '余量', dataIndex: 'stock', key: 'stock' },
        { title: '剩余时间', dataIndex: 'remain', key: 'remain' },
        { title: '秒杀', dataIndex: '', key: 'spike', scopedSlots: { customRender: 'action' } },
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
                console.log(record)
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
                    const pagination = { ...this.pagination };
                    pagination.total = response.data.count;
                    this.loading = false;
                    let list = response.data.spikeList;
                    for (let i = 0;i < list.length;i++) {
                        let item = list[i];
                        item.key = item.id;
                        if (item.stock === -1){
                            item.stock = "无限";
                        }
                        let now = Date.now();
                        item.startAt = this.$dateFormat(item.startAt);
                        item.endAt = this.$dateFormat(item.endAt);
                        let remainStamp = item.endAt - now;
                        if (remainStamp < 0){
                            item.remain = "已结束";
                        }else{
                            item.remain = this.$convertTimestampToString(remainStamp);
                        }
                    }
                    this.data = list;
                    this.pagination = pagination;
                }).catch(function (e) {
                    console.log(e)
                });
            }
        }
    }
</script>

<style scoped>

</style>