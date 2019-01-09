export class CurrentUser {
    username: string;
    title: string;
    last_name: string;
    first_name: string;
    email: string;
    coins: number;

    constructor(obj?: any) {
        this.username       = obj && obj.username   || null;
        this.title          = obj && obj.title      || null;
        this.last_name      = obj && obj.last_name  || null;
        this.first_name     = obj && obj.first_name || null;
        this.email          = obj && obj.email      || null;
        this.coins          = obj && obj.coins      || null;
    }
}