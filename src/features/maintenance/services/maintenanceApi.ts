import type { MaintenanceRequest, MaintenanceStatus, PriorityStatus } from "../types/maintenance";
import api from "../../../services/api";

interface MaintenanceResponse {
    success: boolean;
    data: MaintenanceRequest[]
}

export const getMaintenanceRequests = async (): Promise<MaintenanceRequest[]> => {
    const response = await api.get<MaintenanceResponse>("/maintenance")
    return response.data.data;
}

interface CreateMaintenanceRequest {
    title: string;
    priority: PriorityStatus;
    status: MaintenanceStatus;
    description?: string
}

export const createMaintenanceRequest = async (request: CreateMaintenanceRequest) => {
    await api.post("/maintenance", request)
}

export const updateMaintenanceRequest = async (id:number,
    status:MaintenanceStatus
) => {
    await api.patch(`/maintenance/${id}`, {status})
}

export const deleteMaintenanceRequest = async(id:number) => {
    await api.delete(`/maintenance/${id}`);
}