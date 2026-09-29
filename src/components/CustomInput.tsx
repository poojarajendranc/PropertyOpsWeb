import type { InputHTMLAttributes } from "react";
import styles from "./styles/CustomInput.module.css";
 
interface CustomInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}
 
function CustomInput({
    error,
    className = "",
    ...props
}: CustomInputProps) {
    return (
<div className={styles.container}>
<input
                {...props}
                className={`${styles.input} ${className}`}
            />
 
            {error && (
<span className={styles.error}>
                    {error}
</span>
            )}
</div>
    );
}
 
export default CustomInput;