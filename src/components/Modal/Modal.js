import PropTypes from 'prop-types';

import styles from './Modal.module.css';

function Modal({ children, onClose }) {
  return (
    <div className={styles.Overlay}>
      <div className={styles.Modal}>
        <div>{children}</div>
        <hr />
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
