import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function TextInput({ id, style }) {
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.body.addEventListener('click', handleOutsideClick);

        return () => {
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const suggestions = ["S123", "S214", "S215", "S216", "S217", "S218", "S219", "S220"];

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        setShowSuggestions(value.trim().length > 0);
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        setShowSuggestions(false);
    };

    const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
    );

    return (
        <div id={id} style={style} ref={inputRef}>
            <input 
                className="InputBox" 
                placeholder="Enter text..."
                type="text"
                value={inputValue}
                onChange={handleInputChange}
            />
            {showSuggestions && (
                <ul className="Suggestions">
                    {filteredSuggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    style: PropTypes.object // Validate style prop as an object
};

export default TextInput;
