import { useAppDispatch } from './Hooks/use-reduxhooks'
import { appointmentsActions } from '../store'
import { AppointementType } from '../types'
import Appointment from './Appointment'

import styles from './Hour.module.scss'

const Hour: React.FC<{
    value: string
    data?: AppointementType[]
}> = (props) => {
    const dispatch = useAppDispatch()
    const handleClick = (value: string) => {
        dispatch(appointmentsActions.selectHour(value))
        dispatch(appointmentsActions.toggleMakeAppointment(''))
    }

    return (
        <li>
            <div
                onClick={() => handleClick(props.value)}
                className={styles.hour}
            >
                <div className={styles.value}>{props.value}:00</div>

                {props.data &&
                    props.data.map((appointment) => {
                        return (
                            <Appointment
                                data={appointment}
                                key={appointment.id}
                            />
                        )
                    })}
            </div>
        </li>
    )
}

export default Hour
