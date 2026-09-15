import { useEffect, useState } from "react";
import StatusBadge from "../../../components/StatusBadge";
import type { MaintenanceRequest, MaintenanceStatus } from "../types/maintenance";
import { deleteMaintenanceRequest, updateMaintenanceRequest } from "../services/maintenanceApi";

interface MaintenanceTableProps {
    readonly requests: MaintenanceRequest[]
    readonly onSelectRequest: (request: MaintenanceRequest) => void
}

function MaintenanceTable({ requests, onSelectRequest }: MaintenanceTableProps) {
    const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([]);
    console.log("requests:", maintenanceRequests)

    useEffect(() => {
        if (requests) {
            setMaintenanceRequests(requests)
        }
    }, [requests])

    const updateStatus = async (id: number,
        status: MaintenanceStatus
    ) => {
        await updateMaintenanceRequest(id, status)
        setMaintenanceRequests((currentRequests) => currentRequests.map((request) =>
            request.id === id ? { ...request, status } : request))
    }

    const deleteMaintenanceItem = async (id: number) => {
        await deleteMaintenanceRequest(id)
        setMaintenanceRequests((currentRequest) => currentRequest.filter((request) => request.id !== id))
    }

    return (
        <div>
            <h2>Recent Maintenance Requests</h2>
            {maintenanceRequests.map((request) => (
                <div key={request.id}>
                    <p>{request.title}</p>
                    <p>Priority:{request.priority}</p>
                    <StatusBadge status={request.status} />
                    <button
                        onClick={() => onSelectRequest(request)}>
                        View
                    </button>
                    <button
                        onClick={() => updateStatus(request.id, 'Completed')}>
                        Complete
                    </button>
                    <button
                        onClick={() => deleteMaintenanceItem(request.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    )

}

export default MaintenanceTable;