<template>

</template>

<script>
export default {
    methods: {
        logout: function () {
            this.$store.commit({
                type: "logout"
            });
            // this.$router.push("/");
            location.href = "/";
        },
    },
    created: function () {
        this.logout();
    },
}
</script>