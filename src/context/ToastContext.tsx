import {
    createContext,
    useCallback,
    useState,
    type ReactNode,
} from "react";
import AppToast from "../components/AppToast";
import { Outlet } from "react-router-dom";

export type ToastType = "success" | "error";

interface ToastContextValue {
    showToast: (message: string, type: ToastType) => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(
    undefined
);

export function ToastProvider() {
    const [toast, setToast] = useState<{
        message: string;
        type: ToastType;
    } | null>(null);

    const showToast = useCallback(
        (message: string, type: ToastType) => {
            setToast({ message, type });

            setTimeout(() => {
                setToast(null);
            }, 3000);
        },
        [],
    );

    return (
        <ToastContext.Provider value={{ showToast }}>
            <Outlet />

            {toast && (
                <AppToast message={toast.message} type={toast.type} />
            )}
        </ToastContext.Provider>
    );
}