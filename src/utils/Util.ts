import fs from "fs";
import path from "path";

export class Util {
    constructor () {};

    public static parseEmitter (emitter: string): "client" | "process" {
        if (typeof emitter === "string") {
            if (["client", "process"].includes(emitter)) {
                return emitter as "client" | "process";
            };
        };

        return "client";
    };

    /**
     * Get files from a directory
     * @param {string} dir - The path of the directory
     * @returns {string}
     */
    public static readdir(dir: string, ext?: string): string[] {
        const array: string[] = [];

        (function readDir(dir) {
            const files = fs.readdirSync(dir);

            for (const file of files) {
                const fp = path.join(dir, file);
                
                if (fs.statSync(fp).isDirectory()) {
                    readDir(fp);
                } else {
                    if (!ext) {
                        array.push(fp);
                    } else if (ext && fp.endsWith(ext)) {
                        array.push(fp);
                    };
                };
            };
        })(dir);

        return array;
    };
};