import fs from "fs";

export class Memos {
  #filename;

  constructor(filename) {
    this.#filename = filename;
  }

  add(memo) {
    this.#writeFile([...this.list(), memo]);
  }

  list() {
    try {
      const data = fs.readFileSync(this.#filename, "utf8");
      return JSON.parse(data);
    } catch (err) {
      if (err.code === "ENOENT") {
        // ファイルが存在しない場合はファイルを作成し、空の配列を返す
        this.#writeFile(JSON.stringify([]));
        return [];
      } else {
        // その他のエラーはそのままスローする
        throw err;
      }
    }
  }

  refer(index) {
    return this.list()[index];
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
