<template>
    <div>
        <button @click="changeFn">我是m{{name}}</button>
    </div>
</template>

<script>
import { addButton } from "./mixins.js"
export default {
    name: 'JjjjM2',
  mixins: [addButton],
    data() {
        return {
            name:2 
        };
    },

    mounted() {
        
    },

    // methods: {
    //      changeFn(){
    //         this.name++
    //     }
    // },
};
</script>

<style lang="scss" scoped>

</style>