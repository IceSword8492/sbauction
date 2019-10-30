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
                    ref="sb"
                    v-model="search_main"
                    label="Search Query"
                    append-icon="mdi-search-web"
                    @click:append="exec_search"
                    @keypress.enter="exec_search"
                    @focus="onFocusSB"
                    @blur="onBlurSB"
                />
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn class="grey--text" text
                    @click="showSearchOptions = !showSearchOptions"
                >
                    Detail<v-icon>{{ showSearchOptions ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            </v-card-actions>
            <v-expand-transition>
                <div v-show="showSearchOptions" @keyup.enter="exec_search_ctrl">
                    <v-divider></v-divider>
                    <v-container>
                        <v-row>
                            <v-col :cols="6">
                                <v-card-title>
                                    Name
                                </v-card-title>
                                <v-card-text>
                                    <v-text-field
                                        v-model="name"
                                        label="Name"
                                    />
                                </v-card-text>
                            </v-col>
                            <v-col :cols="6">
                                <v-card-title>
                                    Lore
                                </v-card-title>
                                <v-card-text>
                                    <v-text-field
                                        v-model="lore"
                                        label="Lore"
                                    />
                                </v-card-text>
                            </v-col>
                            <v-col :cols="6">
                                <v-card-title>
                                    Tier
                                </v-card-title>
                                <v-card-text>
                                    <v-container fluid>
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
                                    </v-container>
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
                                                <span class="hidden-md-and-up">From</span><v-text-field v-model.number="price[0]" prefix="₡" />
                                            </v-col>
                                            <v-col :cols="2" class="hidden-sm-and-down">
                                                <span style="margin-top: 20px; display: inline-block;">-</span>
                                            </v-col>
                                            <v-col :cols="12" :xs="12" :sm="12" md="5" lg="5">
                                                <span class="hidden-md-and-up">To</span><v-text-field v-model.number="price[1]" prefix="₡" />
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
                                    <v-container fluid>
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
                                    </v-container>
                                </v-card-text>
                            </v-col>
                            <v-col :cols="6">
                                <v-card-title>
                                    Reforge
                                </v-card-title>
                                <v-card-text>
                                    <v-autocomplete
                                        v-model="selectedReforges"
                                        :items="reforges"
                                        label="Reforge"
                                        multiple
                                        chips
                                        hide-selected
                                        return-object
                                    />
                                </v-card-text>
                            </v-col>
                            <v-col :cols="6">
                                <v-card-title>
                                    State
                                </v-card-title>
                                <v-card-text>
                                    <v-container fluid>
                                        <v-radio-group
                                            :row="true"
                                            v-model="state"
                                        >
                                            <v-radio label="Open" value="open" />
                                            <v-radio label="Ending" value="ending" />
                                            <v-radio label="Ended" value="ended" />
                                        </v-radio-group>
                                    </v-container>
                                </v-card-text>
                            </v-col>
                            <v-col :cols="6">
                                <v-card-title>
                                    Potato
                                </v-card-title>
                                <v-card-text>
                                    <v-autocomplete
                                        v-model="selectedPotatoes"
                                        :items="potatoes"
                                        label="Potato"
                                        multiple
                                        chips
                                        hide-selected
                                    />
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
            </v-expand-transition>
        </v-card>
        <sb-auctions />
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
            query: "",
            price: [0, 100000],
            priceChanged: false,
            tier: null,
            state: null,
            sort: null,
            name: "",
            showSearchOptions: false,
            lore: "",
            potatoes: [
                "+2",
                "+4",
                "+6",
                "+8",
                "+10",
                "+12",
                "+14",
                "+16",
                "+18",
                "+20"
            ],
            selectedPotatoes: [],
            selectedReforges: [],
            reforges: [
                "Demonic",
                "Forceful",
                "Gentle",
                "Godly",
                "Hurtful",
                "Keen",
                "Strong",
                "Superior",
                "Unpleasant",
                "Zealous",
                "Odd",
                "Rich",
                "Epic",
                "Fair",
                "Fast",
                "Heroic",
                "Legendary",
                "Spicy",
                "Deadly",
                "Fine",
                "Grand",
                "Hasty",
                "Neat",
                "Rapid",
                "Unreal",
                "Clean",
                "Fierce",
                "Heavy",
                "Light",
                "Mythic",
                "Pure",
                "Smart",
                "Titanic",
                "Wise",
                "Bizzare",
                "Itchy",
                "Omnious",
                "Pleasant",
                "Pretty",
                "Shiny",
                "Simple",
                "Strange",
                "Vivid"
            ],
            onFocusSB: () => {
                document.removeEventListener("keyup", this.$e.focus_search_bar);
                document.removeEventListener("keyup", this.$e.extend_search_options);
            },
            onBlurSB: () => {
                document.addEventListener("keyup", this.$e.focus_search_bar);
                document.addEventListener("keyup", this.$e.extend_search_options);
            },
        };
    },
    computed: {
        search_main_dummy: function () {
            let query = [
                this.$data.name.length ? `name:\"${this.$data.name}\"` : "",
                this.$data.lore.length ? `lore:\"${this.$data.lore}\"` : "",
                this.$data.tier && this.$data.tier !== "all" ? "tier:" + this.$data.tier : "",
                this.$data.priceChanged ? "price:" + this.$data.price[0] + "-" + this.$data.price[1] : "",
                this.$data.sort ? "sort:" + this.$data.sort : "",
                this.$data.selectedReforges.length ? "reforge:\"" + this.$data.selectedReforges.join(",") + "\"" : "",
                this.$data.selectedPotatoes.length ? "potato:" + this.$data.selectedPotatoes.map(potato => "(" + potato.replace(/\+/g, "_") + ")").join(",") : "",
                this.$data.state ? "state:" + this.$data.state : "",
            ].filter(part => part.length).join(" ");
            return query.trim();
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
            this.$router.push("/search?" + new URLSearchParams({query: this.search_main}));
            this.query = this.search_main;
        },
        exec_search_ctrl: function (e) {
            if (e.ctrlKey) {
                this.exec_search();
            }
        },
    },
    created: function () {
        this.search_main = this.$route.query.query;
        this.$e.extend_search_options = (e) => {
            if (e.keyCode === 186) {
                this.showSearchOptions ^= 1;
            }
        };
        document.addEventListener("keyup", this.$e.extend_search_options);
    },
}
</script>
