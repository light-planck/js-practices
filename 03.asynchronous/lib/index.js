export const runAsPromise = (db, query, params = []) =>
  new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });

export const getAsPromise = (db, query, params = []) =>
  new Promise((resolve, reject) => {
    db.get(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
