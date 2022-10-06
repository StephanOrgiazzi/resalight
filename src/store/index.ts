import { configureStore, createSlice } from '@reduxjs/toolkit'

const DUMMY_APPOINTMENTS = [
    {
        id: '1006111509',
        vendorName: 'Lindy',
        buyerName: 'Danna',
        companyName: 'Ralph Lauren',
        selectedHour: '10',
        quarter: '00',
        duration: '15'
    },
    {
        id: '1006111405',
        vendorName: 'Lindy',
        buyerName: 'Karl',
        companyName: 'Loewe',
        selectedHour: '14',
        quarter: '30',
        duration: '30'
    }
]

const initialState = { showMakeAppointment: false, selectedHour: null, appointments: DUMMY_APPOINTMENTS, currentAppointmentId: null }

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
        addAppointment(state, action) {
            state.appointments = state.appointments.concat(action.payload)
        },
        removeAppointment(state, action) {
            state.appointments = state.appointments.filter(el => el.id !== action.payload)
        }
    },
})

const store = configureStore({
    reducer: appointmentsSlice.reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const appointmentsActions = appointmentsSlice.actions

export default store
