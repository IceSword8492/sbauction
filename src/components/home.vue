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
                                            v-if="tab === 1"
                                        >
                                            <sb-auction :watch_flag="watch_flag" :watch_list="watch_list" />
                                        </v-card-text>
                                        <v-card-text
                                            v-if="tab === 4"
                                        >
                                            <v-card-subtitle>
                                                Theme
                                            </v-card-subtitle>
                                            <v-radio-group v-model="theme" row class="setting_radio">
                                                <v-radio label="Light" />
                                                <v-radio label="Dark" />
                                            </v-radio-group>
                                            <v-card-subtitle>
                                                Notification
                                            </v-card-subtitle>
                                            <v-container fluid>
                                                <v-row>
                                                    <v-col :cols="2">
                                                        <v-switch
                                                            :inset="true"
                                                            label="Enable"
                                                            v-model="notif_enable"
                                                        />
                                                    </v-col>
                                                    <v-col :cols="2">
                                                        <v-checkbox label="Item name" />
                                                    </v-col>
                                                    <v-col :cols="2">
                                                        <v-checkbox label="Amount" disabled />
                                                    </v-col>
                                                    <v-col :cols="2">
                                                        <v-checkbox label="Time" />
                                                    </v-col>
                                                    <v-col :cols="2">
                                                        <v-checkbox label="Price" />
                                                    </v-col>
                                                    <v-col :cols="2">
                                                        <v-checkbox label="Bids" />
                                                    </v-col>
                                                    <v-col :cols="2">
                                                        <v-checkbox label="Average" disabled />
                                                    </v-col>
                                                    <v-col :cols="2">
                                                        <v-checkbox label="Diff from average" disabled />
                                                    </v-col>
                                                    <v-col :cols="2">
                                                        <v-checkbox label="Anvil uses" disabled />
                                                    </v-col>
                                                    <v-col :cols="2">
                                                        <v-checkbox label="Highest bidder name" disabled />
                                                    </v-col>
                                                    <v-col :cols="2">
                                                        <v-checkbox label="Seller name" disabled />
                                                    </v-col>
                                                    <v-col :cols="2">
                                                        <v-checkbox label="うんちぶりぶり.com" />
                                                    </v-col>
                                                </v-row>
                                            </v-container>
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
import sbAuction from "./sbAuctions.vue"

export default {
    components: {
        sbAuction
    },
    data: function () {
        return {
            tab: 0,
            tabs: [
                "General",
                "Watch",
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
            watch_flag: true,
            watch_list: [],
            notif_enable: true,
        };
    },
    watch: {
        tab: function () {
            this.tab = this.tab || 0;
            this.$router.replace(this.$route.path + "?tab=" + this.tabs[this.tab]).catch(() => null);
        },
        theme: async function () {
            await this.$axios.get("/api/v1/user/" + this.$mcid + "/theme?theme=" + this.theme);
            this.$vuetify.theme.dark = this.theme;
        },
        notif_enable: async function () {console.log("update", this.notif_enable)
            this.notif_enable = (await this.$axios.get(`/api/v1/user/${this.$mcid}/notif?enabled=${~~this.notif_enable}`)).data.enabled;
            console.log(this.notif_enable)
        }
    },
    methods: {

    },
    created: async function () {
        let tab = this.$route.query.tab || "General";
        this.tab = (this.tabs.map((t, i) => ({tab: t, index: i})).find(t => t.tab.toLowerCase() === tab.toLowerCase()) || {index: 0}).index;
        this.theme = (await this.$axios.get(`/api/v1/user/${this.$mcid}/theme`)).data;
        this.watch_list = (await this.$axios.get(`/api/v1/user/${this.$mcid}/watch`)).data;
        console.log("init", this.notif_enable, (await this.$axios.get(`/api/v1/user/${this.$mcid}/notif`)).data.enabled)
        this.notif_enable = (await this.$axios.get(`/api/v1/user/${this.$mcid}/notif`)).data.enabled;
        console.log("init", this.notif_enable)
    },
}
</script>

<style lang="scss">
.setting_radio {
    margin: 0 15px;
}
</style>
