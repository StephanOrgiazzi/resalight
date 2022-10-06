import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { appointmentsActions } from '../store'
import dayjs from 'dayjs'
import Modal from './UI/Modal'

import styles from './MakeAppointments.module.scss'
import { AppointementType } from '../types'

const MakeAppointment: React.FC = () => {
    const dispatch = useAppDispatch()

    const currentAppointmentId = useAppSelector(
        (state) => state.currentAppointmentId
    )

    const appointments = useAppSelector((state) => state.appointments)
    const existingAppointment = appointments.find(
        (el) => el.id === currentAppointmentId
    )

    const generateId = () => {
        return dayjs().format('MMDDHHmmss').toString()
    }

    const selectedHour = useAppSelector((state) => state.selectedHour)

    const [appointment, setAppointment] = useState<AppointementType>(
        existingAppointment || {
            id: generateId(),
            vendorName: '',
            buyerName: '',
            companyName: '',
            selectedHour: selectedHour,
            quarter: '',
            duration: '',
        }
    )

    const cancelHandler = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(appointmentsActions.toggleMakeAppointment(''))
        dispatch(appointmentsActions.removeAppointment(appointment.id))
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

    const vendorNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            vendorName: e.target.value,
        }))
    }

    const buyerNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            buyerName: e.target.value,
        }))
    }

    const companyNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            companyName: e.target.value,
        }))
    }

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(appointmentsActions.addAppointment(appointment))
        dispatch(appointmentsActions.toggleMakeAppointment(''))
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
                            value={appointment.quarter}
                            onChange={selectQuarterHandler}
                            required
                        >
                            <option value=''>
                                --Please choose a starting time--
                            </option>
                            <option value='00'>{`${selectedHour}:00`}</option>
                            <option value='15'>{`${selectedHour}:15`}</option>
                            <option value='30'>{`${selectedHour}:30`}</option>
                            <option value='45'>{`${selectedHour}:45`}</option>
                        </select>

                        <label htmlFor='duration'>Duration:</label>
                        <select
                            name='duration'
                            onChange={selectDurationHandler}
                            value={appointment.duration}
                            required
                        >
                            <option value=''>
                                --Please choose a duration--
                            </option>
                            <option value='15'>15 minutes</option>
                            <option value='30'>30 minutes</option>
                            <option value='45'>45 minutes</option>
                            <option value='60'>1 hour</option>
                        </select>
                    </div>
                    <div className={styles.vendor}>
                        <label htmlFor='vendorName'>Vendor name:</label>
                        <input
                            id='vendorName'
                            value={appointment.vendorName}
                            onChange={vendorNameHandler}
                            required
                        />
                    </div>
                    <div className={styles.buyer}>
                        <label htmlFor='buyerName'>Buyer name:</label>
                        <input
                            id='buyerName'
                            value={appointment.buyerName}
                            onChange={buyerNameHandler}
                            required
                        />
                        <label htmlFor='companyName'>
                            Buyer's company name:
                        </label>
                        <input
                            id='companyName'
                            value={appointment.companyName}
                            onChange={companyNameHandler}
                            required
                        />
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={cancelHandler}>
                            Remove appointment
                        </button>
                        {!existingAppointment && <button>Confirm appointment</button>}
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default MakeAppointment
