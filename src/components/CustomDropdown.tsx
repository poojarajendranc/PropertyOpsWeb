import styles from "./styles/CustomDropdown.module.css";
 
export interface DropdownOption {
    label: string;
    value: string;
}
 
interface CustomDropdownProps {
    options: DropdownOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
}
 
function CustomDropdown({
    options,
    value,
    onChange,
    placeholder = "Select",
    disabled = false,
    error,
}: CustomDropdownProps) {
    return (
<div className={styles.container}>
<select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                disabled={disabled}
                className={styles.select}
>
<option value="" disabled>
                    {placeholder}
</option>
 
                {options.map((option) => (
<option
                        key={option.value}
                        value={option.value}
>
                        {option.label}
</option>
                ))}
</select>
 
            {error && (
<span className={styles.error}>
                    {error}
</span>
            )}
</div>
    );
}
 
export default CustomDropdown;