export class MediaList {
    name: string;
    medias: Array<Media>;

    constructor(obj?: any) {
        this.name   = obj && obj.name || null;
        this.medias = obj && obj.medias.map(media => { return new Media(media); }) || null;
    }
}

export class Media {
    name: string;
    type: string;
    url: string;
    thumbnail: any;
    userCanRead: boolean;

    constructor(obj?: any) {
        this.name           = obj && obj.name           || null;
        this.type           = obj && obj.type.name      || null;
        this.url            = obj && obj.url            || null;
        this.thumbnail      = obj && obj.thumbnail      || null;
        this.userCanRead    = obj && obj.user_can_read  || null;

        if (this.type == "YouTube") {
            this.getYoutubeThumbnail();
        }
    }

    getYoutubeThumbnail() {
        this.thumbnail = "https://img.youtube.com/vi/" + this.url + "/0.jpg";
    }
}