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

export const eachAsPromise = (db, query, params = []) =>
  new Promise((resolve, reject) => {
    const rows = [];

    db.each(
      query,
      params,
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          rows.push(row);
        }
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      },
    );
  });

export const handleErrors = (err, errorType) => {
  if (err.message.includes(errorType)) console.error(err.message);
  else throw err;
};
