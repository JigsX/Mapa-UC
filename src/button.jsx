import scanner from './assets/qr.png'
import PropTypes from 'prop-types';
const Button = ({ id, style}) => {
  return (
    <button id={id} style={style}>
      <img src={scanner} style={{ width: '100%', height: '30px', opacity: '0.3' }} ></img>
    </button>
  );
}
Button.propTypes = {
    id: PropTypes.string.isRequired,
    style: PropTypes.object // Validate style prop as an object
};
export default Button;
