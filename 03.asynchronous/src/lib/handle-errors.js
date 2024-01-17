export const handleErrors = (err, errorType) => {
  if (err instanceof Error && err.message === errorType) {
    console.error(err.message);
  } else {
    throw err;
  }
};
