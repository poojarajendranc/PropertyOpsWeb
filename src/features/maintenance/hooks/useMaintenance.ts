import { useEffect, useState } from "react";
import { getMaintenanceRequests } from "../services/maintenanceApi";
import type { MaintenanceRequest } from "../types/maintenance";

export function useMaintenance() {
    const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const loadMaintenance = async () => {
        try {
            setIsLoading(true);
            setError("");

            const data = await getMaintenanceRequests();
            setRequests(data);
        } catch (error) {
            console.error("Failed to load maintenance:", error);
            setError("Failed to load maintenance requests");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadMaintenance();
    }, []);

    return {
        requests,
        isLoading,
        error,
        reload: loadMaintenance,
    };
}