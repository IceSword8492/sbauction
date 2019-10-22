<template>
    <v-app id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="/">
                    Skyblock Auction
                </a>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item" v-if="!user || (user && user.length && user.length === 0)">
                                <a class="nav-link" href="/login">Login</a>
                            </li>
                            <v-menu offset-y v-if="user && user.length && user.length !== 0">
                                <template v-slot:activator="{ on }">
                                    <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-on="on">
                                        {{ user }} <img :src="`https://avatar.minecraft.jp/${user}/minecraft/l.png`" width="20px" height="20px" /><span class="caret"></span>
                                    </a>
                                </template>
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-title
                                            @click="logout"
                                        >Logout</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </ul>
                    </div>
            </div>
        </nav>
        <main class="py-4">
            <div class="container">
                <div class="row justify-content-center">
                    <router-view />
                </div>
            </div>
        </main>
    </v-app>
</template>

<script>
import sbAuctions from "./components/sbAuctions.vue"

export default {
    name: 'app',
    components: {
        sbAuctions
    },
    data: function () {
        return {
            user: this.$mcid,
        };
    },
    methods: {
        logout: function () {
            this.$store.commit({
                type: "logout"
            });
            location.href = "/";
        }
    },
    created: function () {
        let stalker = document.createElement("div");
        stalker.id = "stalker";
        stalker.style.zIndex = "9999";
        stalker.style.position = "fixed";
        stalker.innerHTML = `<div id="pointer"></div><div id="item_lore">ITEMLORE</div>`;
        document.body.insertBefore(stalker, document.body.firstChild);
        document.addEventListener("mousemove", function (e) {
            stalker.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
        });
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.navbar {
    padding: 0;
}

/* #stalker > #pointer {
    pointer-events: none;
    position: fixed;
    top: -8px;
    left: -8px;
    width: 16px;
    height: 16px;
    background: rgba(0,0,0,0.5);
    border-radius: 50%;
    transform: translate(0,0);
    transition: transform 0.2s;
    transition-timing-function: ease-out;
    z-index: 999;
} */

/* html, body, a {
    cursor: none !important;
} */

#stalker > #item_lore {
    position: absolute;
    top: -40px;
    left: 30px;
    visibility: hidden;
    width: 300px;
    background-color: #110110;
    border-radius: 5px;
    outline: solid 2px #24015b;
    outline-offset: -4px;
    padding: 5px;
}
</style>
