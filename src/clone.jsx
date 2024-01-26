
import PickButton from './pickButtons.jsx';
import TextInput from './input.jsx';
import FacList from './facilitiyList.jsx';


function SearchBar() {


    

    return (
        <>
            <div id="pickDiv">
                <PickButton id="enterDestButton" title="Enter Destination"/>
                <PickButton id="enterFacButton" title="Find Closest Facility"/>
            </div>
            
            <div id="EnterDiv" style={{display:"none"}}>
                <TextInput id="enterCurrentPostion"/>
                <TextInput id="enterDestination" />
                <FacList id="facilities" />
            </div>
        </>
    );
}

export default SearchBar;
