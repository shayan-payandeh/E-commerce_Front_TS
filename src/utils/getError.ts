const getError = (err: any, language: string) => {
  return err.response &&
    err.response.data &&
    err.response.data.message &&
    err.response.data.persianMessage
    ? language === 'English'
      ? err.response.data.message
      : err.response.data.persianMessage
    : err.message;
};

export default getError;
