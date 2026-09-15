interface MaintenanceDetailsProps {
    readonly id: number;
    readonly title: string;
    readonly priority: string;
    readonly status: string;
}

function MaintenanceDetails({ id, title, priority, status }: MaintenanceDetailsProps) {
    return (
        <div>
            <h2>Maintenance Details</h2>
            <p>ID: {id}</p>
            <p>Title: {title}</p>
            <p>Priority: {priority}</p>
            <p>Status: {status}</p>
        </div>
    )
}

export default MaintenanceDetails;