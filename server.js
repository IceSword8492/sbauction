const handler = require("serve-handler");
const http = require("http");
const rp = require("request-promise");
const sqlite = require("sqlite-async");

const server = http.createServer(async (request, response) => {
    if (request.url.indexOf("/api/v1/auth") === 0) {
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
    if (request.url.indexOf("/api/v1/auctions") === 0) {
        let page = parseInt(request.url.split("/").filter(item => item.length)[request.url.split("/").filter(item => item.length).length - 1]);
        let res = await rp.get("https://api.hypixel.net/skyblock/auctions?key=f20bce2b-d8a4-4c97-ac90-ea5c732f8d25&page=" + page);
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

// setTimeout(async _ => {
//     let page = 0;
//     let db = await sqlite.open("./database/main.db");
//     await db.run("pragma sync_mode=off");
//     await db.run("pragma journal_mode=wal");
//     let stmt = await db.prepare(`insert or replace into auctions values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
//     let time = new Date().getTime();
//     let i = 0;
//     while (true) {
//         let data = JSON.parse(await rp.get("https://api.hypixel.net/skyblock/auctions?key=f20bce2b-d8a4-4c97-ac90-ea5c732f8d25&page=" + page));
//         if (data.success) {
//             page = data.page + 1;
//             for (let auction of data.auctions) {
//                 console.log(`${auction.uuid} ${auction.item_name} ${++i}`);
//                 // db.prepare(`insert or replace into auctions values ("${auction.uuid}", "${auction.auctioneer}", "${auction.profile_id}", ${auction.start}, ${auction.end}, "${auction.item_name}", "${auction.item_lore}", "${auction.extra}", "${auction.category}", "${auction.tier}", ${auction.starting_bid}, "${auction.item_bytes}", ${auction.claimed}, ${auction.highest_bid_amount});`).catch(console.error);
//                 await stmt.run(auction.uuid, auction.auctioneer, auction.profile_id, auction.start, auction.end, auction.item_name, auction.item_lore, auction.extra, auction.category, auction.tier, auction.starting_bid, auction.item_bytes, auction.claimed, auction.highest_bid_amount);
//             }
//             continue;
//         }
//         await stmt.finalize();
//         console.log("done " + (new Date().getTime() - time) / 1000);
//         break;
//     }
// }, 1);
