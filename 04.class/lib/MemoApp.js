import fs from "fs";

import { Memo } from "./Memo.js";

export class MemoApp {
  #filename;

  constructor(filename) {
    this.#filename = filename;
  }

  add(text) {
    const memo = new Memo(text);
    this.#writeFile([
      ...this.list(),
      { title: memo.title, content: memo.content },
    ]);
  }

  list() {
    try {
      const data = fs.readFileSync(this.#filename, "utf8");
      return JSON.parse(data);
    } catch (err) {
      if (err.code === "ENOENT") {
        // ファイルが存在しない場合は、空の配列を返す
        return [];
      } else {
        throw err;
      }
    }
  }

  // タイトルだけを取得する
  preview() {
    return this.list().map((memo) => memo.title);
  }

  refer(index) {
    return this.list()[index].content;
  }

  delete(index) {
    const memos = this.list();
    memos.splice(index, 1);
    this.#writeFile(memos);
  }

  #writeFile(memos) {
    fs.writeFileSync(this.#filename, JSON.stringify(memos));
  }
}
