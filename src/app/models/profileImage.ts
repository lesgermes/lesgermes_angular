export class ProfileImage {
    id: number;
    image: string;
    base_url: string;

    constructor(obj?: any) {
        this.id         = obj && obj.id         || null;
        this.image      = obj && obj.image      || null;
        this.base_url   = obj && obj.base_url   || null;
    }
}