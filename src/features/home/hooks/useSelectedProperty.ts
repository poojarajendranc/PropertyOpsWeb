import { useContext } from "react";
import { PropertyContext } from "../../../services/PropertyProvider";

export function useSelectedProperty() {
    const context = useContext(PropertyContext);
    if (!context) {
        throw new Error("useSelectedProperty must be used within PropertyProvider")
    }
    return context;
}