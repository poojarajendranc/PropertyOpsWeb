import styles from './StatCard.module.css';
interface StatCardProps {
    title:string;
    value:number;
}

function StatCard({title,value} : StatCardProps) {
    return (
        <div className={styles.card}>
            <p className={styles.title}>{title}</p>
            <h3 className={styles.value}>{value}</h3>
        </div>
    )
}

export default StatCard;