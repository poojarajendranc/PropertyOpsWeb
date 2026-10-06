import { createMaintenanceRequest } from "../services/maintenanceApi";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { createMaintenanceSchema } from "../schemas/maintenance.schema";
import type { CreateMaintenanceFormData } from "../schemas/maintenance.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import styles from '../styles/CreateMaintenanceForm.module.css'
import CustomLabel from "../../../components/CustomLabel";
import CustomInput from "../../../components/CustomInput";
import CustomDropdown from "../../../components/CustomDropdown";
import { control } from "leaflet";
import { fields } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";

interface CreateMaintenanceFormProps {
    readonly onCreated: () => void;
}

const priorityOptions = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
];

function CreateMaintenanceForm({ onCreated }: CreateMaintenanceFormProps) {
    const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CreateMaintenanceFormData>({
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
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {apiError && <div className={styles.apiError}>{apiError}</div>}
            <div className={styles.formGroup}>

                <CustomLabel label="Title" />
                <CustomInput
                    type="text"
                    placeholder="Title"
                    {...register("title")}
                >
                </CustomInput>
                {errors.title && (
                    <p>{errors.title.message}</p>
                )}
            </div>
            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <CustomLabel label="Priority" />
                    <Controller
                        name="priority"
                        control={control}
                        render={({ field, fieldState }) => (
                            <CustomDropdown
                                options={priorityOptions}
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error?.message}
                            />

                        )}
                    />

                    {/* <select {...register("priority")}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select> */}
                    {errors.priority && (
                        <p className={styles.error}>{errors.priority.message}</p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <CustomLabel label="Status" />
                    {/* <label htmlFor="status">Status</label> */}
                    <Controller
                        name={"status"}
                        control={control}
                        render={({ field, fieldState }) => (
                            <CustomDropdown
                                options={[]}
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState?.error?.message}
                            />
                        )}
                    />
                    {/* <select  {...register("status")}
                    >
                        <option value="Open">Open</option>
                        <option value="Assigned">Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select> */}
                    {errors.status && (
                        <p>{errors.status.message}</p>
                    )}
                </div>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>

                <textarea {...register("description")}
                    placeholder="Description"
                />
                {errors.description && (
                    <p>{errors.description.message}</p>
                )}
            </div>
            <button className={styles.submitButton} type="submit" disabled={isSubmitting}>{isSubmitting ? `Creating...` : 'Create Request'}</button>

        </form>
    )
}

export default CreateMaintenanceForm;