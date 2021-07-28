import { UrlBuilder } from "./urlBuilder";

export class UserUrlBuilder extends UrlBuilder {

    constructor() {
        super("user");
    }

    withUserId(_userId) {
        this.setUrl("user/"+_userId);
        return this;
    }

    me() {
        this.setUrl("user/me");
        return this;
    }

}