export class Memo {
  constructor(text) {
    this.title = text.split("\n")[0];
    this.content = text;
  }
}
