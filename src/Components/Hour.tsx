import { useAppDispatch } from '../hooks'
import { appointmentsActions } from '../store'
import { AppointementType } from '../types';
import Appointment from './Appointment';

import styles from './Hour.module.scss'

const Hour: React.FC<{ value: number; appointment: boolean, data?: AppointementType | any }> = (props) => {
    const dispatch = useAppDispatch()

    const handleClick = (value: number) => {
        dispatch(appointmentsActions.toggleMakeAppointment())
        dispatch(appointmentsActions.selectHour(value))
    }

    return (
        <li>
            <div
                onClick={() => handleClick(props.value)}
                className={styles.hour}
            >
                <div className={styles.value}>{props.value}:00</div>
                {props.appointment && (
                    <Appointment />
                )}
            </div>
        </li>
    )
}

export default Hour
