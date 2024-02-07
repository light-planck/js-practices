export const handleErrors = (err, expectedCode) => {
  if (err instanceof Error && err.code === expectedCode) {
    console.error(err.message);
  } else {
    throw err;
  }
};
