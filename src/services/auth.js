import { TOKEN_KEY } from "~/config/api";

const tokenName = TOKEN_KEY;
export const isAuthenticated = () => localStorage.getItem(tokenName);
export const getToken = () => localStorage.getItem(tokenName);

export const signIn = async (token) => {
  await localStorage.setItem(tokenName, token);
  window.location = "/home";
};
export const logout = async () => {
  localStorage.removeItem(tokenName);
  window.location = "/";
};
