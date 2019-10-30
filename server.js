const handler = require("serve-handler");
const http = require("http");
const rp = require("request-promise");
const sqlite = require("sqlite-async");
const url = require("url");
const child_process = require("child_process");

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
    return handler(request, response, {
        public: "./dist",
        rewrites: [
            {"source": "/*", "destination": "/index.html"}
        ]
    });
});

const listener = server.listen(process.env.PORT || 3000, _ => console.log("listening on port " + listener.address().port));
