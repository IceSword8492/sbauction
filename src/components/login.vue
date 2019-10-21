<template>
    <v-card
        class="mx-auto col-10"
    >
        <v-card-title>
            Login
        </v-card-title>
        <form action="/" @submit="login">
            <v-card-text>
                    <v-text-field
                        v-model="mcid"
                        :error-messages="errorMcid"
                        label="Minecraft ID"
                        required
                    />
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn @click="login" text large>Login</v-btn>
            </v-card-actions>
        </form>
    </v-card>
</template>

<script>
export default {
    data: function () {
        return {
            mcid: "",
        };
    },
    computed: {
        errorMcid: async function () {
            let res = await this.$axios.get("/api/v1/auth/" + this.$data.mcid);
            console.log(res);
            return;
        }
    },
    methods: {
        login: function () {
            this.$store.commit({
                type: "login",
                mcid: this.$data.mcid
            });
            location.href = "/";
        }
    }
}
</script>
