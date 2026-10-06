import { Controller, useForm } from 'react-hook-form';
import axios from "axios";
import styles from '../styles/AddPropertyForm.module.css'
import { createPropertySchema, type AddPropertyFormData } from '../properties.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomLocation from '../../../components/CustomLocation';
import { useState } from 'react';
import type { LocationValue } from '../../../components/types';
import { STRINGS } from '../../../utils/strings';
import CustomLabel from '../../../components/CustomLabel';
import { createPropertyRequest } from '../services/propertiesApi';
import CustomPhoneInput from '../../../components/CustomPhoneInput';

interface AddPropertyFormProps {
    readonly onCreated: () => void;
}

const AddPropertyForm = ({ onCreated }: AddPropertyFormProps) => {
    const [apiError, setApiError] = useState("");
    const { register, control, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<AddPropertyFormData>({
        resolver: zodResolver(createPropertySchema),
        defaultValues: {
            name: "",
            location: "",
            latitude: "",
            longitude: "",
            contact_number: ""
        }
    })

    const onSubmit = async (data: AddPropertyFormData) => {
        try {
            setApiError("")
            console.log("Data:", data)
            await createPropertyRequest(data)

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
                    <div className={styles.locationInput}>
                        <div className={styles.locationInputText}>
                            <input type="text"
                                placeholder='Location'
                                {...register("location")}>
                            </input>
                        </div>
                        <div className={styles.locationMarker}>
                            <CustomLocation
                                value={location}
                                onChange={(value) => {
                                    setLocation(value)
                                    if (value) {
                                        setValue("location", value.address);
                                        setValue("latitude", String(value.latitude));
                                        setValue("longitude", String(value.longitude))
                                    }
                                }}
                                placeholder="Select property location"
                            />
                        </div>
                    </div>
                    {errors.location && (
                        <p>{errors.location.message}</p>
                    )}
                </div>
            </div>
            <div >
                <CustomLabel label="Contact Number" />
                <Controller
                    name="contact_number"
                    control={control}
                    render={({ field, fieldState }) => (
                        <CustomPhoneInput
                            value={field.value}
                            onChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />
            </div>
            <div className={styles.formRow}>
                {/* <div className={styles.formGroup}>
                    <CustomLabel label='Country code'></CustomLabel>
                    <input type="text"
                        placeholder='Country code'
                        {...register("country_code")}>
                    </input>
                    {errors.country_code && (
                        <p>{errors.country_code.message}</p>
                    )}

                </div>
                <div className={styles.formGroup}>
                    <CustomLabel label='Contact Number'></CustomLabel>
                    <input type="text"
                        placeholder='Contact Number'
                        {...register("contact_number")}>
                    </input>
                    {errors.contact_number && (
                        <p>{errors.contact_number.message}</p>
                    )}

                </div> */}
                <button className={styles.submitButton}
                    type="submit" disabled={isSubmitting}>
                    {isSubmitting ? STRINGS.SUBMITTING : STRINGS.SAVE}
                </button>

            </div>

        </form>
    )
}

export default AddPropertyForm;