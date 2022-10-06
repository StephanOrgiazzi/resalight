import Hour from './Hour'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import useHttp from './Hooks/use-http'
import { useAppDispatch, useAppSelector } from './Hooks/use-reduxhooks'

import styles from './Day.module.scss'
import { appointmentsActions } from '../store'

const Day: React.FC = () => {
    const workingHours = ['9', '10', '11', '12', '13', '14', '15', '16', '17']

    const dispatch = useAppDispatch()

    const { isLoading, error, sendRequest: fetchAppointments } = useHttp()

    const appointmentState = useAppSelector((state) => state.appointments)

    useEffect(() => {
        const setData = (appointments: any) => {
            dispatch(appointmentsActions.setAppointments(appointments))
        }

        fetchAppointments(
            {
                url: 'https://resalight-default-rtdb.europe-west1.firebasedatabase.app/appointments.json',
            },
            setData
        )
    }, [fetchAppointments])

    const date = dayjs().format('MMMM D, YYYY')

    return (
        <ul className={styles.day}>
            <li>
                <time>{date}</time>
            </li>
            {workingHours.map((hour) => {
                const data = appointmentState.find(
                    ({ selectedHour }) => selectedHour === hour
                )
                return <Hour key={hour} value={hour} data={data} />
            })}
        </ul>
    )
}

export default Day
