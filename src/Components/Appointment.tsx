import { useAppDispatch } from '../hooks'
import { appointmentsActions } from '../store'
import styles from './Appointment.module.scss'

const Appointment = (props: any) => {
    const dispatch = useAppDispatch()

    const clickHandler = (e: React.MouseEvent) => {
        dispatch(appointmentsActions.selectHour(props.data.selectedHour))
        dispatch(appointmentsActions.toggleMakeAppointment(props.data.id))
        e.stopPropagation()
    }

    let customStyles = ""

    switch (props.data.duration) {
        case '30':
            customStyles = styles['appointment-half']
            break
        case '45':
            customStyles = styles['appointment-three']
            break
        case '60':
            customStyles = styles['appointment-full']
            break
        default:
            customStyles = ''
    }

    return (
        <div
            onClick={clickHandler}
            className={`${styles.appointment} ${customStyles}`}
        >
            <div>
                {props.data.selectedHour}:{props.data.quarter} (
                {props.data.duration}
                min) - Meeting {props.data.vendorName} - {props.data.buyerName}{' '}
                ({props.data.companyName})
            </div>
        </div>
    )
}

export default Appointment
