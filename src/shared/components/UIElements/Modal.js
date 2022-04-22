import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import styles from './Modal.module.css';
import Backdrop from './Backdrop';

const ModalOverlay = (props) => {
    const content = (
        <div className={`${styles['modal']} ${props.className}`} style={props.style}>
            <header className={`${styles['modal__header']} ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            <form onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault()}>
                <div className={`${styles['modal__content']} ${props.contentClass}`}>
                    {props.children}
                </div>
            </form>
            <footer className={`${styles['modal__footer']} ${props.footerClass}`}>
                {props.footer}
            </footer>
        </div>
    )
    return ReactDOM.createPortal(content , document.getElementById('modal-hook'))
}

const Modal = (props) => {
    return (
        <>
            {props.show && <Backdrop onClick={props.onCancel} />} 
            <CSSTransition
                in={props.show}
                mountOnEnter
                unmountOnExit
                timeout={0}
                classNames={styles.modal}
            >
                <ModalOverlay {...props} />
            </CSSTransition>
        </>
    )
}

export default Modal;