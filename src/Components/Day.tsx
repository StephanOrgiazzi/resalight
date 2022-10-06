import Hour from './Hour'
import dayjs from 'dayjs'
import { useAppSelector } from '../hooks'

import styles from './Day.module.scss'

const Day: React.FC = () => {
    const workingHours = [9, 10, 11, 12, 13, 14, 15, 16, 17]
    const appointmentState = useAppSelector((state) => state.appointments)

    const appointmentsOfTheDay = appointmentState.filter((appointment) =>
        workingHours.includes(appointment.selectedHour)
    )

    console.log(appointmentsOfTheDay)

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

                return (
                    <Hour
                        key={hour}
                        value={hour}
                        appointment={!!data}
                        data={data}
                    />
                )
            })}

            {/*             {workingHours.map((hour) => {
                const data = appointmentState.filter(({selectedHour}) => selectedHour === hour)

                return <Hour key={hour} value={hour} appointment={!!data} data={data}>
                    {data.map(appointement) => <Appointment/>}
                </Hour>
            })}
        </ul> */}
        </ul>
    )
}

export default Day

/*     const elements = () => {
        workingHours.map((hour) => {
            appointmentsOfTheDay.map((appointment) => {
                if (hour == appointment.selectedHour) {
                    return (
                        <Hour key={hour} value={hour} appointment={true} />
                    )
                } else {
                    return (
                        <Hour key={hour} value={hour} appointment={false} />
                    )
                }
            })
        })
    } */
