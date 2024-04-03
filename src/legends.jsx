import React, { useState } from 'react';


function PopupWithPicture() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the popup
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Button to trigger the popup */}
      <button onClick={togglePopup}>Show Picture</button>

      {/* Popup container */}
      {isOpen && (
        <div className="popup-container">
          {/* Popup content */}
          <div className="popup-content">
            <span className="exit-button" onClick={togglePopup}>X</span>
            <img src="https://via.placeholder.com/400" alt="Placeholder Image" />
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupWithPicture;
