import store from "../store";

export const getStoredAccessToken = () => {
  return store.getState().user.accessToken;
};
