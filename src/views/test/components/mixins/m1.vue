<template>
    <div>
        <button @click="changeFn">我是m{{name}}</button>
        <button @click="littleFn">减减{{num2}}</button>
    </div>
</template>

<script>
import { addButton } from "./mixins.js"
export default {
    name: 'JjjjM1',
mixins: [addButton],
    data() {
        return {
          name:1,
          num2:10
        };
    },

    methods: {
        // changeFn(){
        //     this.name++
        // }
        littleFn(){
         this.num2--
        }
    },
};
</script>

<style lang="scss" scoped>

</style>