<template>
    <v-card
        class="mx-auto col-10"
    >
        <v-card-title>
            Login
        </v-card-title>
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
    </v-card>
</template>

<script>
export default {
    data: function () {
        return {
            mcid: "",
            errorMcid: ""
        };
    },
    methods: {
        login: async function () {
            let res = await this.$axios.get("/api/v1/auth/" + this.$data.mcid);
            console.log(res.data);
            if (res.data.indexOf("success") === 0) {
                this.$store.commit({
                    type: "login",
                    mcid: this.$data.mcid,
                    uuid: res.data.match(/{{(?<uuid>(?:(?!{{|}}).)+)}}/).groups.uuid,
                });
                location.href = "/";
            } else {
                alert("f");
                return false;
            }
        }
    }
}
</script>
