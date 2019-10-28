<template>
    <v-container fluid>
		<v-row>
			<v-col :cols="12">
				<v-pagination
					v-model="page"
					:total-visible="7"
					:length="totalPages"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col
				v-for="(auction, index) in cards"
				:key="index"
				:cols="12"
				:xs="12"
				:sm="6"
				:md="4"
				:lg="2"
				ref="cards"
			>
				<v-card
					style="width: 100%;"
					@mouseenter="mouse_enter"
					@mouseleave="mouse_leave"
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
					<div class="my-4 subtitle-1">
						{{ (auction.end - new Date().getTime()) > 3000 ? (Math.floor((auction.end - new Date().getTime()) / 1000 / 3600) > 24 ? Math.floor((auction.end - new Date().getTime()) / 1000 / 3600 / 24) + " day" + (Math.floor((auction.end - new Date().getTime()) / 1000 / 3600 / 24) > 1 ? "s" : "") : (Math.floor((auction.end - new Date().getTime()) / 1000 / 3600) ? ("" + Math.floor((auction.end - new Date().getTime()) / 1000 / 3600)).padStart(2, "0") + "h" : "") + (Math.floor((auction.end - new Date().getTime()) / 1000 / 3600) || Math.floor((auction.end - new Date().getTime()) / 1000 / 60 % 60) ? ("" + Math.floor((auction.end - new Date().getTime()) / 1000 / 60 % 60)).padStart(2, "0") + "m" : "") + ("" + Math.floor((auction.end - new Date().getTime()) / 1000 % 60)).padStart(2, "0") + "s") : (auction.end - new Date().getTime()) > 0 ? "Soon" : "Ended!" }}
					</div>
					<v-divider class="mx-4" />
					<v-card-actions>
						<span v-if="$vuetify.theme.dark" style="color: #ffaa00">₡{{ ("" + (auction.highest_bid_amount || auction.starting_bid)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') }}</span>
						<span v-else>₡{{ ("" + (auction.highest_bid_amount || auction.starting_bid)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') }}</span>
						<v-spacer />
						<v-btn icon v-if="user">
							<v-icon>mdi-heart</v-icon>
						</v-btn>
					</v-card-actions>
					<div class="item_lore" style="position: fixed; visibility: hidden;" v-html="lore_converter(auction.item_name, auction.tier, auction.item_lore)"></div>
				</v-card>
			</v-col>
		</v-row>
		<v-row>
			<v-col :cols="12">
				<v-pagination
					v-model="page"
					:total-visible="7"
					:length="totalPages"
				/>
			</v-col>
		</v-row>
        <div class="progress-circular" v-if="$loading">
            <v-progress-circular
                indeterminate
                color="primary"
            />
        </div>
    </v-container>
</template>

<script>
export default {
    data: function () {
    	return {
			cards: [],
			totalPages: 1,
			page: 1,
			user: this.$mcid,
			query: "",
    	};
	},
	watch: {
		page: async function () {
			await this.update_cards();
		},
		query: async function () {
			await this.update_cards();
		},
	},
	methods: {
		mouse_enter: function (e) {
			document.getElementById("item_lore").innerHTML = e.target.getElementsByClassName("item_lore")[0].innerHTML;
			document.getElementById("item_lore").style.visibility = "visible";
		},
		mouse_leave: function (e) {
			document.getElementById("item_lore").style.visibility = "hidden";
		},
		lore_converter: function (name, tier, lore) {
			let tier_color = "§r";
			switch (tier.toLowerCase()) {
			case "common":
				tier_color = "§f";
				break;
			case "uncommon":
				tier_color = "§2";
				break;
			case "rare":
				tier_color = "§9";
				break;
			case "epic":
				tier_color = "§5";
				break;
			case "legendary":
				tier_color = "§6";
				break;
			case "special":
				tier_color = "§d";
				break;
			}
			return ((tier_color) + name + "\n\n" + lore)
				.replace(/§k((?:(?!§[0-9a-z]).)*)/g, `<span>$1</span>`) // 未対応
				.replace(/§l((?:(?!§[0-9a-z]).)*)/g, `<span style="font-weight: bold">$1</span>`)
				.replace(/§m((?:(?!§[0-9a-z]).)*)/g, `<span style="text-decoration: line-through">$1</span>`)
				.replace(/§n((?:(?!§[0-9a-z]).)*)/g, `<span style="text-decoration: underline">$1</span>`)
				.replace(/§o((?:(?!§[0-9a-z]).)*)/g, `<span style="font-style: italic">$1</span>`)
				.replace(/§r((?:(?!§[0-9a-z]).)*)/g, `<span style="color: #ffffff; font-style: normal; font-weight: normal; text-decoration: none;">$1</span>`)
				.replace(/§0((?:(?!§[0-9a-f]).)*)/g, `<span style="color: #000000">$1</span>`)
				.replace(/§1((?:(?!§[0-9a-f]).)*)/g, `<span style="color: #0000aa">$1</span>`)
				.replace(/§2((?:(?!§[0-9a-f]).)*)/g, `<span style="color: #00aa00">$1</span>`)
				.replace(/§3((?:(?!§[0-9a-f]).)*)/g, `<span style="color: #00aaaa">$1</span>`)
				.replace(/§4((?:(?!§[0-9a-f]).)*)/g, `<span style="color: #aa0000">$1</span>`)
				.replace(/§5((?:(?!§[0-9a-f]).)*)/g, `<span style="color: #aa00aa">$1</span>`)
				.replace(/§6((?:(?!§[0-9a-f]).)*)/g, `<span style="color: #ffaa00">$1</span>`)
				.replace(/§7((?:(?!§[0-9a-f]).)*)/g, `<span style="color: #aaaaaa">$1</span>`)
				.replace(/§8((?:(?!§[0-9a-f]).)*)/g, `<span style="color: #555555">$1</span>`)
				.replace(/§9((?:(?!§[0-9a-f]).)*)/g, `<span style="color: #5555ff">$1</span>`)
				.replace(/§a((?:(?!§[0-9a-f]).)*)/g, `<span style="color: #55ff55">$1</span>`)
				.replace(/§b((?:(?!§[0-9a-f]).)*)/g, `<span style="color: #55ffff">$1</span>`)
				.replace(/§c((?:(?!§[0-9a-f]).)*)/g, `<span style="color: #ff5555">$1</span>`)
				.replace(/§d((?:(?!§[0-9a-f]).)*)/g, `<span style="color: #ff55ff">$1</span>`)
				.replace(/§e((?:(?!§[0-9a-f]).)*)/g, `<span style="color: #ffff55">$1</span>`)
				.replace(/§f((?:(?!§[0-9a-f]).)*)/g, `<span style="color: #ffffff">$1</span>`)
				.replace(/\r?\n/g, "<br />");
				
		},
		update_cards: async function () {
			this.$loading = true;
			let query = this.$route.query.query ? this.$route.query.query.trim() : null;
			query = query ? (
				/^>|^sort:|^query:|^seller:|^name:|^lore:|^tier:|^price:|^page:|^state:|^reforge:|^potato:/.test(query.trim())
			) ? query : `name:"${query}" sort:time.asc state:open` : query;
			if (query) {
				this.$router.replace("/search?query=" + query + (this.page !== undefined ? `&page=${this.page - 1}` : "")).catch(() => null);
			}
			this.$data.cards = (await this.$axios.get("/api/v1/search?query=" + (query || "sort:price.desc") + (this.page !== undefined ? `&page=${this.page - 1}` : ""))).data;
			this.$data.totalPages = (await this.$axios.get("/api/v1/search/total?query=" + (query || "sort:price.desc"))).data.totalPages;
			this.$loading = false;
		},
	},
	created: async function () {
		await this.update_cards();
		setInterval(() =>  {
			this.$forceUpdate();
			this.query = this.$route.query;
		}, 1000);
	},
}
</script>

<style lang="scss">
.progress-circular {
    position: fixed;
    bottom: 20px;
    right: 20px;
    pointer-events: none;
}
</style>
