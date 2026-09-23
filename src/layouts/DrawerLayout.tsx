import { COMMON_LABELS } from "../constants/common/label";
import { HOME_LABELS } from "../features/home/label";
import styles from './DrawerLayout.module.css';
import { removeToken } from "../services/authStorage";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    LayoutDashboard,
    Building2,
    Users,
    Wrench,
    Package,
    CalendarDays,
    LogOut,
    Menu,
} from "lucide-react";

function DrawerLayout() {
    const navigate = useNavigate()
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const handleLogout = () => {
        removeToken();
        navigate('/login', { replace: true })
    }

    return (
        <div className={styles.container}>
            <div className={styles.headers}>
                <button
                    className={styles.menuButton}
                    onClick={() => setIsDrawerOpen((previous) => !previous)}
                    aria-label="Toggle navigation"
                >
                    <Menu size={22} />
                </button>
                <p>{HOME_LABELS.TITLE}</p>
                <p></p>
            </div>
            <div className={styles.body}>
                <aside className={`${styles.leftDrawer} ${isDrawerOpen ? styles.drawerOpen : styles.drawerClosed
                    }`}>
                    <nav className={styles.drawerNav}>
                        <NavLink to="/dashboard"
                            className={({ isActive }) => `${styles.drawerItem}
                            ${isActive ? styles.drawerItemActive : ""}`}>
                            <LayoutDashboard size={19} />
                            <span className={styles.drawerTitle}>{COMMON_LABELS.DASHBOARD}</span>
                        </NavLink>
                        <NavLink to="/properties"
                            className={({ isActive }) => `${styles.drawerItem}
                            ${isActive ? styles.drawerItemActive : ""}`}>
                            <Building2 size={19} />
                            <span className={styles.drawerTitle}>{COMMON_LABELS.PROPERTIES}</span>
                        </NavLink>
                        <NavLink to="/staff"
                            className={({ isActive }) => `${styles.drawerItem}
                            ${isActive ? styles.drawerItemActive : ""}`}>
                            <Users size={19} />
                            <span className={styles.drawerTitle}>{COMMON_LABELS.STAFF}</span>
                        </NavLink>
                        <NavLink to="/maintenance"
                            className={({ isActive }) => `${styles.drawerItem}
                            ${isActive ? styles.drawerItemActive : ""}`}>
                            <Wrench size={19} />
                            <span className={styles.drawerTitle}>{COMMON_LABELS.MAINTENANCE}</span>
                        </NavLink>
                        <NavLink to="/inventory"
                            className={({ isActive }) => `${styles.drawerItem}
                            ${isActive ? styles.drawerItemActive : ""}`}>
                            <Package size={19} />
                            <span className={styles.drawerTitle}>{COMMON_LABELS.INVENTORY}</span>
                        </NavLink>
                        <NavLink to="/bookings"
                            className={({ isActive }) => `${styles.drawerItem}
                            ${isActive ? styles.drawerItemActive : ""}`}>
                            <CalendarDays size={19} />
                            <span className={styles.drawerTitle}>{COMMON_LABELS.BOOKINGS}</span>
                        </NavLink>

                    </nav>
                    <button className={styles.logoutButton}
                        onClick={handleLogout}
                        aria-label="Logout">
                        <LogOut size={19} />
                        <span>Logout</span>
                    </button>
                </aside>
                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>
        </div>
    )

}
export default DrawerLayout;