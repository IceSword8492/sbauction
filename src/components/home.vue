<template>
    <v-container fluid>
        <v-row>
            <v-col :cols="12">
                <v-card>
                    <v-card-text>
                        <v-container fluid>
                            <v-row dense>
                                <v-col :cols="12" :xs="12" :sm="12" :md="2" :lg="2">
                                    <v-card outlined>
                                        <v-list dense>
                                            <v-list-item-group
                                                v-model="tab"
                                            >
                                                <v-list-item v-for="(tab, i) in tabs" :key="i">
                                                    <v-list-item-content v-text="tab" />
                                                </v-list-item>
                                            </v-list-item-group>
                                        </v-list>
                                    </v-card>
                                </v-col>
                                <v-spacer />
                                <v-col :cols="12" :xs="12" :sm="12" :md="9" :lg="9">
                                    <v-card class="mx-auto" flat>
                                        <v-card-title v-text="tabs[tab]" />
                                        <v-card-text
                                            v-if="tab === 0"
                                        >
                                            general
                                        </v-card-text>

                                        <v-card-text
                                            v-if="tab === 5"
                                        >
                                            <v-card-subtitle>
                                                Theme
                                            </v-card-subtitle>
                                            <v-radio-group v-model="theme" row>
                                                <v-radio label="Light" />
                                                <v-radio label="Dark" />
                                            </v-radio-group>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: function () {
        return {
            tab: 0,
            tabs: [
                "General",
                "Watch",
                "Notification",
                "Query",
                "Script",
                "Setting",
            ],
            value: [
                423,
                446,
                675,
                510,
                590,
                610,
                760,
            ],
            tab: 0,
            theme: 0,
        };
    },
    watch: {
        tab: function () {
            this.tab = this.tab || 0;
            this.$router.replace(this.$route.path + "?tab=" + this.tabs[this.tab]).catch(() => null);
        },
        theme: async function () {console.log((await this.$axios.get(`/api/v1/user/${this.$mcid}/theme`)).data);
            this.$axios.get("/api/v1/user/" + this.$mcid + "/theme?theme=" + this.theme);
            this.$vuetify.theme.dark = this.theme;console.log((await this.$axios.get(`/api/v1/user/${this.$mcid}/theme`)).data);
        },
    },
    methods: {

    },
    created: async function () {
        let tab = this.$route.query.tab || "General";
        this.tab = (this.tabs.map((t, i) => ({tab: t, index: i})).find(t => t.tab.toLowerCase() === tab.toLowerCase()) || {index: 0}).index;
        this.theme = (await this.$axios.get(`/api/v1/user/${this.$mcid}/theme`)).data;
    },
}
</script>
