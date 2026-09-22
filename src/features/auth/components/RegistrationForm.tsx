import { useState } from "react";
import { registerUser } from "../../../services/authApi";
import { useForm } from "react-hook-form";
import { RegisterUserSchema } from "../../maintenance/schemas/auth.schema";
import type { RegisterUserFormData } from "../../maintenance/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import AppToast from "../../../components/AppToast";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
    readonly onCreated: () => void
}



function RegistrationForm() {
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<RegisterUserFormData>({
        resolver: zodResolver(RegisterUserSchema),
        defaultValues: {
            name: "",
            password: "",
            role: "Super Admin",
            email: ""
        }
    })
    const [apiError, setApiError] = useState("");

    const onSubmit = async (data: RegisterUserFormData) => {
        try {
            setApiError("")
            await registerUser({ ...data })
            reset();
            navigate("/login", {
                state: {
                    message: "User successfully registered. Please log in."
                }
            })

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Registration failed:", error);
                setApiError(error.response?.data.message ?? "Registration failed")
            } else {
                setApiError("SOmething went wrong")
            }

        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>User Registration</h1>
            {apiError && <AppToast type={"success"} message={apiError} />}
            <input type="email"
                placeholder="Email"
                {...register("email")}
            />
            {errors.email && (
                <p>{errors.email.message}</p>
            )}
            <input type="name"
                placeholder="Username"
                {...register("name")}
            />
            {errors.name && (
                <p>{errors.name.message}</p>
            )}
            <input type="password"
                placeholder="Password"
                {...register("password")}
            />
            {errors.password && (
                <p>{errors.password.message}</p>
            )}
            <select {...register("role")}>
                <option value={"Super Admin"}>Super Admin</option>
                <option value={"Admin"}>Admin</option>
                <option value={"Staffs"}>Staffs</option>

            </select>
            {errors.role && (
                <p>{errors.role.message}</p>
            )}
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? `Registering...` : 'Register User'}</button>
        </form>
    )
}

export default RegistrationForm;

