import { ErisVulture } from "../ErisVulture";
import { VultureHandler } from "../VultureHandler";
import VultureModule from "../VultureModule";
import { Listener } from "./Listener";

export interface ListenerHandlerOptions {
    directory: string;
    classInstance?: Function;
};

export class ListenerHandler extends VultureHandler {
    constructor (client: ErisVulture, {
        directory,
        classInstance = Listener
    }: ListenerHandlerOptions) {
        super(client, { directory, classInstance });
    };

    public registerModule (mod: any, path: string): VultureModule {
        mod.client = this.client;
        mod.handler = this;
        mod.path = path;
        
        return this.setup(mod);
    };

    private setup (mod: Listener) {
        if (mod.name) {
            if (mod.emitter === "client") {
                this.client[(mod.once) ? "once" : "on"](mod.name, (...args) => mod.exec(...args));
            } else {
                process[(mod.once) ? "once" : "on"](mod.name, (...args) => mod.exec(...args));
            };
        };
        
        return mod;
    };
};