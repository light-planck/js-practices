import minimist from "minimist";

import enquirer from "enquirer";
const { Select } = enquirer;

export class CLIHandler {
  #app;
  #messages;
  #args;

  constructor(app, messages) {
    this.#app = app;
    this.#messages = messages;
    this.#parseOptions();
  }

  execute() {
    // 一覧
    if (this.#args.l) {
      this.#app.list().forEach((item) => console.log(item.title));
    }

    // 参照
    else if (this.#args.r) {
      const prompt = new Select({
        name: "refer",
        message: this.#messages.refer,
        choices: this.#app.preview(),
        result() {
          return this.focused;
        },
      });

      prompt.run().then((answer) => {
        const index = answer.index;
        console.log(this.#app.refer(index));
      });
    }

    // 削除
    else if (this.#args.d) {
      const prompt = new Select({
        name: "delete",
        messages: this.#messages.delete,
        choices: this.#app.preview(),
        result() {
          return this.focused;
        },
      });

      prompt.run().then((answer) => {
        const index = answer.index;
        this.#app.delete(index);
      });
    }

    // 追加
    else {
      process.stdin.on("data", (data) => {
        this.#app.add(data.toString());
      });
    }
  }

  #parseOptions() {
    this.#args = minimist(process.argv.slice(2));
  }
}
