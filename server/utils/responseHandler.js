export const createError = (status, message, error = null) => {
  const err = new Error(message);
  err.status = status;
  err.details = error;
  return err;
};

export const createSuccess = (message, data = null) => {
  return {
    success: true,
    status: 200,
    message,
    data,
  };
};
