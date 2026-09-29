import api from './api';

interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        id: number,
        name: string,
        email: string,
        role: string
    }
}

interface ApiLoginResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: LoginResponse
}

export const login = async (credentials: LoginRequest
): Promise<LoginResponse> => {
    const response = await api.post<ApiLoginResponse>("/auth/login",
        credentials)
    return response.data.data;
}

export interface RefreshResponse {
    accessToken: string;
}

export interface ApiRefreshResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: RefreshResponse;
}

export const refreshAccessToken = async (refreshToken: string): Promise<RefreshResponse> => {
    const response = await api.post<ApiRefreshResponse>("/auth/refresh",{refreshToken})
    return response.data.data;
}

interface RegisterRequest {
    email: string,
    password: string,
    role: string,
    name: string
}

export const registerUser = async (credentials: RegisterRequest) => {
    const response = await api.post("/auth/register", credentials);
    return response.data;
}