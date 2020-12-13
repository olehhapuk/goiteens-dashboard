import PropTypes from 'prop-types';

function FormInput({ label, variant }) {
  if (variant === 'input') {
    return (
      <div>
        <input />
      </div>
    );
  } else if (variant === 'textarea') {
    return (
      <div>
        <textarea />
      </div>
    );
  } else {
    return null;
  }
}

FormInput.propTypes = {
  variant: PropTypes.oneOf(['input', 'textarea']),
};

export default FormInput;
