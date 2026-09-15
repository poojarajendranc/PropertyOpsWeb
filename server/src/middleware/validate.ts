import type { Request, Response,NextFunction } from "express";
import type { ZodType } from "zod";
import responseHandler from "../utils/responseHandler.js";

const validate = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errors = result.error.issues.reduce((acc, issue) => {
                const field = issue.path[0];
                if (typeof field === "string") {
                    acc[field] = issue.message;
                }
                return acc;
            },
                {} as Record<string, string>)
            return responseHandler.errorResponse(
                res,
                400,
                "Validation Failed",
                errors as any
            );
        }
        req.body = result.data;
        next();
    }
}

export default validate;