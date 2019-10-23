const handler = require("serve-handler");
const http = require("http");
const rp = require("request-promise");
const sqlite = require("sqlite-async");
const url = require("url");

const server = http.createServer(async (request, response) => {
    let urlInfo = url.parse(request.url, true);
    let path = urlInfo.pathname;
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
        let res = await rp.get("https://api.hypixel.net/skyblock/auctions?key=f20bce2b-d8a4-4c97-ac90-ea5c732f8d25&page=" + page);
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(res);
        response.end();
        return;
    }
    if (path.indexOf("/api/v1/search") === 0) {
        let query = urlInfo.query.query;
        let page = Math.abs(parseInt("0" + urlInfo.query.page));
        if (!query || query.length === 0) {
            query = "sort:price.desc";
        }
        let regex = /(?<sort>sort:(?<sortby>[^ ]+))|(?<script>(?<mcid>(?:(?!::).)*)::(?<script_name>[^ ]+))|(?<seller>seller:(?<seller_stmt>[^ ]+))|(?<name>name:((?<name_regex>\/([^\\/]|\\.)*\/[a-z]?)|(?<name_stmt>"([^\\"]|\\.)*"|[^ ]+)))|(?<lore>lore:((?<lore_regex>\/([^\\/]|\\.)*\/[a-z]?)|[^ ]+))|(?<tier>tier:(?<tier_stmt>[^ ]+))|(?<price>price:(?<price_stmt>[^ ]+))|(?<page>page:(?<page_num>[0-9]+))|(?<continue>\>)/g;
        let matched = null;
        let result = [];
        let insertFlag = false;
        let matchFlag = false;
        while (matched = regex.exec(query)) {
            if (result.length) {
                if (matched.groups.continue && insertFlag) { console.log("err");
                    response.writeHead(200, {"Content-Type": "application/json"});
                    response.write("[]");
                    response.end();
                    return; // error
                }
                if (matched.groups.continue && !insertFlag) {
                    insertFlag = true;
                }
            }
            if (matched.groups.lore) {
                matchFlag = true;
                if (result.length) {
                    if (matched.groups.lore_regex) {
                        if (matched.groups.lore_regex.match(/\/(?<value>([^\\/]|\\.)*)\/[a-z]?/)) {
                            result = result.filter(auction => auction.item_lore.match(new RegExp(matched.groups.lore_regex.match(/\/(?<value>([^\\/]|\\.)*)\/[a-z]?/).groups.value)));
                        } else {
                            console.error("lore regex error continue");
                        } 
                    }
                } else {
                    if (matched.groups.lore_regex) {
                        if (matched.groups.lore_regex.match(/\/(?<value>([^\\/]|\\.)*)\/[a-z]?/)) {
                            result = all_auctions.filter(auction => auction.item_lore.match(new RegExp(matched.groups.lore_regex.match(/\/(?<value>([^\\/]|\\.)*)\/[a-z]?/).groups.value)));
                        } else {
                            console.error("lore regex error");
                        }
                    }
                }
                insertFlag = false;
                continue;
            }
            if (matched.groups.tier) {
                matchFlag = true;
                result = (result.length ? result : all_auctions).filter(auction => auction.tier.toLowerCase() === matched.groups.tier_stmt.toLowerCase());
                insertFlag = false;
                continue;
            }
            if (matched.groups.seller) {
                matchFlag = true;
                let seller = (await rp.get("/api/v1/auth/" + matched.groups.seller_stmt)).match(/{{(?<value>(?:(?!{{|}}).)+)}}/).groups.value;
                result = (result.length ? result : all_auctions).filter(auction => auction.auctioneer === seller);
                insertFlag = false;
                continue;
            }
            if (matched.groups.page) {
                page = Math.floor(parseInt("0" + matched.groups.page_num));
                insertFlag = false;
                continue;
            }
            if (matched.groups.price) {
                matchFlag = true;
                let m = matched.groups.price_stmt.match(/(?<low>[0-9]+)-(?<high>[0-9]+)/);
                let [price_low, price_high] = [m.groups.low, m.groups.high];
                result = (result.length ? result : all_auctions).filter(auction => {
                    let price = auction.highest_bid_amount || auction.starting_bid;
                    return price_low <= price && price <= price_high;
                });
                insertFlag = false;
                continue;
            }
            if (matched.groups.name) {
                matchFlag = true;
                if (result.length) {
                    if (matched.groups.name_regex) {
                        if (matched.groups.name_regex.match(/\/(?<value>([^\\/]|\\.)*)\/[a-z]?/)) {
                            result = result.filter(auction => auction.item_name.match(new RegExp(matched.groups.name_regex.match(/\/(?<value>([^\\/]|\\.)*)\/[a-z]?/).groups.value)));
                        } else {
                            console.error("lore regex error continue");
                        } 
                    } else if (matched.groups.name_stmt) {
                        result = result.filter(auction => auction.item_name.toLowerCase() === matched.groups.name_stmt.match(/"?(?<value>([^\\"]|\\.)*)"?/).groups.value.toLowerCase());
                    }
                } else {
                    if (matched.groups.name_regex) {
                        if (matched.groups.name_regex.match(/\/(?<value>([^\\/]|\\.)*)\/[a-z]?/)) {
                            result = all_auctions.filter(auction => auction.item_name.match(new RegExp(matched.groups.name_regex.match(/\/(?<value>([^\\/]|\\.)*)\/[a-z]?/).groups.value)));
                        } else {
                            console.error("lore regex error");
                        }
                    } else if (matched.groups.name_stmt) {
                        result = all_auctions.filter(auction => auction.item_name.toLowerCase() === matched.groups.name_stmt.match(/"?(?<value>([^\\"]|\\.)*)"?/).groups.value.toLowerCase());
                    }
                }
                insertFlag = false;
                continue;
            }
            if (matched.groups.script) { // 未実装
                matchFlag = true;
                insertFlag = false;
                continue;
            }
            if (matched.groups.sort) {
                if (!matchFlag) {
                    result = all_auctions;
                }
                let method = matched.groups.sortby;
                let methods = {
                    "price": sort_bid_amount_desc,
                    "price.desc": sort_bid_amount_desc,
                    "price.asc": sort_bid_amount_asc,
                    "time": sort_time_asc,
                    "time.desc": sort_time_desc,
                    "time.asc": sort_time_asc,
                    "bid": sort_bid_desc,
                    "bid.desc": sort_bid_desc,
                    "bid.asc": sort_bid_asc,
                };
                result = result.sort(methods[method]);

                insertFlag = false;
                continue;
            }
        }
        result = result.filter((auction, index) => {
            if (index >= page * 48 && index < (page + 1) * 48) {
                return true;
            }
            return false;
        });
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(JSON.stringify(result));
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

let all_auctions = [];
let sortMethod = sort_bid_amount_desc;

update();
setInterval(function () {
    update();
}, 60000);

async function update () {
    let totalPages = 1;
    let auctions = JSON.parse(await rp.get("https://api.hypixel.net/skyblock/auctions?key=f20bce2b-d8a4-4c97-ac90-ea5c732f8d25"));

    totalPages = auctions.totalPages;

    all_auctions = merge(all_auctions, auctions.auctions, "uuid");

    all_auctions.sort(sortMethod);
    for (let page = 2; page < totalPages; page++) {
        auctions = JSON.parse(await rp.get("https://api.hypixel.net/skyblock/auctions?key=f20bce2b-d8a4-4c97-ac90-ea5c732f8d25&page=" + page));
        all_auctions = merge(all_auctions, auctions.auctions, "uuid");
        all_auctions.sort(sortMethod);
    }
}

function merge (a, b, p) {
    return Object.values([...a, ...b]
        .reduce((obj, it) => {
            obj[it[p]] = it;
            return obj;
        }, {}));
}

function sort_bid_amount_desc (a, b) {
    return (b.highest_bid_amount || b.starting_bid) - (a.highest_bid_amount || a.starting_bid);
}

function sort_bid_amount_asc (a, b) {
    return (a.highest_bid_amount || a.starting_bid) - (b.highest_bid_amount || b.starting_bid);
}

function sort_time_desc (a, b) {
    return b.end - a.end;
}

function sort_time_asc (a, b) {
    return a.end - b.end;
}

function sort_bid_desc (a, b) {
    return (b.bidders || []).length - (a.bidders || []).length;
}

function sort_bid_asc (a, b) {
    return (a.bidders || []).length - (b.bidders || []).length;
}
