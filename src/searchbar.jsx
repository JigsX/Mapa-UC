import  { useState} from 'react';

import PickButton from './pickButtons.jsx';
import TextInput from './input.jsx';
import FacList from './facilitiyList.jsx';

function SearchBar() {
    const [showPickDiv, setshowPickDiv] = useState(true);
    const [enterDes, setEnterDes] = useState(false);
    const [enterCurrentPos, setEnterCurrentPos] = useState(false);
    const [enterFac, setEnterFac] = useState(false);

    const handleClick = (buttonId) => {
        if (buttonId === 'enterDestButton') {
            setEnterCurrentPos(true);
            setshowPickDiv(false);
            setEnterDes(true);
        } else if (buttonId === 'enterFacButton') {
            setEnterCurrentPos(true);
            setshowPickDiv(false);
            setEnterFac(true);
        }
    };

    return (
        <>
            <div id="pickDiv" style={{ display: showPickDiv ? 'block' : 'none' }}>
                <PickButton id="enterDestButton" title="Enter Destination" onClick={() => handleClick('enterDestButton')} />
                <PickButton id="enterFacButton" title="Find Closest Facility" onClick={() => handleClick('enterFacButton')} />
            </div>
            <div>
                <TextInput id="enterCurrentPostion" style={{ display: enterCurrentPos ? 'block' : 'none' }} />
                <TextInput id="enterDestination" style={{ display: enterDes ?'block' : 'none'}}/>
                <FacList id="facilities" style={{ display: enterFac ? 'block' : 'none'}} />
            </div>
            
            
        </>
    );
}

export default SearchBar;
