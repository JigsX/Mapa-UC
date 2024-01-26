
import PropTypes from 'prop-types';

function PickButton({ id, title, onClick }) {
    return (
        <button className='pickButton' id={id} onClick={onClick}>
            {title}
        </button>
    );
}

PickButton.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default PickButton;



