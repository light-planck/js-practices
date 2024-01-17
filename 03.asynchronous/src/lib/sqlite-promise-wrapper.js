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

export const eachAsPromise = (db, query, ...params) => {
  const callback =
    params.length > 0 && typeof params.slice(-1)[0] === "function"
      ? params.pop()
      : () => {};

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
      (err, counts) => {
        if (err) {
          reject(err);
        } else {
          resolve(counts);
        }
      },
    );
  });
};
