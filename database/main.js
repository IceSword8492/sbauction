const fs = require("fs");
const sqlite = require("sqlite-async");

async function main (argc, argv) {
    if (argv[2] === "add") {
        let patch = fs.readFileSync(__dirname + "/patch.sql", "utf8");
        let ts = new Date().getTime();
        fs.writeFileSync(__dirname + "/history/" + ts + ".sql", patch);
        let log = {added: [], applied: []};
        try {
            log = JSON.parse(fs.readFileSync(__dirname + "/log.json", "utf8"));
        } catch {}
        log.added.push("" + ts);
        fs.writeFileSync(__dirname + "/log.json", JSON.stringify(log, 0, 4));
        console.log("\u001b[32madded\u001b[0m " + ts);
        return;
    }
    if (argv[2] === "apply") {
        let log;
        try {
            log = JSON.parse(fs.readFileSync(__dirname + "/log.json"));
        } catch {
            log = {
                added: [],
                applied: [],
            };
        }
        let db = await sqlite.open(__dirname + "/main.db");
        for (let ts of log.added) {
            let sql = fs.readFileSync(__dirname + "/history/" + ts + ".sql", "utf8");
            for (let line of sql.split(/\n/g)) {
                if (line.trim().length && line.trim().indexOf("--") !== 0) {
                    await db.run(line);
                }
            }
            log.applied.push(ts);
            console.log("\u001b[32mapplied\u001b[0m " + ts);
        }
        db.close();
        log.added = [];
        fs.writeFileSync(__dirname + "/log.json", JSON.stringify(log, 0, 4));
        return;
    }
    if (argv[2] === "status") {
        let log = {added: [], applied: []};
        try {
            log = JSON.parse(fs.readFileSync(__dirname + "/log.json", "utf8"));
        } catch {
            console.log("\n\u001b[31mError\u001b[0m 初期化が必要です");
            return;
        }
        console.log("\u001b[32m適用済\u001b[0m\n" + log.applied.join("\n") + "\n\u001b[31m未適用\u001b[0m\n" + log.added.join("\n"));
        console.log("\u001b[0m");
        return;
    }
    if (argv[2] === "delete") {
        if (argv[3]) {
            try {
                let log = {added: [], applied: []};
                try {
                    log = JSON.parse(fs.readFileSync(__dirname + "/log.json"));
                } catch {}
                fs.unlinkSync(__dirname + "/history/" + ts + ".sql");
                log.added = log.added.filter(t => !t.match(new RegExp(argv[3], "g")));
                log.applied = log.applied.filter(t => !t.match(new RegExp(argv[3], "g")));
                let ts = log.added.find(t => t.match(new RegExp(argv[3])));
                ts = ts || log.applied.find(t => t.match(new RegExp(argv[3])));
                fs.writeFileSync(__dirname + "/log.json", JSON.stringify(log, 0, 4));
                console.log("\u001b[32m削除しました\u001b[0m");
            } catch {
                console.log("\n\u001b[31m削除に失敗しました\u001b[0m");
            }
        } else {
            console.log("\n\u001b[31mタイムスタンプを指定してください\u001b[0m");
        }
        return;
    }
    if (argv[2] === "init") {
        try {
            fs.accessSync(__dirname + "/log.json");
            console.log("\u001b[31mError\u001b[0m log.jsonを削除してください");
        } catch {
            let log = {added: [], applied: []};
            let dir = fs.readdirSync(__dirname + "/history");
            log.added = dir.map(sql => sql.substring(0, sql.lastIndexOf(".")));
            fs.writeFileSync(__dirname + "/log.json", JSON.stringify(log, 0, 4));
            console.log("\u001b[32m初期化処理が完了しました\u001b[0m");
        }
        return;
    }
    console.log(`usage:\tnode . <subcommand>
subcommands:
\tinit\t\t\tinitialize
\tadd\t\t\tadd patch to history
\tapply\t\t\tapply added patches
\tstatus\t\t\tshow status
\tdelete <timestamp>\tdelete added or applied sql`);
    return;
}

(async (argc, argv) => await main(argc, argv))(process.argv.length, process.argv);