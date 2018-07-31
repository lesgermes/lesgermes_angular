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

    constructor(obj?: any) {
        this.name   = obj && obj.name       || null;
        this.type   = obj && obj.type.name  || null;
        this.url    = obj && obj.url        || null;
    }
}