
import PropTypes from 'prop-types';

function FacList({ id, style }) {
    return (
        <div id={id} style={style}>
            <select className="InputBox" id="selectFac">
                <option>Select Facility</option>
                <option>cr</option>
                <option>Gymnasium</option>
                <option>test</option>
                <option>test</option>
            </select>
        </div>
    );
}

FacList.propTypes = {
    id: PropTypes.string.isRequired,
    style: PropTypes.object // Validate style prop as an object
};

export default FacList;
