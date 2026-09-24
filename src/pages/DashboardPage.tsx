import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import MaintenanceTable from "../features/maintenance/components/MaintenanceTable";
import { useMaintenance } from "../features/maintenance/hooks/useMaintenance";
import styles from './styles/DashboardPage.module.css';

function DashboardPage() {
    const navigate = useNavigate();
    const { requests, isLoading } = useMaintenance();

    return (
        <div className={styles.page}>
            <div className={styles.stats}>
                <div className={styles.statCard}>
                    <StatCard title={"Staff"} value={24} />
                </div>
                <div className={styles.statCard}>
                    <StatCard title={"Open Issues"} value={2} />
                </div>
                <div className={styles.statCard}>
                    <StatCard title={"Low Stock items"} value={1} />
                </div>s
            </div>
            <MaintenanceTable isDashboard requests={requests}
                onSelectRequest={(request) => {
                    navigate('/maintenance',
                        {
                            state: { selectedRequest: request }
                        })
                }} />
        </div>

    )

}
export default DashboardPage;