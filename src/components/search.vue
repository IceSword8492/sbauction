<template>
    <v-container>
        <v-card
            class="mx-auto col-12"
        >
            <v-card-title>
                Search
            </v-card-title>
            <v-card-text>
                <v-text-field
                    v-model="search_main"
                    label="Search Command"
                    append-icon="mdi-search-web"
                    @click:append="exec_search"
                    @keypress.enter="exec_search"
                />
            </v-card-text>
            <v-card-title>
                Tier
            </v-card-title>
            <v-card-text>
                <v-layout justify-center>
                    <v-radio-group
                        :row="true"
                        v-model="tier"
                    >
                        <v-radio label="Common" value="common" />
                        <v-radio label="Uncommon" value="uncommon" />
                        <v-radio label="Rare" value="rare" />
                        <v-radio label="Epic" value="epic" />
                        <v-radio label="Legendary" value="legendary" />
                        <v-radio label="Special" value="special" />
                    </v-radio-group>
                </v-layout>
            </v-card-text>
            <v-card-title>
                Price
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="2">
                            <v-text-field v-model="price[0]" />
                        </v-col>
                        <v-col cols="8">
                            <v-range-slider
                                v-model="price"
                                min="0"
                                max="100000"
                                thumb-label="always"
                                style="margin-top: 17px;"
                            />
                        </v-col>
                        <v-col cols="2">
                            <v-text-field v-model="price[1]" />
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
        <sb-auctions :query="search_main" />
    </v-container>
</template>

<script>
import sbAuctions from "./sbAuctions.vue"

export default {
    components: {
        sbAuctions,
    },
    data: function () {
        return {
            search_main: "",
            price: [0, 100000],
            tier: null,
        };
    },
    computed: {
        search_main_dummy: function () {
            return `${this.$data.tier ? "tier:" + this.$data.tier + " >" : ""} ${"price:" + this.$data.price[0] + "-" + this.$data.price[1] + " >"}`;
        },
    },
    watch: {
        search_main_dummy: function () {
            this.$data.search_main = this.search_main_dummy;
        },
    },
    methods: {
        exec_search: function () {
            location.href = "/search?query=" + this.search_main;
        },
    },
    created: function () {
        this.search_main = this.$route.query.query;
    },
}
</script>
