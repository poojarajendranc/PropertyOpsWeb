import StatCard from "../components/StatCard";
import DrawerLayout from "../layouts/DrawerLayout";
import styles from './styles/DashboardPage.module.css';

function DashboardPage() {
    return (            
            <div className={styles.page}>
                <div className={styles.stats}>
                    <div className={styles.statCard}>
                        <StatCard title={"Staff"} value={24} />
                    </div>
                    <div className={styles.statCard}>
                        <StatCard title={"Open Issues"} value={2} />
                    </div>
                    <div className={styles.statCard}>
                        <StatCard title={"Low Stock items"} value={1} />
                    </div>
                </div>
                {/* <MainteanceTable onSelectRequest={() => {}} /> */}
            </div>

    )

}
export default DashboardPage;