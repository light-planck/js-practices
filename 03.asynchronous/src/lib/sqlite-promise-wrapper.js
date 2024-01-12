export const runAsPromise = (db, query, params = []) =>
  new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });

export const eachAsPromise = (db, query, params = [], callback = () => {}) =>
  new Promise((resolve, reject) => {
    db.each(
      query,
      params,
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          callback(row);
        }
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });
