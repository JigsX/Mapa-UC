import PropTypes from 'prop-types';

function LocateButton({title}){
    return(
        <button type="button" className="Locatebuttons">{title}</button>
    );
}
LocateButton.propTypes = {
    title: PropTypes.string // Validate style prop as an object
};
export default LocateButton;