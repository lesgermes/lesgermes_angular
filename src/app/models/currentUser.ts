export class CurrentUser {
    username: string;
    title: string;
    lastname: string;
    firstname: string;
    email: string;
    coins: number;

    constructor(obj?: any) {
        this.username       = obj && obj.username   || null;
        this.title          = obj && obj.title      || null;
        this.lastname       = obj && obj.lastname   || null;
        this.firstname      = obj && obj.firstname  || null;
        this.email          = obj && obj.email      || null;
        this.coins          = obj && obj.coins      || null;
    }
}