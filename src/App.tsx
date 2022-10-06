import { useAppSelector } from './Components/Hooks/use-reduxhooks'
import Day from './Components/Day'
import MakeAppointment from './Components/MakeAppointment'

function App() {
    const showMakeAppointment = useAppSelector(
        (state) => state.showMakeAppointment
    )

    return (
        <div className='App'>
            <Day />
            {showMakeAppointment && <MakeAppointment />}
        </div>
    )
}

export default App
