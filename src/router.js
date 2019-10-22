import Router from "vue-router"
import sbAuctions from "./components/sbAuctions.vue"
import login from "./components/login.vue"
import logout from "./components/logout.vue"
import home from "./components/home.vue"
import search from "./components/search.vue"

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "index",
            component: sbAuctions,
        },
        {
            path: "/login",
            name: "login",
            component: login,
        },
        {
            path: "/search",
            name: "/search",
            component: search,
        },
        {
            path: "/logout",
            name: "/logout",
            component: logout
        },
        {
            path: "/home",
            name: "/home",
            component: home,
            meta: {
                requiresAuth: true
            }
        },
    ]
});