export class Memo {
  #title;
  #content;

  constructor(text) {
    this.#title = text.split("\n")[0];
    this.#content = text;
  }

  get title() {
    return this.#title;
  }

  get content() {
    return this.#content;
  }
}
