import PhoneInput from "react-phone-number-input";
import type { E164Number } from "libphonenumber-js";
import "react-phone-number-input/style.css";
import styles from "./styles/CustomPhoneInput.module.css";

interface CustomPhoneInputProps {
    readonly value?: E164Number;
    readonly onChange: (value?: E164Number) => void;
    readonly error?: string;
    readonly placeholder?: string;
}

function CustomPhoneInput({
    value,
    onChange,
    error,
    placeholder = "Enter phone number",
}: CustomPhoneInputProps) {
    return (
        <div className={styles.container}>
            <PhoneInput
                international
                defaultCountry="IN"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={error ? styles.inputError : ""}
            />

            {error && (
                <span className={styles.error}>
                    {error}
                </span>
            )}
        </div>
    );
}

export default CustomPhoneInput;