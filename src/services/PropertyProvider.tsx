import { createContext, useState, } from "react";
import { Outlet } from "react-router-dom";

interface PropertyContextValue {
    selectedPropertyId: number | null;
    setSelectedPropertyId: (propertyId: number | null) => void
}
export const PropertyContext = createContext<PropertyContextValue | undefined>(undefined)

export function PropertyProvider() {
    const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);

    return (
        <PropertyContext.Provider
            value={{
                selectedPropertyId,
                setSelectedPropertyId
            }}>
            <Outlet />
        </PropertyContext.Provider>
    )
}