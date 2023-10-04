import style from './Modal.module.css';
import { createPortal } from 'react-dom';
import React, { Component } from 'react';

const ModalRoot = document.getElementById('ModalRoot');

export class Modal extends Component {
  handleEscape = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
  }

  handleBackdrop = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL } = this.props.image;
    return createPortal(
      <div onClick={this.handleBackdrop} className={style.Overlay}>
        <div className={style.Modal}>
          <img src={largeImageURL} alt="img" />
        </div>
      </div>,
      ModalRoot
    );
  }
}
