import { useEffect, useState } from "react";
import MaintenanceTable from "../features/maintenance/components/MaintenanceTable";
import type { MaintenanceRequest } from "../features/maintenance/types/maintenance";
import MaintenanceDetails from "../features/maintenance/components/MaintenanceDetails";
import { getMaintenanceRequests } from "../features/maintenance/services/maintenanceApi";
import CreateMaintenanceForm from "../features/maintenance/components/CreateMaintenanceForm";
import AppModal from "../components/AppModal";
import AppToast from "../components/AppToast";

function MaintenancePage() {
    const [selectedRequest, setSelectedRequest] =
        useState<MaintenanceRequest | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState("");
    const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([])

    const loadMaintenanceRequests = async () => {
        try {
            setIsLoading(true);
            setApiError("")
            const requests = await getMaintenanceRequests();
            console.log("Load data:", requests)
            setMaintenanceRequests(requests)
        } catch (error) {
            console.error("Failed to load maintenance req:", error)
            setApiError("Failed to load maintenance request")
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {

        loadMaintenanceRequests()
    }, [])

    const handleSelectRequest = (request: MaintenanceRequest) => {
        setSelectedRequest(request);
        setIsDetailsModalOpen(true);
    };

    return (
        <div>
            <h1>Maintenance</h1>
            <button onClick={() => setIsCreateModalOpen(true)}>
                Add Maintenance
            </button>
            {isLoading && <p> Loading Maintenance Request ------ </p>}
            {apiError && <AppToast
                message={apiError}
                type="error"
            />}
            {!isLoading && !apiError && (<MaintenanceTable onSelectRequest={handleSelectRequest}
                requests={maintenanceRequests} />)}
            {selectedRequest && (
                <AppModal
                    isOpen={isDetailsModalOpen}
                    onClose={() => setIsDetailsModalOpen(false)}
                    title="Maintenance Details"
                > <MaintenanceDetails
                        id={selectedRequest.id}
                        title={selectedRequest.title}
                        priority={selectedRequest.priority}
                        status={selectedRequest.status}
                    /></AppModal>
            )}
            <AppModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create Maintenance"
            >
                <CreateMaintenanceForm onCreated={() => {
                    setIsCreateModalOpen(false);
                    loadMaintenanceRequests();
                }} />
            </AppModal >
        </div>
    )
}

export default MaintenancePage;