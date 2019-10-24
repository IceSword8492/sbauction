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
                    label="Search Query"
                    append-icon="mdi-search-web"
                    @click:append="exec_search"
                    @keypress.enter="exec_search"
                />
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn
                    icon
                    @click="showSearchOptions = !showSearchOptions"
                >
                    <v-icon>{{ showSearchOptions ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            </v-card-actions>
            <v-expand-transition>
                <div v-show="showSearchOptions">
                    <v-divider></v-divider>
                    <v-container>
                        <v-row>
                            <v-col :cols="6">
                                <v-card-title>
                                    Tier
                                </v-card-title>
                                <v-card-text>
                                    <v-layout justify-center>
                                        <v-radio-group
                                            :row="true"
                                            v-model="tier"
                                        >
                                            <v-radio label="All" value="all" />
                                            <v-radio label="Common" value="common" />
                                            <v-radio label="Uncommon" value="uncommon" />
                                            <v-radio label="Rare" value="rare" />
                                            <v-radio label="Epic" value="epic" />
                                            <v-radio label="Legendary" value="legendary" />
                                            <v-radio label="Special" value="special" />
                                        </v-radio-group>
                                    </v-layout>
                                </v-card-text>
                            </v-col>
                            <v-col :cols="6">
                                <v-card-title>
                                    Price
                                </v-card-title>
                                <v-card-text>
                                    <v-container fluid>
                                        <v-row no-gutters>
                                            <v-col :cols="12" :xs="12" :sm="12" md="5" lg="5">
                                                <span class="hidden-md-and-up">From</span><v-text-field v-model.number="price[0]"/>
                                            </v-col>
                                            <v-col :cols="2" class="hidden-sm-and-down">
                                                <span style="margin-top: 20px; display: inline-block;">-</span>
                                            </v-col>
                                            <v-col :cols="12" :xs="12" :sm="12" md="5" lg="5">
                                                <span class="hidden-md-and-up">To</span><v-text-field v-model.number="price[1]"/>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                            </v-col>
                            <v-col :cols="6">
                                <v-card-title>
                                    Sort
                                </v-card-title>
                                <v-card-text>
                                    <v-layout justify-center>
                                        <v-radio-group
                                            :row="true"
                                            v-model="sort"
                                        >
                                            <v-radio label="Price.desc" value="price.desc" />
                                            <v-radio label="Price.asc" value="price.asc" />
                                            <v-radio label="Time.desc" value="time.desc" />
                                            <v-radio label="Time.asc" value="time.asc" />
                                            <v-radio label="Bid.desc" value="bid.desc" />
                                            <v-radio label="Bid.asc" value="bid.asc" />
                                        </v-radio-group>
                                    </v-layout>
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
            </v-expand-transition>
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
            priceChanged: false,
            tier: null,
            sort: null,
            showSearchOptions: false,
        };
    },
    computed: {
        search_main_dummy: function () {
            return `${this.$data.tier && this.$data.tier !== "all" ? "tier:" + this.$data.tier + " >" : ""} ${this.$data.priceChanged ? "price:" + this.$data.price[0] + "-" + this.$data.price[1] + " >" : ""} ${this.$data.sort ? "sort:" + this.$data.sort + " >" : ""}`.trim();
        },
    },
    watch: {
        search_main_dummy: function () {
            this.$data.search_main = this.search_main_dummy;
        },
        price: function () {
            this.$data.priceChanged = true;
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
