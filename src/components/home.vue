<template>
    <v-container fluid="">
        <v-row>
            <v-col :cols="12">
                <v-card>
                    <v-tabs
                        v-model="tab"
                        fixed-tabs
                    >
                        <v-tab v-for="tab in tabs" :key="tab">{{ tab }}</v-tab>
                    </v-tabs>
                    <v-card-text>
                        <v-tabs-items v-model="tab">
                            <v-tab-item>
                                <v-sparkline
                                    :value="value"
                                    color="rgba(255, 255, 255, .7)"
                                    height="100"
                                    padding="24"
                                    stroke-linecap="round"
                                    :smooth="10"
                                    :line-width=".3"
                                    :gradient="['#f72047', '#ffd200', '#1feaea']"
                                    auto-draw
                                />
                            </v-tab-item>
                            <v-tab-item>
                                <v-card flat>
                                    <v-card-text>2</v-card-text>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item>
                                <v-card flat>
                                    <v-card-text>3</v-card-text>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item>
                                <v-card flat>
                                    <v-card-text>4</v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
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
                "Profile",
                "Query",
                "Script",
                "Settings"
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
        };
    },
    methods: {

    },
}
</script>
