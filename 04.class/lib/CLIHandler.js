import minimist from "minimist";

import pkg from "enquirer";
const { Select } = pkg;

export class CLIHandler {
  #app;
  #args;

  constructor(app) {
    this.#app = app;
  }

  execute() {
    this.#parseArgs();

    // 一覧
    if (this.#args.l) {
      this.#app.list().forEach((item) => console.log(item.title));
    }

    // 参照
    else if (this.#args.r) {
      const prompt = new Select({
        name: "refer",
        message: "Choose a note you want to see:",
        choices: this.#app.preview(),
        result() {
          return this.focused.id;
        },
      });

      prompt.on("select", (choice) => {
        console.log(this.#app.refer(choice.index));
      });

      prompt.run().then((answer) => {
        console.log(answer);
      });
    }

    // 削除
    else if (this.#args.d) {
      this.#app.delete(0);
    }

    // 追加
    else {
      process.stdin.on("data", (data) => {
        this.#app.add(data.toString());
      });
    }
  }

  #parseArgs() {
    this.#args = minimist(process.argv.slice(2));
  }
}
