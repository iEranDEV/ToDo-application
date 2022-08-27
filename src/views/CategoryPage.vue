<template>
    <p>Kategoria - {{ id }}</p>
</template>

<script>

export default {
    data() {
        return {
            id: null
        }
    },
    mounted() {
        this.id = this.$route.params.id;
        console.log(this.id)
    }
}
</script>

<style scoped>

</style>