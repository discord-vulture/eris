import { Embed, EmbedAuthor, EmbedField, EmbedFooter, EmbedImage, EmbedProvider, EmbedVideo } from "eris";

export default class MessageEmbed implements Embed {
    public author?: EmbedAuthor | undefined;
    public footer?: EmbedFooter | undefined;
    public image?: EmbedImage | undefined;
    public provider?: EmbedProvider | undefined;
    public thumbnail?: EmbedImage | undefined;
    public type = "rich";
    public video?: EmbedVideo | undefined;
    public color?: number | undefined;
    public description?: string | undefined;
    public fields?: EmbedField[] | undefined;
    public timestamp?: string | Date | undefined;
    public title?: string | undefined;
    public url?: string | undefined;

    constructor(data?: Embed) {
        if (typeof data === "object") {
            Object.keys(data).forEach((key) => {
                this[key] = data[key];
            });
        };

        this.setImage("Hi")
    };

    public setTitle(title: string, url?: string): this {
        this.title = title;
        return this;
    };

    public setDescription(desc: string): this {
        this.description = desc;
        return this;
    };

    public setImage(url: string, options?: Omit<EmbedImage, "url">): this {
        this.image = { url, ...options};
        return this;
    };

    public setThumbnail(url: string, options?: Omit<EmbedImage, "url">): this {
        this.thumbnail = { url, ...options};
        return this;
    };

    public setAuthor (name: string, icon_url: string): this {
        this.author = { name, icon_url };
        return this;
    };

    public setFooter (text: string, icon_url: string): this {
        this.footer = { text, icon_url };
        return this;
    };

    public addField (name: string, value: string, inline = false): this {
        if (name && value) {
            if (!this.fields) this.fields = [] as EmbedField[];

            this.fields.push({ name, value, inline: Boolean(inline) });
        };

        return this;
    };

    public addFields (...args: EmbedField[]): this {
        [...args].forEach((obj) => {
            const { name, value, inline = false } = obj;

            if (name && value) {
                if (!this.fields) this.fields = [] as EmbedField[];

                this.fields.push({ name, value, inline: Boolean(inline) });
            };
        });

        return this;
    };

    public setTitleURL (url: string): this {
        this.url = url;
        return this;
    };
};