import { Client, ClientOptions } from "eris";

export class ErisVulture extends Client {
    constructor (options: ClientOptions & { token: string }) {
        if (!options.token) {
            throw new TypeError("Client token is not specified");
        };

        if (!options.intents) {
            throw new TypeError("Client intents is not specified");
        };

       super(options.token, options);
    };
};