import scanner from './assets/qr.png'
import PropTypes from 'prop-types';
const Button = ({ id}) => {
  return (
    <button id={id} style={{border: 'none', height: '44px'}}>
      <img src={scanner} style={{ width: '100%', height: '30px', opacity: '0.3' }} ></img>
    </button>
  );
}
Button.propTypes = {
    id: PropTypes.string.isRequired,
    style: PropTypes.object // Validate style prop as an object
};
export default Button;
