function TextInput(placeholder) {


    return (
        <div>
            <input className="InputBox" placeholder={placeholder.placeholder} type="text" id="myInput"/>
        </div>
    );
}

export default TextInput;
