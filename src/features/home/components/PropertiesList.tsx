import { useEffect, useState } from "react";
import type { PropertyRequest } from "../types/properties";
import { BookImage, Edit } from "lucide-react"
import styles from "../styles/PropertiesList.module.css"
import { useSelectedProperty } from "../hooks/useSelectedProperty";

interface PropertiesListProps {
    readonly propertiesList: PropertyRequest[]
    handleEditProperty: (request:PropertyRequest) => void
}

function PropertiesList({ propertiesList,handleEditProperty }: PropertiesListProps) {
    const [properties, setProperties] = useState<PropertyRequest[]>([]);
    const { setSelectedPropertyId } = useSelectedProperty()

    useEffect(() => {
        console.log("MAin Prop list : ", propertiesList)
        if (propertiesList) {
            setProperties(propertiesList)
        }
    }, [propertiesList])

    const handlePropertySelection = (request: PropertyRequest) => {
        setSelectedPropertyId(request?.id ?? 0)
        setProperties((currentProperties) =>
            currentProperties.map((property) => ({
                ...property,
                isSelected: property.id === request.id
            })))
    }


    return (
        <div>
            <h2 className={styles.headerTextStyle}>Properties</h2>
            <div className={styles.baseContainer}>
                {properties.map((request) => (
                    <div className={request.isSelected ? styles.itemCardSelected : styles.itemCard} key={request.id}
                        onClick={() => { handlePropertySelection(request) }}>
                        <div className={styles.iconsHolder}>
                            <BookImage className={styles.iconsHolder}
                                onClick={() => handlePropertySelection(request)} />
                            <Edit onClick={() => handleEditProperty(request)} />
                        </div>
                        <p className={styles.cardHeaderTextStyle}>{request.name}</p>



                    </div>
                ))}
            </div>
        </div>
    )
}

export default PropertiesList;