import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"
import auth from "./modules/auth.js"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth
    },
    strict: true,
    plugins: [createPersistedState({
        key: "SkyblockAuction",
        paths: ["auth.mcid"],
        storage: window.sessionStorage
    })],
});