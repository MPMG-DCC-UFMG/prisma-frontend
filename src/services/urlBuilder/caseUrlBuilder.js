import { UrlBuilder } from "./urlBuilder";

export class CaseUrlBuilder extends UrlBuilder {

    constructor() {
        super("project");
    }

    withId(id) {
        this.append(id);
        return this;
    }

}