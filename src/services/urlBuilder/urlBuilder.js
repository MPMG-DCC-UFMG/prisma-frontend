export class UrlBuilder {
  HOST = process.env.REACT_APP_HOST;
  url;

  constructor(_url = "") {
    this.setUrl(_url);
  }

  setUrl(_url) {
    this.url = _url;
  }

  appendPrefix(prefix, value) {
    // if (!this.url === "" || this.url.substr(-1) !== "/") this.url += "/";
    this.url += `${prefix}/${value}`;
  }

  append(value) {
    this.url += `/${value}`;
  }

  withCaseId(id) {
    this.appendPrefix("project", id);
    return this;
  }

  withAudioTranscriptionId(id) {
    this.appendPrefix("audio_transcription", id);
    return this;
  }

  withImage() {
    this.url += "/image";
    return this;
  }

  get() {
    return this.HOST + this.url;
  }
}
