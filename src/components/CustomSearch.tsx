import { Search, X } from "lucide-react";
import styles from "./styles/CustomSearch.module.css";
 
interface CustomSearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    onClear?: () => void;
}
 
function CustomSearch({
    value,
    onChange,
    placeholder = "Search...",
    onClear,
}: CustomSearchProps) {
    return (
<div className={styles.container}>
<Search
                size={18}
                className={styles.searchIcon}
            />
 
            <input
                type="search"
                value={value}
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)}
                className={styles.input}
            />
 
            {value && onClear && (
<button
                    type="button"
                    className={styles.clearButton}
                    onClick={onClear}
                    aria-label="Clear search"
>
<X size={16} />
</button>
            )}
</div>
    );
}
 
export default CustomSearch;