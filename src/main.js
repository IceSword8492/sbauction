import Vue from "vue"
import Router from "vue-router"
import router from "./router.js"
import App from "./App.vue"
import Vuetify from "vuetify"
import BootstrapVue from "bootstrap-vue"
import "../node_modules/vuetify/dist/vuetify.min.css"
import axios from "axios";
import store from "./store/index.js"

let Auth = {
	loggedIn: false,
	login: function () {this.loggedIn = true},
	logout: function () {this.loggedIn = false},
}

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.use(Router);
Vue.use(Vuetify);
Vue.use(BootstrapVue);

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth) && !Auth.loggedIn) {
		next({path: "/login", query: {redirect: to.fullPath}});
	} else {
		next();
	}
});

if (sessionStorage.getItem("SkyblockAuction")) {
	const storageData = JSON.parse(sessionStorage.getItem("SkyblockAuction"));
	if (storageData.auth.mcid) {
		Vue.prototype.$mcid = storageData.auth.mcid;
	}
}

new Vue({
	router,
	store,
	vuetify: new Vuetify({}),
	render: function (h) { return h(App) },
}).$mount('#app');
