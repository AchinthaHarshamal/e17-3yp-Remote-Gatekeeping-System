export const IS_LOGGED_IN = "IS_LOGGED_IN";

export const loginStateAction = (authizied) => {
  return {
    type: IS_LOGGED_IN,
    authizied: authizied,
  };
};
