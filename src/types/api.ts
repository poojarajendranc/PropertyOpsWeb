export interface ApiErrorResponse {
    statusCode: number;
    success: false;
    message: string;
    data: Record<string, string> | null;
}