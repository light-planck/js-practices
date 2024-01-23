export const runAsPromise = (db, query, ...params) =>
  new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });

export const eachAsPromise = (db, query, ...args) => {
  const params = args;
  const callback =
    typeof args[args.length - 1] === "function" ? params.pop() : () => {};

  return new Promise((resolve, reject) => {
    db.each(
      query,
      params,
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          callback(err, row);
        }
      },
      (err, count) => {
        if (err) {
          reject(err);
        } else {
          resolve(count);
        }
      },
    );
  });
};
