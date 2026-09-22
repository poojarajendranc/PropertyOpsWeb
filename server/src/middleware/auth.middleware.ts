import responseHandler from "../utils/responseHandler.js";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/jwt.js";
import type {
    Request,
    Response,
    NextFunction,
} from "express";

const authenticate = (req: Request, res: Response, next: NextFunction) => {

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

export default authenticate;