import { createMaintenanceRequest } from "../services/maintenanceApi";
import axios from "axios";
import { useForm } from "react-hook-form";
import { createMaintenanceSchema } from "../schemas/maintenance.schema";
import type { CreateMaintenanceFormData } from "../schemas/maintenance.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

interface CreateMaintenanceFormProps {
    readonly onCreated: () => void;
}

function CreateMaintenanceForm({ onCreated }: CreateMaintenanceFormProps) {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CreateMaintenanceFormData>({
        resolver: zodResolver(createMaintenanceSchema),
        defaultValues: {
            title: "",
            status: "Open",
            priority: "Medium",
            description: "",
        }
    })
    const [apiError, setApiError] = useState("");

    const onSubmit = async (data: CreateMaintenanceFormData) => {
        try {
            setApiError("")
            await createMaintenanceRequest({
                ...data,
                status: "Open",
            })

            reset();
            onCreated()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Failed to create maintenance request:", error);
                setApiError(error.response?.data.message ?? "Something went wrong")
            } else {
                setApiError("Something went wrong")
            }
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Create Maintenance Request</h2>
            {apiError && <p>{apiError}</p>}
            <input
                type="text"
                placeholder="Title"
                {...register("title")}
            >
            </input>
            {errors.title && (
                <p>{errors.title.message}</p>
            )}
            <select {...register("priority")}
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            {errors.priority && (
                <p>{errors.priority.message}</p>
            )}
            <select  {...register("status")}
            >
                <option value="Open">Open</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            {errors.status && (
                <p>{errors.status.message}</p>
            )}
            <textarea {...register("description")}
                placeholder="Description"
            />
            {errors.description && (
                <p>{errors.description.message}</p>
            )}
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? `Creating...` : 'Create Request'}</button>
        </form>
    )
}

export default CreateMaintenanceForm;