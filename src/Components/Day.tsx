import Hour from './Hour'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import useHttp from './Hooks/use-http'
import { useAppDispatch, useAppSelector } from './Hooks/use-reduxhooks'
import { appointmentsActions } from '../store'

import styles from './Day.module.scss'
import { AppointementType } from '../types'

const Day: React.FC = () => {
    const workingHours = ['9', '10', '11', '12', '13', '14', '15', '16', '17']

    const dispatch = useAppDispatch()

    const { isLoading, error, sendRequest: fetchAppointments } = useHttp()

    const appointmentState = useAppSelector((state) => state.appointments)

    useEffect(() => {
        const setData = (appointments: AppointementType) => {
            dispatch(appointmentsActions.setAppointments(appointments))
        }

        fetchAppointments(
            {
                url: 'https://resalight-default-rtdb.europe-west1.firebasedatabase.app/appointments.json',
            },
            setData
        )
    }, [fetchAppointments, dispatch])

    const date = dayjs().format('MMMM D, YYYY')

    return (
        <>
            {!isLoading && !error && (
                <ul className={styles.day}>
                    <li>
                        <time>{date}</time>
                    </li>
                    {workingHours.map((hour) => {
                        const data = appointmentState.filter(
                            ({ selectedHour }) => selectedHour === hour
                        )
                        let hourEl
                        if (data && data.length > 0) {
                            hourEl = <Hour key={hour} value={hour} data={data} />
                        } else {
                            hourEl = <Hour key={hour} value={hour} />
                        }
                        return hourEl
                    })}
                </ul>
            )}
            {isLoading && <p>Loading...</p>}
            {error && <p>Error, please try again later.</p>}
        </>
    )
}

export default Day
