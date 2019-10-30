const handler = require("serve-handler");
const http = require("http");
const rp = require("request-promise");
const sqlite = require("sqlite-async");
const url = require("url");
const child_process = require("child_process");
let db;

const server = http.createServer(async (request, response) => {
    let urlInfo = url.parse(request.url, true);
    let path = urlInfo.pathname;
    if (/^\/deploy/.test(path)) {
        let child_git = child_process.execFile("git", ["pull", "origin", "master"], (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(stdout || stderr);
            let child_refresh = child_process.execFile("refresh", [], (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(stdout || stderr);
                console.log("done");
            });
        });
    }
    if (path.indexOf("/api/v1/auth/login") === 0) {
        if (urlInfo.query.name && urlInfo.query.uuid) {
            db.run("insert or replace into user values (?, ?)", urlInfo.query.uuid, urlInfo.query.name);
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write("success");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write("failed");
            response.end();
        }
        return;
    }
    if (path.indexOf("/api/v1/auth") === 0) {
        let res = await rp.get("https://api.mojang.com/users/profiles/minecraft/" + request.url.split("/").filter(item => item.length)[request.url.split("/").filter(item => item.length).length - 1]);
        response.writeHead(200, {"Content-Type": "application/json"});
        if (res.length) {
            response.write("success {{" + JSON.parse(res).id + "}} <<" + JSON.parse(res).name + ">>");
        } else {
            response.write("failed");
        }
        response.end();
        return;
    }
    if (path.indexOf("/api/v1/auctions") === 0) {
        let page = parseInt(request.url.split("/").filter(item => item.length)[request.url.split("/").filter(item => item.length).length - 1]);
        let res = await rp.get("https://api.hypixel.net/skyblock/auctions?key=6c2a93fe-987e-4860-ab9b-50eac28be11e&page=" + page).catch(console.error);
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(res);
        response.end();
        return;
    }
    if (/^\/api\/v1\/auction/g.test(path)) {
        let uuid = /^\/api\/v1\/auction\/(?<uuid>[^/]+)/g.exec(path).groups.uuid;
        let res = await rp.get("http://34.82.10.51/api/v1/auction/" + uuid).catch(e => {
            console.error(e);
            console.log("requested url: http://34.82.10.51/api/v1/auction/" + uuid);
        });
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(res);
        response.end();
        return;
    }
    if (path.indexOf("/api/v1/search/total") === 0) {
        let query = urlInfo.query.query || "";
        let res = await rp.get("http://34.82.10.51/api/v1/search/total?query=" + query);
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(res);
        response.end();
        return;
    }
    if (path.indexOf("/api/v1/search") === 0) {
        let query = urlInfo.query.query || "";
        let page = Math.abs(parseInt("0" + urlInfo.query.page));
        let res = await rp.get("http://34.82.10.51/api/v1/search?query=" + query + "&page=" + page);
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(res);
        response.end();
        return;
    }
    if (/^\/api\/v1\/user\/.+/.test(path)) {
        let matched = path.match(/\/user\/(?<user>[^/]+)\/(?<option>[^/]+)/);
        let [user, option] = [matched.groups.user, matched.groups.option];
        let res = "";
        if (option === "theme") {
            let theme;
            if (urlInfo.query.theme) {
                theme = parseInt(urlInfo.query.theme);
                await db.run("insert or replace into theme values (?, ?)", user.length === 32 ? user : (await db.get("select * from user where name = ?", user)).uuid, theme).catch(console.error);
            }
            theme = (await db.get("select * from user left outer join theme on user.uuid = theme.uuid where name = ? or theme.uuid = ?", user, user).catch(console.error) || {theme: 0}).theme;
            res = "" + theme;
        } else if (option === "watch") {
            let watch;
            if (urlInfo.query.auction_uuid && urlInfo.query.end) {
                await db.run("insert or replace into watch values ((select uuid from user where name = ?), ?, ?, ?)", user, urlInfo.query.auction_uuid, parseInt(urlInfo.query.end), true);
            } else if (urlInfo.query.auction_uuid) {
                await db.run("insert or replace into watch (uuid, auction_uuid, enabled) values ((select uuid from user where name = ?), ?, ?)", user, urlInfo.query.auction_uuid, false);
            }
            watch = await db.all("select * from watch where uuid = (select uuid from user where name = ?) and enabled = true and end > ?", user, new Date().getTime());
            res = JSON.stringify(watch);
        } else if (option === "notif") {
            let notif;
            if (urlInfo.query.enabled) {
                await db.run("insert or replace into notification values ((select uuid from user where name = ?), ?)", user, parseInt(urlInfo.query.enabled || 1));
            }
            notif = await db.get("select * from notification where uuid = (select uuid from user where name = ?)", user);
            res = JSON.stringify(notif);
        }
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(res);
        response.end();
        return;
    }
    return handler(request, response, {
        public: "./dist",
        rewrites: [
            {"source": "/*", "destination": "/index.html"}
        ]
    });
});

const listener = server.listen(process.env.PORT || 3000, _ => console.log("listening on port " + listener.address().port));

sqlite.open(__dirname + "/database/main.db").then(d => db = d);
