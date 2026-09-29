import responseHandler from "../utils/responseHandler.js";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/jwt.js";
import type {
    Request,
    Response,
    NextFunction,
} from "express";

export const refreshAccessToken = async (refreshToken: string) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not configured");
    }
    try {
        const decoded = jwt.verify(refreshToken, jwtSecret) as JwtPayload;
        const accessToken = jwt.sign({
            userId: decoded.userId,
            role: decoded.role
        },
            jwtSecret,
            { expiresIn: "15m" })
        return {
            accessToken
        }

    } catch (e) {
        throw new Error("Invalid or expired refresh token");
    }

}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {

    const authorization = req.headers.authorization;
    if (!authorization) {
        return responseHandler.errorResponse(res,
            401,
            "Authentication Required"
        )
    }
    const [scheme, token] = authorization.split(" ")
    if (scheme != "Bearer" || !token) {
        return responseHandler.errorResponse(res,
            401,
            "Invalid Authentication header"
        )
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return responseHandler.errorResponse(res,
            500,
            "JWT not configured"
        )
    }
    try {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        req.user = decoded;
        next()
    } catch (e) {
        return responseHandler.errorResponse(res,
            401,
            "Invalid or expired token"
        )
    }
}
