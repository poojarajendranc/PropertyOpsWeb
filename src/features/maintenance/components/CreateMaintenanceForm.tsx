import { useState } from "react";
import type { MaintenanceStatus, PriorityStatus } from "../types/maintenance";
import { createMaintenanceRequest } from "../services/maintenanceApi";

interface CreateMaintenanceFormProps {
    readonly onCreated: () => void;
}

function CreateMaintenanceForm({ onCreated }: CreateMaintenanceFormProps) {
    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState<PriorityStatus>()
    const [status, setStatus] = useState<MaintenanceStatus>()
    const [description, setDescription] = useState<string>('')
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await createMaintenanceRequest({ title, priority: "Low", status: "Open", description })

            setTitle("");
            setStatus("Open");
            setPriority("Low");
            setDescription("");
            onCreated()
        } catch (error) {
            console.error("Failed to create maintenance request:", error);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Maintenance Request</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}>
            </input>
            <select value={priority}
             onChange={(event) => setPriority(event.target.value as PriorityStatus)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <select value={status}
            onChange={(event) => setStatus(event.target.value as MaintenanceStatus)}>
                <option value="Open">Open</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <textarea
                placeholder="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />
            <button type="submit">Create Request</button>
        </form>
    )
}

export default CreateMaintenanceForm;