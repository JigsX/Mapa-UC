import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBwM78rh1iYKCnJlW1-oYwB4dZbrRFdz-c",
  authDomain: "roomorientationdata.firebaseapp.com",
  databaseURL: "https://roomorientationdata-default-rtdb.firebaseio.com",
  projectId: "roomorientationdata",
  storageBucket: "roomorientationdata.appspot.com",
  messagingSenderId: "99942721154",
  appId: "1:99942721154:web:18939bfc42074d9316769b"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const SuggestionBox = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const collegesLogoUrl = (inputText) => {
    let searchSuggest = [];
    const buildings = ['BRS','Science','EDS','Main','PE','CHTM'];
    const floors = ['Ground Floor','1st Floor', '2nd Floor','3rd Floor','4th Floor','5th Floor','6th Floor','7th Floor',
                    '8th Floor','9th Floor', '10th Floor'];

    return new Promise((resolve, reject) => {
      let promises = [];
      let blockSuggestArray = ["<strong> ELEVATOR </strong>",
                                  "Facility","Drafting Room","Classroom","CR(Women)","CR(Men)",
                                  "Computer Room"];
      buildings.forEach(building => {
        const userRef = ref(database, building);
        promises.push(new Promise((resolve, reject) => {
          onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            floors.forEach(floor => {
              for (let j = 1; j <= 35; j++) {
                if (data && data[floor] && data[floor][j]) {
                  if ((data[floor][j].cat != null) && (data[floor][j].cat != "") && !(blockSuggestArray.includes(data[floor][j].cat)) ) {
                    if (data[floor][j].cat.toLowerCase().includes(inputText.toLowerCase())) {
                      searchSuggest.push(data[floor][j].cat);
                    }
                  }
                  if ((data[floor][j].roomID != null) && (data[floor][j].roomID != "") && !(blockSuggestArray.includes(data[floor][j].roomID))){
                    if (data[floor][j].roomID.toLowerCase().includes(inputText.toLowerCase())) {
                      searchSuggest.push(data[floor][j].roomID);
                    }
                  }
                }
              }
            });
            resolve();
          }, (error) => {
            reject(error);
          });
        }));
      });

      Promise.all(promises).then(() => {
        resolve(searchSuggest);
      }).catch(error => {
        reject(error);
      });
    });
  };

  const updateSuggestions = async () => {
    try {
      const fetchedSuggestions = await collegesLogoUrl(inputValue);
      setSuggestions(fetchedSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    updateSuggestions();
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log(suggestions);
    }
  };

  const filteredSuggestions = suggestions
    .filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    )
    .slice(0, 5);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleEnterKeyPress}
        placeholder="Type something..."
      />
      <button onClick={() => console.log(suggestions)}>Log Suggestions</button>
      {showSuggestions && (
        <div className="suggestion-box">
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestionBox;
