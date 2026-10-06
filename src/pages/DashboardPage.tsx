import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import MaintenanceTable from "../features/maintenance/components/MaintenanceTable";
import styles from './styles/DashboardPage.module.css';
import AppModal from "../components/AppModal";
import { useState } from "react";
import AddPropertyForm from "../features/home/components/AddPropertyForm";
import PropertiesList from "../features/home/components/PropertiesList";
import { useProperty } from "../features/home/hooks/useProperty";
import { useToast } from "../hooks/useToast";

function DashboardPage() {
    const navigate = useNavigate();
    const {showToast} = useToast()
    const { propertiesList, isLoading, reload } = useProperty();
    console.log("MAin dashboard Prop  list : ", propertiesList)

    const [isAddPropModalOpen, setAddPropModalOpen] = useState(false)
    const handleEditProperty = () => {
        
    }

    return (
        <div className={styles.page}>
            <div>
                <button onClick={() => setAddPropModalOpen(true)} className={styles.addPropertyButton}>
                    Add Property
                </button></div>
            <div className={styles.stats}>
                <div className={styles.statCard}>
                    <StatCard title={"Staff"} value={24} />
                </div>
                <div className={styles.statCard}>
                    <StatCard title={"Open Issues"} value={2} />
                </div>
                <div className={styles.statCard}>
                    <StatCard title={"Low Stock items"} value={1} />
                </div>s
            </div>
            <PropertiesList
                propertiesList={propertiesList} 
                handleEditProperty={handleEditProperty}/>

            <AppModal
                isOpen={isAddPropModalOpen}
                onClose={() => setAddPropModalOpen(false)}
                title="Create Maintenance"
            >
                <AddPropertyForm onCreated={ async() => {
                    await reload();
                    setAddPropModalOpen(false)
                    showToast("Added successfully","success")

                }} />
            </AppModal >
        </div>

    )

}
export default DashboardPage;