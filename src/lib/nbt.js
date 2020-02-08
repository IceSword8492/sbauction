import * as zlib from "zlib"
import * as nbt from "nbt"

export default class NBT {
    constructor (src) {
        if (typeof src === "string") {
            src = this.decodeUnicode(src);
            src = Buffer.from(src, "base64");
        }
        if (!src) {
            console.error(src);
            throw new Error('invalid src');
        }
        src = zlib.gunzipSync(src);
        this.src = src;
    }
    decodeUnicode (src) {
        return src.replace(/\\u.{4}/g, (match) => {
            match = match.replace("\\u", "0x");
            return String.fromCharCode(parseInt(match, 16));
        });
    }
    async decode () {
        return this.decoded = await new Promise((resolve, reject) => {
            nbt.parse(this.src, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        }).catch(console.error);
    }
}
