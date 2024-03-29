<template>
    <h1>{{hello}}</h1>
</template>

<!-- no scope for app.vue, style defined here is global for the app -->
<style>
html {
    overflow-y: auto !important;
    overflow-x: hidden !important;
}
</style>

<script>


export default {
    name: "App",
    components: {},
    data() {
        return {
            hello: "Hello Custom Widgets from VueJS :)"
        };
    },
    computed: {
        message() {
            return this.$store.state.message;
        }
    },
    watch: {},
    mounted() {},
    methods: {}
};
</script>
