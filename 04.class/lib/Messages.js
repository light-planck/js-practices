export class Messages {
  #refer;
  #delete;

  constructor(messages) {
    this.#refer = messages.refer ?? "";
    this.#delete = messages.delete ?? "";
  }

  get refer() {
    return this.#refer;
  }

  get delete() {
    return this.#delete;
  }
}
