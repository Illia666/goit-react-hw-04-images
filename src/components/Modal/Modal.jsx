import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import styles from './modal.module.scss';

const modalRoot = document.querySelector('#root-modal');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };

  render() {
    const { image } = this.props;
    const { largeUrl, tags } = image;
    return createPortal(
      <div className={styles.overlay} onClick={this.closeModal}>
        <div className={styles.modal}>
          <LazyLoadImage src={largeUrl} alt={tags} effect="opacity" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  image: PropTypes.shape({
    largeUrl: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
