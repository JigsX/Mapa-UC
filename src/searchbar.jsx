import  { useState} from 'react';

import LocateButton from './locateButton.jsx'
import AltPath from './elevatorEmergencyPath.jsx';
import PickButton from './pickButtons.jsx';
import TextInput from './input.jsx';
import FacList from './facilitiyList.jsx';
import Button from './button.jsx';

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
                <div id="enterQRDiv">
                    <span style={{ flex: '1', flexBasis: '80%',padding: '0' }}>
                        <TextInput id="enterCurrentPostion" style={{ display: enterCurrentPos ? 'block' : 'none' }} />
                    </span>
                    <span style={{ flex: '1', flexBasis: '20',padding: '0' }}>
                        <Button id="QRLogo" style={{display: enterCurrentPos ? 'block' : 'none' }}></Button>
                    </span>
                </div>
                
                <TextInput id="enterDestination" style={{ display: enterDes ?'block' : 'none'}}/>
                <FacList id="facilities" style={{ display: enterFac ? 'block' : 'none'}} />
            </div>


            <div>
                <div id="logo">
                    <span>
                        <AltPath id="useElevator"></AltPath>
                    </span>

                    <span>
                        <AltPath id="useEmerExit"></AltPath>
                    </span>
                </div>

                <div id="locateDiv">
                    <LocateButton title="Locate"></LocateButton>
                </div>
            </div>
            
            
            
            
        </>
    );
}

export default SearchBar;
