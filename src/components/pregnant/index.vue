<template>
    <div>
        <div class="item">
            <el-input v-model="input" placeholder="请输入内容"></el-input>
            周
        </div>
        <div class="item">
            婴
            <el-input v-model="input" placeholder="请输入内容"></el-input>
            个月
        </div>        
    </div>
</template>
<script>
export default {
    props: {

    }
}
</script>

<style lang="ts" scoped>
.item {
    display: inline-flex;
    align-self: center;
    justify-content: center;
    border: 1px solid #ccc;
}
.el-input {
    border: none;
}
</style>