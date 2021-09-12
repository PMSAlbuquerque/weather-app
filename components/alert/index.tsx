import styles from "../../styles/Alert.module.css";

const Alert = ({error}: { error: string }) => {
    if(!error) return null;

    return(
        <div className={styles.ErrorAlert}>{error}</div>
    )
};

export default Alert;
