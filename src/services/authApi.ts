import api from './api';

interface LoginRequest {
    email:string;
    password:string;
}

export interface LoginResponse {
    token: string;
    user: {
        id:number,
        name:string,
        email:string,
        role:string
    }
}

interface ApiLoginResponse {
    statusCode: number;
    success:boolean;
    message:string;
    data:LoginResponse
}

export const login = async ( credentials:LoginRequest
): Promise<LoginResponse> => {
    const response = await api.post<ApiLoginResponse>("/auth/login",
        credentials)
    return response.data.data;
}

interface RegisterRequest {
    email:string,
    password:string,
    role:string,
    name:string
}

export const registerUser = async (credentials:RegisterRequest) => {
    const response = await api.post("/auth/register",credentials);
    return response.data;
}