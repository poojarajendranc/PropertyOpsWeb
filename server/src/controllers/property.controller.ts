import type { Request, Response } from "express";
import { createProperty, deleteProperty, getProperties } from "../services/property.service.js"
import responseHandler from "../utils/responseHandler.js";

export const getPropertiesList = async (_req: Request, res: Response) => {
    try {
        const propertiesRequest = await getProperties();
        return responseHandler.successResponse(
            res,
            200,
            "Properties fetch successfull",
            propertiesRequest as any)
    } catch (error) {
        return responseHandler.errorResponse(
            res,
            500,
            "Failed fetching  properties"
        )
    }
}

export const createPropertyData = async (req: Request, res: Response) => {
    try {

        const propertyRequest = await createProperty(req.body);
        return responseHandler.successResponse(
            res,
            200,
            "Property created successfully",
            propertyRequest as any
        )

    } catch (error) {
        console.error("Failed to create property:", error);
        return responseHandler.errorResponse(
            res,
            500,
            "Failed to create property"
        );
    }
}

export const deletePropertyData = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteProperty(Number(id));
        return responseHandler.successResponse(res,
            200,
            "Property successfully removed",
            null
        )
    } catch (error) {
        return responseHandler.errorResponse(res,
            500,
            "Failed removing property data",
            error as any
        )
    }
}

export const updatePropertyData = () => {
    return null
}
