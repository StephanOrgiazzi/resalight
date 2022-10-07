import { configureStore, createSlice } from '@reduxjs/toolkit'
import { AppointementType } from '../types'

const initialState = {
    showMakeAppointment: false,
    selectedHour: null,
    appointments: [],
    currentAppointmentId: null,
}

const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
        toggleMakeAppointment(state, action) {
            state.showMakeAppointment = !state.showMakeAppointment
            state.currentAppointmentId = action.payload
        },
        selectHour(state, action) {
            state.selectedHour = action.payload
        },
        setAppointments(state, action) {
            state.appointments = state.appointments.concat(action.payload)
        },
        removeAppointment(state, action) {
            state.appointments = state.appointments.filter(
                (el: AppointementType) => el.id !== action.payload
            )
        },
    },
})

const store = configureStore({
    reducer: appointmentsSlice.reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const appointmentsActions = appointmentsSlice.actions

export default store
