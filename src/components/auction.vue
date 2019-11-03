<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        Auction
                    </v-card-title>
                    <v-breadcrumbs :items="pos" />
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-card>
                                        <v-card-title>
                                            Summoning Eye
                                        </v-card-title>
                                        <v-card-text>
                                            Amount: 1
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
            pos: [
                {
                    text: "Top",
                    disabled: false,
                    to: "/",
                },
                {
                    text: "Auction",
                    disabled: true,
                }
            ],
        };
    },
    methods: {

    },
}
</script>
