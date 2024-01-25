import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import elevatorLogo from './assets/elevatorLogo.png';
import emergencyExit from './assets/emergencyExit.png';
import './index.css'; // Import your CSS file

function AltPath({ id }) {
    const [isChecked, setIsChecked] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    let Logo;

    if (id === "useElevator") {
        Logo = elevatorLogo;
    } else if (id === "useEmerExit") {
        Logo = emergencyExit;
    }

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
        setIsClicked(!isChecked); // Toggle isClicked when the checkbox is clicked
    };

    return (
        <div>
            <div className={`CheckboxDiv ${isClicked ? 'clicked' : ''}`} onClick={handleCheckboxClick}>
                <input
                    type="checkbox"
                    className='checkbox'
                    checked={isChecked}
                    onChange={() => {}}
                />
                <img src={Logo} className="checkbox-image" alt="Elevator Logo" />
            </div>
        </div>
    );
}

// Define PropTypes for the AltPath component
AltPath.propTypes = {
    id: PropTypes.oneOf(['useElevator', 'useEmerExit']).isRequired
};

export default AltPath;
