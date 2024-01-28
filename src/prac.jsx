import { useState } from 'react';

function Pract() {
    const [selectValue, setSelectValue] = useState('');
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
            if (name === 'checkbox1') {
                setCheckbox1(checked);
            } else if (name === 'checkbox2') {
                setCheckbox2(checked);
            }
        } else if (type === 'text') {
            if (name === 'input1') {
                setInputValue1(value);
                
            } else if (name === 'input2') {
                setInputValue2(value);
            }
        } else {
            setSelectValue(value);
        }
    };

    const clickHandle = (event) => {
        event.preventDefault();
        console.log('Select value:', selectValue);
        console.log('Checkbox 1:', checkbox1);
        console.log('Checkbox 2:', checkbox2);
        console.log('Input 1 value:', inputValue1);
        console.log('Input 2 value:', inputValue2);
    };

    return (
        <>
            <form>
                <select value={selectValue} onChange={handleChange}>
                    <option value="">Select an option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
                <br />
                <label>
                    Checkbox 1
                    <input
                        type="checkbox"
                        name="checkbox1"
                        checked={checkbox1}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Checkbox 2
                    <input
                        type="checkbox"
                        name="checkbox2"
                        checked={checkbox2}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Input 1
                    <input
                        type="text"
                        name="input1"
                        value={inputValue1}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Input 2
                    <input
                        type="text"
                        name="input2"
                        value={inputValue2}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <input onClick={clickHandle} type="submit" value="Submit" />
            </form>
        </>
    );
}

export default Pract;
