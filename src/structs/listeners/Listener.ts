import VultureModule from "../VultureModule";
import { EventListeners } from "eris";
import { Util } from "../../utils/Util";

export type EmitterTypes = "client" | "process";

export interface ListenerOptions {
    name: keyof EventListeners;
    once?: boolean;
    emitter?: EmitterTypes;
};

export class Listener extends VultureModule {
    public name: keyof EventListeners;
    public once?: boolean;
    public emitter?: EmitterTypes;
    public id: string;

    constructor (id: string, {
        name,
        once = false,
        emitter = "client"
    } = {} as ListenerOptions) {
        super(id);

        /**
         * The name of the event
         * @param {string}
         */
        this.name = name;

        /**
         * Whether to listen once or not
         * @type {boolean}
         */
        this.once = Boolean(once);

        /**
         * The event emitter
         * @type {string | EmitterTypes}
         */
        this.emitter = Util.parseEmitter(emitter);

        /**
         * The id of the listener
         * @type {string}
         */
        this.id = id;
    };
    
    public exec(...args) {
        return;
    };
};