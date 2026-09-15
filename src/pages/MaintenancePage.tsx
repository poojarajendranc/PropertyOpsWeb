import { useEffect, useState } from "react";
import MaintenanceTable from "../features/maintenance/components/MaintenanceTable";
import type { MaintenanceRequest } from "../features/maintenance/types/maintenance";
import MaintenanceDetails from "../features/maintenance/components/MaintenanceDetails";
import { getMaintenanceRequests } from "../features/maintenance/services/maintenanceApi";
import CreateMaintenanceForm from "../features/maintenance/components/CReateMaintenanceForm";

function MaintenancePage() {
    const [selectedRequest, setSelectedRequest] =
        useState<MaintenanceRequest | null>(null);
    const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([])

    const loadMaintenanceRequests = async () => {
        try {
            const requests = await getMaintenanceRequests();
            console.log("Load data:",requests)
            setMaintenanceRequests(requests)
        } catch (error) {
            console.error("Failed to load maintenance req:", error)
        }
    }
    useEffect(() => {

        loadMaintenanceRequests()
    }, [])

    return (
        <div>
            <h1>Maintenance</h1>
            <MaintenanceTable onSelectRequest={setSelectedRequest}
                requests={maintenanceRequests} />
            {selectedRequest && (
                <MaintenanceDetails
                    id={selectedRequest.id}
                    title={selectedRequest.title}
                    priority={selectedRequest.priority}
                    status={selectedRequest.status}
                />
            )}
            <CreateMaintenanceForm onCreated={loadMaintenanceRequests} />
        </div>
    )
}

export default MaintenancePage;