export const getBaseURI = () => {
  const apiUri = process.env.NODE_ENV === 'production' ? process.env.PROD_API_URL : process.env.DEV_API_URL;

  return apiUri;
};

export const getDBConnectionString = () => {
  const connectionString =
    process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : process.env.MONGODB_URI_STAGING;

  // eslint-disable-next-line no-console
  console.log('Environment :>> ', process.env.NODE_ENV);

  return connectionString;
};
