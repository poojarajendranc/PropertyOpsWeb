import { useState, type ReactNode } from "react";
import { COMMON_LABELS } from "../constants/common/label";
import { HOME_LABELS } from "../features/home/label";
import styles from './DashboardLayout.module.css';
import { removeToken } from "../services/authStorage";
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
    readonly children: ReactNode;
}
function DashboardLayout({ children }: Readonly<DashboardLayoutProps>) {
    const navigate = useNavigate()
    const [currentTab, setCurrentTab] = useState(COMMON_LABELS.DASHBOARD)

    const handleTabPress = (selectedTab: string) => {
        setCurrentTab(selectedTab)
    }

    const handleLogout = () => {
        removeToken();
        navigate('/login',{replace:true})

    }

    return (
        <div className={styles.container}>
            <div className={styles.headers}>
                <p>{HOME_LABELS.TITLE}</p>
                <button onClick={handleLogout}>{HOME_LABELS.USER_LOGOUT}</button>
            </div>
            <div className={styles.body}>
                <aside className={styles.leftDrawer}>
                    <nav>
                        <button onClick={() => handleTabPress(COMMON_LABELS.DASHBOARD)} className={styles.drawerItem}>{COMMON_LABELS.DASHBOARD}</button>
                        <button onClick={() => handleTabPress(COMMON_LABELS.PROPERTIES)} className={styles.drawerItem}>{COMMON_LABELS.PROPERTIES}</button>
                        <button onClick={() => handleTabPress(COMMON_LABELS.STAFF)} className={styles.drawerItem}>{COMMON_LABELS.STAFF}</button>
                        <button onClick={() => handleTabPress(COMMON_LABELS.MAINTENANCE)} className={styles.drawerItem}>{COMMON_LABELS.MAINTENANCE}</button>
                        <button onClick={() => handleTabPress(COMMON_LABELS.INVENTORY)} className={styles.drawerItem}>{COMMON_LABELS.INVENTORY}</button>
                        <button onClick={() => handleTabPress(COMMON_LABELS.BOOKINGS)} className={styles.drawerItem}>{COMMON_LABELS.BOOKINGS}</button>
                    </nav>
                </aside>
                <main className={styles.main}>
                    <h2>Selected Tab : {currentTab}</h2>
                    {children}</main>
            </div>


        </div>
    )

}
export default DashboardLayout;