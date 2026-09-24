import { useEffect, useState } from "react";
import StatusBadge from "../../../components/StatusBadge";
import type { MaintenanceRequest, MaintenanceStatus } from "../types/maintenance";
import { deleteMaintenanceRequest, updateMaintenanceRequest } from "../services/maintenanceApi";
import styles from '../styles/Maintenance.module.css'
import {
    Trash, LucideEye
} from "lucide-react";
interface MaintenanceTableProps {
    readonly isDashboard?: boolean
    readonly requests: MaintenanceRequest[]
    readonly onSelectRequest: (request: MaintenanceRequest) => void
}

function MaintenanceTable({ isDashboard = false, requests, onSelectRequest }: MaintenanceTableProps) {
    const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([]);


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
            <h2 className={styles.headerTextStyle}>Recent Maintenance Requests</h2>
            <div className={styles.baseContainer}>
                {maintenanceRequests.map((request) => (
                    <div className={styles.itemCard} key={request.id}>
                        <div className={styles.headerView}>
                            <p className={styles.cardHeaderTextStyle}>{request.title}</p>
                            <div className={styles.iconsHolder}>
                                <LucideEye
                                    onClick={() => onSelectRequest(request)} />
                                {!isDashboard && <Trash
                                    onClick={() => deleteMaintenanceItem(request.id)} />}
                            </div>
                        </div>
                        <p>Priority:{request.priority}</p>
                        <StatusBadge status={request.status} />

                        {!isDashboard && <button
                            onClick={() => updateStatus(request.id, 'Completed')}>
                            Complete
                        </button>}

                    </div>
                ))}
            </div>
        </div>
    )

}

export default MaintenanceTable;