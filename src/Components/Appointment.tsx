import styles from './Appointment.module.scss'

const Appointment = () => {
    const clickHandler = (e: React.MouseEvent) => {
        console.log("Appointment clicked!")
        e.stopPropagation()    
    }

    return <div onClick={clickHandler} className={styles.appointment}>Meeting</div>
}

export default Appointment