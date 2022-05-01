import { ErisVulture } from "./ErisVulture";
import VultureModule from "./VultureModule";
import { Util } from "../utils/Util";
import path from "path";

export interface VultureHandlerOptions {
    directory: string;
    classInstance?: Function;
};

export class VultureHandler {
    public client: ErisVulture;
    public directory: string;
    public classInstance: Function;
    public cache: Map<string, any>;

    constructor (client: ErisVulture, {
        directory,
        classInstance = VultureModule
    }: VultureHandlerOptions) {

        /**
         * The Vulture client
         * @type {ErisVulture}
         */
        this.client = client;

        /**
         * The main directory path to modules
         * @type {string}
         */
        this.directory = directory;

        /**
         * The instance of the module
         * @type {Function}
         */
        this.classInstance = classInstance;

        /**
         * The cache of the modules
         * @type {Map}
         */
        this.cache = new Map();
    };

    public registerModule (mod: any, path: string): VultureModule {
        mod.client = this.client;
        mod.path = path;
        mod.handler = this;

        if (mod.id) {
            this.cache.set(mod.id, mod);
        };

        return mod;
    };

    public async load (mod: string): Promise<VultureModule | undefined> {
        if (typeof mod !== "string") {
            return;
        };

        var file;

        try {
            file = require(path.resolve(mod));  
        } catch {
            file = await import(path.resolve(mod));
        };
        
        if (this.getExport(file) === "default") {
            file = new file.default();
        } else if (this.getExport(file)) {
            file = new file();
        } else {
            try {delete require.cache[require.resolve(mod)]} catch {};
            return undefined;
        };

        if (!(file instanceof this.classInstance)) {
            return;
        };

        return this.registerModule(file, mod);
    };

    public loadAll (dir = this.directory) {
        const files = Util.readdir(dir, ".js");

        for (const fp of files) {
            const file = path.resolve(fp);
            this.load(file);
        };
    };

    private getExport (func: any): string | boolean {
        if (typeof func === "object" && typeof func.default === "function") {
            return "default";
        } else if (typeof func === "function") {
            return true;
        };

        return false;
    };
};