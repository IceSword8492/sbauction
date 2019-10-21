<template>
    <v-container fluid>
    	<v-row dense>
    		<v-col
    			v-for="(auction, index) in cards"
    			:key="index"
    			xs="12"
    			sm="4"
    			md="3"
    			lg="2"
    			class="v-application"
    		>
				<v-card
					style="width: 100%;"
				>
					<v-img
						:src="auction.img"
						class="white--text align-end purple"
						gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
						height="150px"
					>
						<v-card-title
							style="word-break: break-word"
							v-text="auction.item_name"
						/>
					</v-img>
					<div class="my-4 subtitle-1 black--text">
						Ended!
					</div>
					<v-divider class="mx-4" />
					<v-card-actions>
						₡{{ ("" + (auction.highest_bid_amount || auction.starting_bid)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') }}
						<v-spacer />
						<v-btn icon>
							<v-icon>mdi-heart</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
    		</v-col>
    	</v-row>
    </v-container>
</template>

<script>
export default {
    data: function () {
    	return {
			auctions: [],
			sortMethod: this.sort_bid_amount_desc,
			limit: 48,
    	};
	},
	computed: {
		cards: function () {
			return this.$data.auctions.filter((auction, index) => index < this.$data.limit);
		},
	},
	methods: {
		mergeData: async function () {
			let totalPages = 1;
			let auctions = (await this.$axios.get("/api/v1/auctions/1")).data;

			totalPages = auctions.totalPages;

			this.$data.auctions = this.merge(this.$data.auctions, auctions.auctions.map(auction => {
				auction.item_lore = auction.item_lore.replace(/\r?\n/g, "<br />");
				return auction;
			}), "uuid");

			this.$data.auctions.sort(this.sortMethod);
			for (let page = 2; page < totalPages; page++) {
				auctions = (await this.$axios.get("/api/v1/auctions/" + page)).data;
				this.$data.auctions = this.merge(this.$data.auctions, auctions.auctions.map(auction => {
				auction.item_lore = auction.item_lore.replace(/\r?\n/g, "<br />");
				return auction;
			}), "uuid");
				this.$data.auctions.sort(this.sortMethod);
			}
		},
		merge: function (a, b, p) {
			return Object.values([...a, ...b]
				.reduce((obj, it) => {
					obj[it[p]] = it;
					return obj;
				}, {}));
		},
		sort_bid_amount_desc: function (a, b) {
			return (b.highest_bid_amount || b.starting_bid) - (a.highest_bid_amount || a.starting_bid);
		},
		sort_bid_amount_asc: function (a, b) {
			return (a.highest_bid_amount || a.starting_bid) - (b.highest_bid_amount || b.starting_bid);
		}
	},
	created: function () {
		this.mergeData();
		setInterval(_ => {
			this.mergeData();
		}, 60000);
	},
}
</script>
