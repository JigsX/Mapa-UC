import PickButton from './pickButtons.jsx';
import TextInput from './input.jsx';
import FacList from './facilitiyList.jsx';
import AltPath from './elevatorEmergencyPath.jsx';
function App() {
    return (
        <>
        <PickButton title="Enter Destination"/>
        <PickButton title="Find Closest Facility"/>
        <TextInput placeholder="Enter Current Location" />
        <TextInput placeholder="Enter Destination" />
        <FacList/>
        <AltPath id="useElevator"/>
        <AltPath id="useEmerExit"/>
        </>

    );
}

export default App;
