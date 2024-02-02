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

export const eachAsPromise = (db, query, ...paramsAndCallback) => {
  const lastParam = paramsAndCallback[paramsAndCallback.length - 1];
  const hasCallback = typeof lastParam === "function";

  const callback = hasCallback ? lastParam : () => {};
  const params = hasCallback
    ? paramsAndCallback.slice(0, -1)
    : paramsAndCallback;

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
