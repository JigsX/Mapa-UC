import{ useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import elevatorLogo from './assets/elevatorLogo.png';
import emergencyExit from './assets/emergencyExit.png';
import UCLogo from './assets/UCLogo.png'

function TextInput({ style }) {
    const [currentInputValue, setCurrentInputValue] = useState('');
    const [destinationInputValue, setDestinationInputValue] = useState('');
    const [showCurrentSuggestions, setShowCurrentSuggestions] = useState(false);
    const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
    const inputRef = useRef(null);

    const [isUseElevatorChecked, setIsUseElevatorChecked] = useState(false);
    const [isElevatorClicked, setIsElevatorClicked] = useState(false);

    const [isUseEmergencyExitChecked, setIsUseEmergencyExitChecked] = useState(false);
    const [isEmergencyExitClicked, setIsEmergencyExitClicked] = useState(false);
    
    const [isChoiceEnterDest, setIsChoiceEnterDest] = useState(false);

    const handleCheckboxElevatorClick = () => {
        setIsUseElevatorChecked(!isUseElevatorChecked);
        setIsElevatorClicked(!isUseElevatorChecked); // Toggle isClicked when the checkbox is clicked
    };

    const handleCheckboxEmergencyExitClick = () => {
        setIsUseEmergencyExitChecked(!isUseEmergencyExitChecked);
        setIsEmergencyExitClicked(!isUseEmergencyExitChecked); // Toggle isClicked when the checkbox is clicked
    };
    
    
    

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowCurrentSuggestions(false);
                setShowDestinationSuggestions(false);
            }
        };

        document.body.addEventListener('click', handleOutsideClick);

        return () => {
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const suggestions = ["S123", "S214", "S215", "S216", "S217", "S218", "S219", "S220"];

    const handleCurrentInputChange = (event) => {
        const { value } = event.target;
        setCurrentInputValue(value);
        setShowCurrentSuggestions(value.trim().length > 0);
    };

    const handleDestinationInputChange = (event) => {
        const { value } = event.target;
        setDestinationInputValue(value);
        setShowDestinationSuggestions(value.trim().length > 0);
    };

    const handleSuggestionClick = (suggestion, isCurrent) => {
        if (isCurrent) {
            setCurrentInputValue(suggestion);
            setShowCurrentSuggestions(false);
        } else {
            setDestinationInputValue(suggestion);
            setShowDestinationSuggestions(false);
        }
    };

    const clickHandle = (event) => {
        event.preventDefault();
        console.log(currentInputValue);
        console.log(isUseElevatorChecked);
        console.log(isUseEmergencyExitChecked);
    }

    const filteredCurrentSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().indexOf(currentInputValue.toLowerCase()) !== -1
    );

    const filteredDestinationSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().indexOf(destinationInputValue.toLowerCase()) !== -1
    );


    const [selectedDestination, setSelectedDestination] = useState('');
    const handlePickButtonChange = (event) => {
        const { value } = event.target;
        setSelectedDestination(value);
        setIsChoiceEnterDest(value === 'Enter Destination');
    };
    
    
    
    
    return (
        <div style={style} ref={inputRef}>
            <div style={{background:'#0c380c'}}>
                <h1 id="mapaUC">Mapa-UC
                    <img id="ucLogo"src={UCLogo} />
                </h1>
                
                
            </div>
            
            
            <div>
                <select 
                        value={selectedDestination}
                        onChange={handlePickButtonChange}
                        className='pickButton'>
                    <option  disabled selected value="">
                        Choose Your Destination
                    </option>
                    <option value="Enter Destination">
                        Enter Destination
                    </option>
                    <option value="Find Closest Facility">
                        Find Closest Facility
                    </option>
                </select>
                
            </div>



            <form>
                <label>
                    <input
                        className="InputBox"
                        placeholder="Enter Your Current Location"
                        type="text"
                        name='currentPost'
                        value={currentInputValue}
                        onChange={handleCurrentInputChange}
                            
                    />
                </label>
                {showCurrentSuggestions && (
                    <ul className="Suggestions">
                        {filteredCurrentSuggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(suggestion, true)}>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}

                <label>
                    <input
                        className="InputBox"
                        placeholder="Enter Your Destination"
                        type="text"
                        name="destination"
                        value={destinationInputValue}
                        onChange={handleDestinationInputChange}
                        style={{ display: isChoiceEnterDest ? 'block' : 'none' }}
                    />
                </label>
                {showDestinationSuggestions && (
                    <ul className="Suggestions">
                        {filteredDestinationSuggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(suggestion, false)}>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}

                    
                <select style={{ display: !isChoiceEnterDest ? 'block' : 'none' }}
                        className="InputBox" id="selectFac">
                    <option>Select Facility</option>
                    <option>cr</option>
                    <option>Gymnasium</option>
                    <option>test</option>
                    <option>test</option>
                </select>

        
                <div className={`CheckboxDiv ${isElevatorClicked ? 'clicked' : ''}`} onClick={handleCheckboxElevatorClick}>
                    <input
                        type="checkbox"
                        className='checkbox'
                        checked={isUseElevatorChecked}
                        onChange={() => {}}
                    />
                    <img src={elevatorLogo} className="checkbox-image" alt="Elevator Logo" />
                </div>  
                <div className={`CheckboxDiv ${isEmergencyExitClicked ? 'clicked' : ''}`} onClick={handleCheckboxEmergencyExitClick}>
                    <input
                        type="checkbox"
                        className='checkbox'
                        checked={isUseEmergencyExitChecked}
                        onChange={() => {}}
                    />
                    <img src={emergencyExit} className="checkbox-image" alt="Elevator Logo" />
                </div>  
                

                <button title="Locate"
                        className="Locatebuttons"
                        onClick={clickHandle}> Locate </button>

            </form>
            
        </div>
    );
}

TextInput.propTypes = {
    style: PropTypes.object // Validate style prop as an object
};

export default TextInput;
