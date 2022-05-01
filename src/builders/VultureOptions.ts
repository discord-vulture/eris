import { AllowedMentions, ClientOptions, IntentStrings, ReconnectDelayFunction, RequestHandlerOptions } from "eris";
import { Agent } from "https";

export interface VultureOptionsData {
    token: string;
};

export class VultureOptions {
    public token?: string | undefined;
    public agent?: Agent;
    public allowedMentions?: AllowedMentions;
    public autoreconnect?: boolean;
    public compress?: boolean;
    public connectionTimeout?: number;
    public defaultImageFormat?: string;
    public defaultImageSize?: number;
    public disableEvents?: { [s: string]: boolean };
    public firstShardID?: number;
    public getAllUsers?: boolean;
    public guildCreateTimeout?: number;
    public intents?: number | IntentStrings[];
    public largeThreshold?: number;
    public lastShardID?: number;
    public latencyThreshold?: number;
    public maxReconnectAttempts?: number;
    public maxResumeAttempts?: number;
    public maxShards?: number | "auto";
    public messageLimit?: number;
    public opusOnly?: boolean;
    public ratelimiterOffset?: number;
    public reconnectDelay?: ReconnectDelayFunction;
    public requestTimeout?: number;
    public rest?: RequestHandlerOptions;
    public restMode?: boolean;
    public seedVoiceConnections?: boolean;
    public ws?: unknown;
    
    constructor (data?: ClientOptions & VultureOptionsData) {};

    public setToken (token: string | undefined): this {
        this.token = token;
        return this;
    };

    public setRest (rest: RequestHandlerOptions): this {
        this.rest = rest;
        return this;
    };

    public setRestMode (rest: boolean): this {
        this.restMode = Boolean(rest);
        return this;
    };

    public setIntents (...intents: IntentStrings[]): this {
        this.intents = [...intents];
        return this;
    };

    public setAutoReconnect (autoreconnect: boolean): this {
        this.autoreconnect = autoreconnect;
        return this;
    };

    public setDefaultImageFormat (type: "gif" | "png" | "webp" | "jpg" | "jpeg", size?: number): this {
        this.defaultImageFormat = type;
        this.defaultImageSize = size ?? 2048;
        return this;
    };

    public setFirstShard (id: number | undefined): this {
        this.firstShardID = id;
        return this;
    };

    public setLastShard (id: number | undefined): this {
        this.lastShardID = id;
        return this;
    };

    public setMaxShards (max: number | "auto"): this {
        this.maxShards = max;
        return this
    };

    public setMentions ({ everyone, repliedUser, roles, users }: AllowedMentions): this {
        const data = {} as AllowedMentions;

        if (everyone) data.everyone = Boolean(everyone);
        if (repliedUser) data.repliedUser = Boolean(repliedUser);
        if (roles) data.roles = roles;
        if (users) data.users = users;

        this.allowedMentions = data;

        return this;
    };

    public setMessageLimit (limit: number): this {
        this.messageLimit = limit;
        return this;
    };

    public setReconnectDelay (delay: ReconnectDelayFunction): this {
        this.reconnectDelay = delay;
        return this;
    };
};