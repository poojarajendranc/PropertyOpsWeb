import type { MaintenanceStatus } from '../features/maintenance/types/maintenance';
import styles from './StatusBadge.module.css';
interface StatusProps {
    status: MaintenanceStatus
}
function StatusBadge({ status }: StatusProps) {
    let statusClass = styles.badge;
    switch (status) {
        case 'Open': {
            statusClass = `${styles.badge} ${styles.open}`;
            break;
        }
        case 'Assigned': {
            statusClass = `${styles.badge} ${styles.assigned}`;
            break;
        }
        case 'In Progress': {
            statusClass = `${styles.badge} ${styles.inProgress}`;
            break;
        }
        case 'Completed':
            {
                statusClass = `${styles.badge} ${styles.completed}`;
                break;
            }

    }
    return (
    <p className={statusClass}>
        Status:{status.toUpperCase()}
    </p>)
}

export default StatusBadge;