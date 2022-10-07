import { useAppDispatch } from './Hooks/use-reduxhooks'
import { appointmentsActions } from '../store'
import { AppointementType } from '../types'

import styles from './Appointment.module.scss'

const Appointment: React.FC<{
    data: AppointementType
}> = ({ data }) => {
    const dispatch = useAppDispatch()

    const clickHandler = (e: React.MouseEvent) => {
        dispatch(appointmentsActions.selectHour(data.selectedHour))
        dispatch(appointmentsActions.toggleMakeAppointment(data.id))
        e.stopPropagation()
    }

    let customDurationStyles

    switch (data.duration) {
        case '30':
            customDurationStyles = styles['appointment-half']
            break
        case '45':
            customDurationStyles = styles['appointment-three']
            break
        case '60':
            customDurationStyles = styles['appointment-full']
            break
        default:
            customDurationStyles = ''
    }

    let customQuarterStyles

    switch (data.quarter) {
        case '15':
            customQuarterStyles = styles['appointment-start15']
            break
        case '30':
            customQuarterStyles = styles['appointment-start30']
            break
        case '45':
            customQuarterStyles = styles['appointment-start45']
            break
        default:
            customQuarterStyles = ''
    }

    return (
        <div
            onClick={clickHandler}
            className={`${styles.appointment} ${customDurationStyles} ${customQuarterStyles}`}
        >
            <div>
                {data.selectedHour}:{data.quarter} ({data.duration}
                min) Meeting {data.vendorName} - {data.buyerName} (
                {data.companyName})
            </div>
        </div>
    )
}

export default Appointment
