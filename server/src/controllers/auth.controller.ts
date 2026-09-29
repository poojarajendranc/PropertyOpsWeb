import type { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service.js";
import responseHandler from "../utils/responseHandler.js";
import { refreshAccessToken } from "../middleware/auth.middleware.js";
export const register = async (
    req: Request,
    res: Response,
) => {
    try {
        await registerUser(req.body);
        return responseHandler.successResponse(
            res,
            200,
            "User registered successfully",
        );
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "Email already registered"
        ) {
            return responseHandler.errorResponse(
                res,
                409,
                error.message,
            );
        }
        return responseHandler.errorResponse(
            res,
            500,
            "Failed to register user",
        );
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const result = await loginUser(req.body)
        return responseHandler.successResponse(
            res,
            200,
            "Log in successful",
            result as any
        );
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "Invalid email or password"
        ) {
            return responseHandler.errorResponse(
                res,
                401,
                error.message,
            );
        }
        return responseHandler.errorResponse(
            res,
            500,
            "Log in failed"
        )
    }
}

export const refresh = async (req: Request, res: Response) => {
    try {
        const result = await refreshAccessToken(req.body.refreshToken);
        return responseHandler.successResponse(res, 200, "Token refreshed successfully",
            result as any
        )
    } catch (error) {
        if (error instanceof Error && error.message === "Invalid or expired refresh token") {
            return responseHandler.errorResponse(
                res,
                401,
                error.message,
            );
        }
        return responseHandler.errorResponse(
            res,
            500,
            "Log in failed"
        )
    }
}