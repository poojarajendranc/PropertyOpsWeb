import styles from "./styles/CustomLabel.module.css";
 
interface CustomLabelProps {
    label: string;
    color?: string;
    size?: string;
    fontWeight?: number | string;
    htmlFor?: string;
}
 
function CustomLabel({
    label,
    color,
    size,
    fontWeight,
    htmlFor,
}: CustomLabelProps) {
    return (
<label
            htmlFor={htmlFor}
            className={styles.label}
            style={{
                color,
                fontSize: size,
                fontWeight,
            }}
>
            {label}
</label>
    );
}
 
export default CustomLabel;