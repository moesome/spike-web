<template>
    <div>
        <router-link :to="{ name: 'spikes.create'}"><a-button type="primary" icon="plus" style="margin-bottom: 10px"></a-button></router-link>
        <a-table
                :columns="columns"
                :dataSource="data"
                :loading="loading"
                :pagination="pagination"
                @change="handleTableChange"
        >
            <a-button :loading="record.loading"  type="primary" ghost slot="action" href="javascript:;" slot-scope="record" @click="modify(record)">修改</a-button>
        </a-table>
    </div>

</template>

<script>
    const columns = [
        { title: 'ID', sorter: true,width: '10%',dataIndex: 'id', key: 'id' },
        { title: '名称',width: '10%', dataIndex: 'name', key: 'name' },
        { title: '描述', width: '20%',dataIndex: 'detail', key: 'detail' },
        { title: '库存', width: '10%',dataIndex: 'stock', key: 'stock' },
        { title: '开始时间',width: '20%', dataIndex: 'startAt', key: 'startAt' },
        { title: '剩余时间',width: '20%', dataIndex: 'endAt', key: 'endAt' },
        { title: '修改', width: '20%',dataIndex: '', key: 'spike', scopedSlots: { customRender: 'action' } },
    ];

    export default {
        name: "Manage.vue",
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
                timer: null  // 定时器名称
            }
        },
        methods:{
            modify(record){
                this.$router.push({ name: 'spikes.edit', params: { id: record.id }});
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
                if (params.sortOrder === undefined){
                    params.sortOrder = 'descend'
                }
                this.$axios.get('http://api.moesome.com/spikes/manage?page='+page+"&order="+params.sortOrder,{withCredentials: true}
                ).then((response) => {
                    console.log("index:")
                    console.log(response)
                    const pagination = { ...this.pagination };
                    pagination.total = response.data.count;
                    this.loading = false;
                    let list = response.data.object;
                    for (let i = 0;i < list.length;i++) {
                        let item = list[i];
                        item.key = item.id;
                        item.startAt = this.$dateFormat(item.startAt).toLocaleString();
                        item.endAt = this.$dateFormat(item.endAt).toLocaleString();
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