import './AppToast.css'
interface ToastProps {
    readonly message: string;
    readonly type: "success" | "error";
}
function AppToast({ message, type }: ToastProps) {
    if (!message) {
        return null;
    }
    return (
        <div className={`toast ${type}`}>
            {message}
        </div>
    );
}
export default AppToast;
 