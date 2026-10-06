// import type { MaintenanceRequest, MaintenanceStatus, PriorityStatus } from "../types/maintenance";
// import api from "../../../services/api";

import api from "../../../services/api";
import type { PropertyRequest } from "../types/properties";

interface AddPropertyResponse {
    success: boolean;
    data: any //MaintenanceRequest[]
}


interface PropertyResponse {
    success: boolean;
    data: PropertyRequest[]
}


export const createPropertyRequest = async (request: PropertyRequest) => {
    await api.post('/property', request)
}

export const getPropertiesListData = async (): Promise<PropertyRequest[]> => {
    const response = await api.get<PropertyResponse>("/property")
    return response.data.data;
}
