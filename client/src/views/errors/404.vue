<template>
    <h1>404 Page Not Found</h1>
    <p>The requested page could not be found.</p>
    <router-link to="/">Hey retour vers le passé</router-link>
</template>

<script>
export default {
    metaInfo() {
        return {
            httpEquiv: [
                {
                    name: 'status',
                    content: this.$route.meta.statusCode.toString(),
                },
            ],
        };
    },
};
</script>
