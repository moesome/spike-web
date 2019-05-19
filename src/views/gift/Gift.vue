<template>
    <div>
        <a-table
                :columns="columns"
                :dataSource="data"
                :loading="loading"
                :pagination="pagination"
                @change="handleTableChange"
        >
            <a-button :loading="record.loading"  type="primary" ghost slot="action" href="javascript:;" slot-scope="record" @click="modify(record)">发货</a-button>
        </a-table>
    </div>
</template>

<script>
    const columns = [
        { title: '订单号', sorter: true,width: '20%',dataIndex: 'id', key: 'id' },
        { title: '收货人', width: '20%',dataIndex: 'receive_name', key: 'receive_name' },
        { title: '名称',width: '20%', dataIndex: 'name', key: 'name' },
        { title: '描述', width: '20%',dataIndex: 'detail', key: 'detail' },
        { title: '发货', width: '20%',dataIndex: '', key: 'send', scopedSlots: { customRender: 'action' } },
    ];

    export default {
        name: "Gift.vue",
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
                this.$axios.get('http://api.moesome.com/sends',{withCredentials: true}
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