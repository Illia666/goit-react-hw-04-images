import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalBox, Close } from './Modal.styled';
import { IoClose } from 'react-icons/io5';
import { IconContext } from 'react-icons';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ close, children }) => {
  const closeModal = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => document.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  return createPortal(
    <Overlay onClick={closeModal}>
      <Close onClick={close}>
        <IconContext.Provider
          value={{ style: { width: '30px', height: '30px', fill: 'white' } }}
        >
          <IoClose />
        </IconContext.Provider>
      </Close>
      <ModalBox>{children}</ModalBox>
    </Overlay>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
