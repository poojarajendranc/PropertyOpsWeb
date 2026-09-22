import type { Request, Response } from "express";
import { createMaintenanceRequest, deleteMaintenanceRequest, getMaintenanceRequests, updateMaintenanceStatus } from "../services/maintenance.service.js";
import responseHandler from "../utils/responseHandler.js";

export const getMaintenance = async (_req: Request, res: Response) => {
    try {
        const maintenanceRequests = await getMaintenanceRequests();
        return responseHandler.successResponse(
            res,
            200,
            "Maintenance requests fetched successfully",
            maintenanceRequests as any,
        );
    } catch (error) {
        return responseHandler.errorResponse(
            res,
            500,
            "Failed to fetch maintenance requests"
        );
    }
};

export const createMaintenance = async (req: Request, res: Response) => {
    try {
        const maintenanceRequests = await createMaintenanceRequest(req.body);

        return responseHandler.successResponse(
            res,
            200,
            "Maintenance created successfully",
            maintenanceRequests as any,
        );

    } catch (error) {
        return responseHandler.errorResponse(
            res,
            500,
            "Failed to create maintenance item"
        );
    }
}

export const updateMaintenance = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updateRequest = await updateMaintenanceStatus(Number(id), status)
        return responseHandler.successResponse(res,
            200,
            "Maintenance status updated successfully",
            updateRequest as any
        )

    } catch (error) {
        return responseHandler.errorResponse(
            res,
            500,
            "Failed to update maintenance item"
        );
    }
}

export const deleteMaintenance = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteMaintenanceRequest(Number(id))
        return responseHandler.successResponse(res,
            200,
            "Maintenance status updated successfully",
            null
        )
    }
    catch (error) {
        return responseHandler.errorResponse(
            res,
            500,
            "Failed to delete item"
        );
    }
}