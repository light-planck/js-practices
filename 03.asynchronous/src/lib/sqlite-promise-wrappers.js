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
  const params = [...paramsAndCallback];

  let callback = () => {};
  const lastParams = paramsAndCallback[paramsAndCallback.length - 1];
  if (paramsAndCallback.length > 0 && typeof last === "function") {
    callback = lastParams;
    params.pop();
  }

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
