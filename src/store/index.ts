import { configureStore, createSlice } from '@reduxjs/toolkit'

const DUMMY_APPOINTMENTS = [
    {
        id: '1006111405',
        vendorName: 'Lindy',
        buyerName: 'Karl',
        companyName: 'Loewe',
        selectedHour: 14,
        quarter: 'quarter1',
        duration: '30'
    },
    {
        id: '1006111509',
        vendorName: 'Lindy',
        buyerName: 'Danna',
        companyName: 'Ralph Lauren',
        selectedHour: 10,
        quarter: 'quarter1',
        duration: '15'
    },
]

const initialState = { showMakeAppointment: false, selectedHour: null, appointments: DUMMY_APPOINTMENTS }

const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
        toggleMakeAppointment(state) {
            state.showMakeAppointment = !state.showMakeAppointment
        },
        selectHour(state, action) {
            state.selectedHour = action.payload
        },
        addAppointment(state, action) {
            state.appointments = state.appointments.concat(action.payload)
            console.log("state.appointments", state.appointments)
        },
        removeAppointment(state, action) {
            // TODO
            console.log("state.appointments", state.appointments)
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
