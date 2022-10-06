import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { useAppDispatch } from '../../hooks'
import { appointmentsActions } from '../../store'

import styles from './Modal.module.scss'

const Backdrop: React.FC = () => {
    const dispatch = useAppDispatch()

    const cancelHandler = () => {
        dispatch(appointmentsActions.toggleMakeAppointment())
    }

    return <div onClick={cancelHandler} className={styles.backdrop} />
}

type ModalType = {
    children?: ReactNode
}

const ModalOverlay: React.FC<ModalType> = ({ children }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>{children}</div>
        </div>
    )
}

const Modal: React.FC<ModalType> = ({ children }) => {
    const portalBackdropElement = document.getElementById('backdrop-root')!
    const portalOverlayElement = document.getElementById('overlay-root')!

    return (
        <>
            {
                ReactDOM.createPortal(<Backdrop />, portalBackdropElement)}
            {
                ReactDOM.createPortal(
                    <ModalOverlay>{children}</ModalOverlay>,
                    portalOverlayElement
                )}
        </>
    )
}

export default Modal
