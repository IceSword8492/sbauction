import Router from "vue-router"
import sbAuctions from "./components/sbAuctions.vue"
import login from "./components/login.vue"

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
            path: "/register",
            name: "/register",
            component: null,
        },
        {
            path: "/logout",
            name: "/logout",
            component: null
        },
        {
            path: "/home",
            name: "/home",
            component: null,
            meta: {
                requiresAuth: true
            }
        },
    ]
});