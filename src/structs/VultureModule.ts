import { ErisVulture } from "./ErisVulture";
import { VultureHandler } from "./VultureHandler";

export default class VultureModule {
    public id: string;
    public client!: ErisVulture;
    public path!: string;
    public handler!: VultureHandler;

    constructor (id: string) {
        this.id = id;
    };
};