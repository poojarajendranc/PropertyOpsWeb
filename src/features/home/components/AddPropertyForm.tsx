import { useForm } from 'react-hook-form';
import axios from "axios";
import styles from '../styles/AddPropertyForm.module.css'
import { createPropertySchema, type AddPropertyFormData } from '../properties.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomLocation from '../../../components/CustomLocation';
import { useState } from 'react';
import type { LocationValue } from '../../../components/types';
import { STRINGS } from '../../../utils/strings';
import CustomLabel from '../../../components/CustomLabel';

interface AddPropertyFormProps {
    readonly onCreated: () => void;
}

const AddPropertyForm = ({ onCreated }: AddPropertyFormProps) => {
    const [apiError, setApiError] = useState("");
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<AddPropertyFormData>({
        resolver: zodResolver(createPropertySchema),
        defaultValues: {
            name: "",
            location: "",
            latitude: "",
            longitude: "",
            countryCode: "",
            contactNumber: ""
        }
    })

    const onSubmit = async (data: AddPropertyFormData) => {
        try {
            setApiError("")
            // await createProper({
            //     ...data,
            //     status: "Open",
            // })

            reset();
            onCreated()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Failed to create property:", error);
                setApiError(error.response?.data.message ?? "Something went wrong")
            } else {
                setApiError("Something went wrong")
            }
        }
    }

    const [location, setLocation] =
        useState<LocationValue | null>(null);

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
                <CustomLabel label='Full Name'></CustomLabel>
                <input type="text"
                    placeholder='Full Name'
                    {...register("name")}>
                </input>
                {errors.name && (
                    <p>{errors.name.message}</p>
                )}

            </div>
            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <CustomLabel label='Location'></CustomLabel>
                    <input type="text"
                        placeholder='Location'
                        {...register("location")}>
                    </input>
                    <CustomLocation
                        value={location}
                        onChange={setLocation}
                        placeholder="Select property location"
                    />
                    {errors.location && (
                        <p>{errors.location.message}</p>
                    )}
                </div>
            </div>
            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <CustomLabel label='Country code'></CustomLabel>
                    <input type="text"
                        placeholder='Country code'
                        {...register("countryCode")}>
                    </input>
                    {errors.countryCode && (
                        <p>{errors.countryCode.message}</p>
                    )}

                </div>
                <div className={styles.formGroup}>
                    <CustomLabel label='Contact Number'></CustomLabel>
                    <input type="text"
                        placeholder='Contact Number'
                        {...register("contactNumber")}>
                    </input>
                    {errors.contactNumber && (
                        <p>{errors.contactNumber.message}</p>
                    )}

                </div>
                <button className={styles.submitButton}
                    type="submit" disabled={isSubmitting}>
                    {isSubmitting ? STRINGS.SUBMITTING : STRINGS.SAVE}
                </button>

            </div>

        </form>
    )
}

export default AddPropertyForm;