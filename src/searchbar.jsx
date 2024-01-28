import { useState } from 'react';
import PickButton from './pickButtons.jsx';
import TextInput from './input.jsx';
import Button from './button.jsx';
import FacList from './facilitiyList.jsx';
import AltPath from './elevatorEmergencyPath.jsx';
import LocateButton from './locateButton.jsx';

function SearchBar() {
    const [showPickDiv, setshowPickDiv] = useState(true);
    const [enterDes, setEnterDes] = useState(false);
    const [enterCurrentPos, setEnterCurrentPos] = useState(false);
    const [enterFac, setEnterFac] = useState(false);
    const [inputCurrentPosValue, setInputCurrentPosValue] = useState('');

    const handleChange = (event) => {
        const { id, value } = event.target;
        if (id === 'enterCurrentPostion') {
            setInputCurrentPosValue(value);
        }
    };

    const clickHandle = (event) => {
        event.preventDefault();
        console.log('Input:', inputCurrentPosValue); // Log input value
    };

    const handleClick = (buttonId) => {
        console.log('Button clicked:', buttonId); // Debugging: Log which button was clicked
        if (buttonId === 'enterDestButton') {
            console.log('Enter Destination button clicked');
            setEnterCurrentPos(true);
            setshowPickDiv(false);
            setEnterDes(true);
        } else if (buttonId === 'enterFacButton') {
            console.log('Find Closest Facility button clicked');
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

            <div id="searchBarFullDiv">
                <span style={{ flex: '1', flexBasis: '70%', padding: '0' }}>
                    <div id="enterQRDiv">
                        <span style={{ flex: '1', flexBasis: '90%', padding: '0' }}>
                            <TextInput
                                value={inputCurrentPosValue}
                                onChange={handleChange}
                                id="enterCurrentPostion"
                                style={{ display: enterCurrentPos ? 'block' : 'none' }}
                            />
                        </span>
                        <span style={{ flex: '1', flexBasis: '10%', padding: '0' }}>
                            <Button id="QRLogo" style={{ display: enterCurrentPos ? 'block' : 'none' }}></Button>
                        </span>
                    </div>

                    <span>
                        <TextInput id="enterDestination" style={{ display: enterDes ? 'block' : 'none' }} />
                        <FacList id="facilities" style={{ display: enterFac ? 'block' : 'none' }} />
                    </span>
                </span>

                <span style={{ marginTop: '4px', flex: '1', flexBasis: '30%', padding: '0', display: enterCurrentPos ? 'block' : 'none' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ flex: '1', flexBasis: '80%', padding: '0' }}>
                            <div id="logo">
                                <span>
                                    <AltPath id="useElevator"></AltPath>
                                </span>

                                <span>
                                    <AltPath id="useEmerExit"></AltPath>
                                </span>
                            </div>
                        </span>

                        <span style={{ flex: '1', flexBasis: '20%', padding: '0' }}>
                            <div id="locateDiv">
                                <LocateButton onClick={clickHandle} type="submit" value="Submit" title="Locate" />
                            </div>
                        </span>
                    </div>
                </span>
            </div>
        </>
    );
}

export default SearchBar;
