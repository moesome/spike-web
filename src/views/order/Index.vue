<template>
    <a-table
            :columns="columns"
            :dataSource="data"
            :loading="loading"
            :pagination="pagination"
            @change="handleTableChange"
    >
        <a-button :loading="record.loading" type="primary" ghost slot="action" href="javascript:;" slot-scope="record" @click="get(record)">领取</a-button>
    </a-table>
</template>

<script>
    const columns = [
        { title: 'ID', sorter: true,width: '10%',dataIndex: 'id', key: 'id' },
        { title: '名称',width: '10%', dataIndex: 'name', key: 'name' },
        { title: '描述', width: '40%',dataIndex: 'detail', key: 'detail' },
        { title: '创建时间', width: '20%',dataIndex: 'createdAt', key: 'createdAt' },
        { title: '状态', width: '20%',dataIndex: 'status', key: 'status' },
        { title: '获取奖励', width: '10%',dataIndex: '', key: 'spike', scopedSlots: { customRender: 'action' } },
    ];
    export default {
        name: "Order.vue",
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
            get(record){
                let provided = record.userId;
                let spikeId = record.spikeId;
                let spikeName = record.spikeName;
                let received = this.$store.state.user.id;
                // this.$axios.get('http://api.moesome.com/spike_order/index/'+page+"?order="+params.sortOrder,{withCredentials: true}
                // ).then((response) => {
                //     console.log(response)
                // }).catch(function (e) {
                //     console.log(e)
                // });

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
                this.$axios.get('http://api.moesome.com/spike_orders?page='+page+"&order="+params.sortOrder,{withCredentials: true}
                ).then((response) => {
                    console.log("index:")
                    console.log(response)
                    const pagination = { ...this.pagination };
                    pagination.total = response.data.count;
                    this.loading = false;
                    let list = response.data.object;
                    for (let i = 0;i < list.length;i++) {
                        let item = list[i];
                        item.key = item.spikeOrderId;
                        item.id = item.spikeOrderId;
                        item.name = item.spikeName;
                        item.createdAt = this.$dateFormat(item.spikeOrderCreatedAt).toLocaleString();
                        /**
                         *   1.正常
                             2.用户取消
                             3.所有者取消
                             4.用户已申请兑奖
                             5.所有者已发送奖品
                         */
                        switch (item.status) {
                            case 1:
                                item.status = "正常";
                                break;
                            case 2:
                                item.status = "用户取消";
                                break;
                            case 3:
                                item.status = "所有者取消";
                                break;
                            case 4:
                                item.status = "用户已申请兑奖";
                                break;
                            case 5:
                                item.status = "所有者已发送奖品";
                                break;
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