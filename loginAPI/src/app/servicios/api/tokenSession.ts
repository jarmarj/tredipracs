export class tokenSession {
    token: string;
    private KEY: string = "act1";

    constructor() {
        this.token = sessionStorage.getItem(this.KEY);
        console.log(this.token);
        
    }

    hasToken(): boolean {
        return !!this.token;
    }

    set sessionToken(token: string) {
        this.token = token;
        sessionStorage.setItem(this.KEY, this.token);
    }

    get getSessionToken(): string {
        return this.token;
    }

    clearToken(){
        sessionStorage.removeItem(this.KEY);
        this.token = null;
    }
}