const TOKEN_KEY = "property_ops_token";
const REFRESH_TOKEN_KEY = "property_ops_refresh_token";

export const saveToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const saveRefreshToken = (token:string) => {
    localStorage.setItem(REFRESH_TOKEN_KEY,token)
}

export const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export const removeRefreshToken = () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export const removeAuthTokens = () => {
    removeToken();
    removeRefreshToken();
}