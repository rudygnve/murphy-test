export const isValidURL = (uri: string) => {
  const regex = /(https\:\/\/)?(www\.)?facebook.com\/groups\/.+/g;
  return regex.test(uri);
};
