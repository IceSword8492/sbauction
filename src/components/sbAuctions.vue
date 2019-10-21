<template>
    <v-container fluid>
    	<v-row dense>
    		<v-col
    			v-for="card in cards"
    			:key="card.name"
    			xs="12"
    			sm="12"
    			md="2"
    			lg="2"
    			class="v-application"
    		>
    			<v-card>
    				<v-img
    					:src="card.img"
    					class="white--text align-end"
    					gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    					height="150px"
    				>
    					<v-card-title
							style="word-break: break-word"
    						v-text="card.name"
    					/>
    				</v-img>
    				<v-card-actions>
						${{ card.highest_bid_amount }}
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
    		cards: [
    			{"name": "spicy aspect of the dragon", "img": "https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c301.png", highest_bid_amount: 100000000},
                {"name": "godly aspect of the jerry", "img": "https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c301.png", highest_bid_amount: 200000000},
                {"name": "sword a", "img": "https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c301.png", highest_bid_amount: 300000000},
                {"name": "sword b", "img": "https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c301.png", highest_bid_amount: 500000000},
                {"name": "sword c", "img": "https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c301.png", highest_bid_amount: 400000000}
    		]
    	};
    }
}
</script>
