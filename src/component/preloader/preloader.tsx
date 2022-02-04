
import styles from "./preloader.module.scss";

const Preloader = () => {
    return (
        <div className={styles.backdrop}>
            <div className={styles.loader}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
            </div>
        </div>
    );
};
export default Preloader;