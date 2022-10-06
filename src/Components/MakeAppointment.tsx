import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { appointmentsActions } from '../store'
import dayjs from 'dayjs'
import Modal from './UI/Modal'

import styles from './MakeAppointments.module.scss'
import { AppointementType } from '../types'

const MakeAppointment: React.FC = ({ id }: { id?: string }) => {
    const dispatch = useAppDispatch()
    const appointementFromStore = useAppSelector((state) =>
        state.appointments.find(({ id: idFromStore }) => id === idFromStore)
    )

    const [appointment, setAppointment] = useState<AppointementType>(
        /* appointementFromStore ?? { */
        {
            id: '',
            vendorName: '',
            buyerName: '',
            companyName: '',
            selectedHour: '',
            quarter: '',
            duration: '',
        }
    )

    const selectedHour = useAppSelector((state) => state.selectedHour)

    const cancelHandler = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(appointmentsActions.toggleMakeAppointment())
    }

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        const id = dayjs().format('MMDDHHmmss').toString()
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            id: id,
        }))
        dispatch(appointmentsActions.addAppointment(appointment))
        dispatch(appointmentsActions.toggleMakeAppointment())
        console.log({ appointment })
    }

    const selectQuarterHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            quarter: e.target.value,
        }))
    }

    const selectDurationHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            duration: e.target.value,
        }))
    }

    return (
        <Modal>
            <div className={styles.modal}>
                <h2>Appointment</h2>
                <form className={styles.form} onSubmit={submitHandler}>
                    <div className={styles.time}>
                        <label htmlFor='starts'>Starts at:</label>
                        <select
                            name='starts'
                            onChange={selectQuarterHandler}
                            required
                        >
{/*                             <option value=''>
                                --Please choose a starting time--
                            </option> */}
                            <option value='00'>{`${selectedHour}:00`}</option>
                            <option value='15'>{`${selectedHour}:15`}</option>
                            <option value='30'>{`${selectedHour}:30`}</option>
                            <option value='45'>{`${selectedHour}:45`}</option>
                        </select>

                        <label htmlFor='duration'>Duration:</label>
                        <select
                            name='duration'
                            onChange={selectDurationHandler}
                            required
                        >
                            <option value=''>
                                --Please choose a duration--
                            </option>
                            <option value='15'>15 minutes</option>
                            <option value='30'>30 minutes</option>
                            <option value='60'>1 hour</option>
                            <option value='120'>2 hours</option>
                        </select>
                    </div>
                    <div className={styles.vendor}>
                        <label htmlFor='vendorName'>Vendor name:</label>
                        <input
                            id='vendorName'
                            value={appointment.vendorName}
                            onChange={(e) =>
                                setAppointment((prevAppointment) => ({
                                    ...prevAppointment,
                                    vendorName: e.target.value,
                                }))
                            }
                            required
                        />
                    </div>
                    <div className={styles.buyer}>
                        <label htmlFor='buyerName'>Buyer name:</label>
                        <input
                            id='buyerName'
                            value={appointment.buyerName}
                            onChange={(e) =>
                                setAppointment((prevAppointment) => ({
                                    ...prevAppointment,
                                    buyerName: e.target.value,
                                }))
                            }
                            required
                        />
                        <label htmlFor='companyName'>
                            Buyer's company name:
                        </label>
                        <input
                            id='companyName'
                            value={appointment.companyName}
                            onChange={(e) =>
                                setAppointment((prevAppointment) => ({
                                    ...prevAppointment,
                                    companyName: e.target.value,
                                }))
                            }
                            required
                        />
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={cancelHandler}>
                            Remove appointment
                        </button>
                        <button>Confirm appointment</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default MakeAppointment