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
  const callback = (() => {
    const lastParam = paramsAndCallback[paramsAndCallback.length - 1];
    if (paramsAndCallback.length > 0 && typeof lastParam === "function") {
      return lastParam;
    }

    return () => {};
  })();

  const params =
    callback === (() => {})
      ? paramsAndCallback
      : paramsAndCallback.slice(0, -1);

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
