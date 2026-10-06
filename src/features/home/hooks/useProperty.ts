import { useEffect, useState } from "react";
import type { PropertyRequest } from "../types/properties";
import { getPropertiesListData } from "../services/propertiesApi";


export function useProperty() {
    const [propertiesList, setPropertiesList] = useState<PropertyRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const loadPropertyList = async () => {
        try {
            setIsLoading(true);
            setError("");

            const data = await getPropertiesListData();
            console.log("data : ",data)
            setPropertiesList(data);
        } catch (error) {
            console.error("Failed to load properties:", error);
            setError("Failed to load properties list");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadPropertyList();
    }, []);

    return {
        propertiesList,
        isLoading,
        error,
        reload: loadPropertyList,
    };
}