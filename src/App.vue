<template>
    <v-app id="app">
        <nav>
            <v-toolbar flat dense>
                <v-toolbar-title @click="$route.path !== '/' ? $router.push('/') : null" style="cursor: pointer;">
                    <span class="font-weight-light grey--text">Skyblock</span> <span class="grey--text">Auction</span>
                </v-toolbar-title>
                <v-spacer />
                <v-spacer />
                <v-spacer />
                <v-spacer />
                <v-btn icon
                    @click.stop="drawer = !drawer"
                    class="hidden-md-and-up"
                >
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
                <v-text-field
                    ref="search"
                    v-model="search"
                    label="Search"
                    style="margin-top: 22px; margin-right: 10px;"
                    class="hidden-sm-and-down"
                    single-line
                    append-icon="mdi-search-web"
                    @click:append="exec_search"
                    @keypress.enter="exec_search"
                />
                <v-btn class="nav-item hidden-sm-and-down" text v-if="!user || (user && user.length && user.length === 0)" to="/login">
                    <span class="nav-link" to="/login">Login</span>
                </v-btn>
                <v-menu offset-y v-if="user && user.length && user.length !== 0" class="hidden-sm-and-down">
                    <template v-slot:activator="{ on }">
                        <v-btn text id="navbarDropdown" class="nav-link dropdown-toggle grey--text hidden-sm-and-down" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-on="on">
                            {{ user }} <img :src="`https://avatar.minecraft.jp/${user}/minecraft/l.png`" width="20px" height="20px" style="margin-left: 5px; margin-right: 3px;" /><span class="caret"></span>
                        </v-btn>
                    </template>
                    <v-list class="center">
                        <v-list-item to="home">
                            <v-list-item-title
                            >Home</v-list-item-title>
                        </v-list-item>
                        <v-list-item to="search">
                            <v-list-item-title
                            >Search</v-list-item-title>
                        </v-list-item>
                        <v-list-item to="logout">
                            <!-- gが切れるためheight指定 -->
                            <v-list-item-title
                                style="height: 20px"
                            >Logout</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-toolbar>
        </nav>
        <v-navigation-drawer
            v-model="drawer"
            absolute
            temporary
        >
            <v-list
                nav
                dense
            >
                <v-list-item-group
                    v-model="group"
                    active-class="text--accent-4"
                    class="center"
                >
                    <div style="margin: 10px 0;">
                        <span class="font-weight-light grey--text">Skyblock</span> <span class="grey--text">Auction</span>
                    </div>
                    <div v-if="user && user.length && user.length !== 0" style="margin: 10px 0;">
                        <span>{{ user }} <img :src="`https://avatar.minecraft.jp/${user}/minecraft/l.png`" width="20px" height="20px" /></span>
                    </div>
                    <v-text-field
                        v-model="search"
                        label="Search"
                        append-icon="mdi-search-web"
                        @click:append="exec_search"
                        @keypress.enter="exec_search"
                    />
                    <v-list-item v-if="!user || (user && user.length && user.length === 0)" to="login">
                        <v-list-item-title>Login</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="user && user.length && user.length !== 0" to="home">
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item>
                    <v-list-item to="search">
                        <v-list-item-title>Search</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="user && user.length && user.length !== 0" to="logout">
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <main class="py-4">
            <v-container id="custom-container" fluid>
                <v-row>
                    <router-view />
                </v-row>
            </v-container>
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
            drawer: false,
            group: null,
            search: ""
        };
    },
    methods: {
        exec_search: function () {
            this.$router.push("/search?query=" + this.search);
        },
        keyPress: function (e) {
            console.log(e);
        },
    },
    created: async function () {
        this.$vuetify.theme.dark = (await this.$axios.get(`/api/v1/user/${this.user}/theme`)).data;
        let stalker = document.createElement("div");
        stalker.id = "stalker";
        stalker.style.zIndex = "9999";
        stalker.style.position = "fixed";
        stalker.style.backgroundColor = 0xff0000;
        stalker.innerHTML = `<div id="pointer"></div><div id="item_lore" style="position: absolute;">ITEMLORE</div>`;
        document.body.insertBefore(stalker, document.body.firstChild);
        document.addEventListener("mousemove", function (e) {
			let oh = document.getElementById("item_lore").clientHeight;
			let y = stalker.getBoundingClientRect().top;
			let ow = document.getElementById("item_lore").clientWidth;
            let x = stalker.getBoundingClientRect().left;
            stalker.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
			document.getElementById("item_lore").style.transform = `translate(${window.innerWidth - (ow + x + 50) < 0 ? window.innerWidth - (ow + x + 50) : 0}px,${window.innerHeight - (oh + y - 30) < 0 ? window.innerHeight - (oh + y - 30) : 0}px)`;
        });
    },
    mounted: function () {
        this.$e.focus_search_bar = (e) => {
            if (e.keyCode === 191) {
                this.$refs.search.focus();
            }
        };
        document.addEventListener("keyup", this.$e.focus_search_bar);
    },
    watch: {
        group: function () {
            this.drawer = false;
        }
    },
}
</script>

<style lang="scss">
#app {
    // font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
}

#custom-container {
    max-width: 1900px;
}

@media (max-width: 599px) {
    #custom-container {
        max-width: 95%;
    }
}

@media (max-width: 600px) {
    #custom-container {
        max-width: 590px;
    }
}

@media (max-width: 960px) {
    #custom-container {
        max-width: 940px;
    }
}

@media (max-width: 1264px) {
    #custom-container {
        max-width: 1150px;
    }
}

@media (min-width: 1904px) {
    #custom-container {
        max-width: 1600px;
    }
}

.navbar {
    padding: 0;
}

@media (max-width: 599px) {
    #stalker > #pointer {
        visibility: hidden;
    }

    * {
        cursor: default;
    }
}

@media (min-width: 600px) {
    // #stalker > #pointer {
    //     pointer-events: none;
    //     position: fixed;
    //     top: -8px;
    //     left: -8px;
    //     width: 16px;
    //     height: 16px;
    //     background: rgba(0,0,0,0.5);
    //     border-radius: 50%;
    //     transform: translate(0,0);
    //     transition: transform 0.2s;
    //     transition-timing-function: ease-out;
    //     z-index: 999;
    // }

    // * {
    //     cursor: none !important;
    // }
}

#stalker {
    pointer-events: none;
}

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

.center {
	text-align: center;
}
</style>
