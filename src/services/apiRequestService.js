import axios from "axios";
import { FixPath } from "./fixPath";
import { UrlBuilder } from "./urlBuilder/urlBuilder";

export class ApiRequest {

    url = "";

    static setUrl(baseUrl, params, id = null) {
        this.url = new UrlBuilder(
            FixPath.fix(baseUrl, params, id)
        ).get();
        console.log(this.url);
        return this;
    }

    static setToken(token) {
        if (token)
            sessionStorage.setItem('access_token', token);
    }

    static removeToken() {
        sessionStorage.removeItem('access_token');
    }

    static get token() {
        return sessionStorage.getItem('access_token');
    }

    static get headers() {
        let headers = {};

        if (this.token)
            headers['Authorization'] = `Bearer ${this.token}`;

        return headers;
    }

    static async get(url) {
        if (!url) url = this.url;
        try {
            return (await axios.get(url, {
                headers: this.headers
            })).data;
        } catch (err) {
            if (err.response?.status === 401) {
                if(window.location.pathname!=="/401")
                    window.location = "/401";
            }
        }
    }

    static async post(url, data) {
        if (!url) url = this.url;
        return (await axios.post(url, data, {
            headers: this.headers
        })).data;
    }

    static async put(url, data) {
        if (!url) url = this.url;
        return (await axios.put(url, data, {
            headers: this.headers
        })).data;
    }

    static async delete(url) {
        if (!url) url = this.url;
        return (await axios.delete(url, {
            headers: this.headers
        })).data;
    }

    static async head(url) {
        if (!url) url = this.url;
        return (await axios.head(url, {
            headers: this.headers
        })).data;
    }

    static async request(url, method, data) {
        if (!url) url = this.url;
        return (await axios({
            method,
            url,
            data,
            headers: this.headers
        })).data;
    }
}