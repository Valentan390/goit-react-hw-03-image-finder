import React, { Component } from 'react';
import styles from './ImageGalleryItem.module.css';
import { Modal } from 'components/modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    shownModal: false,
  };
  onModal = () => {
    this.setState(({ shownModal }) => ({ shownModal: !shownModal }));
  };
  render() {
    const { item } = this.props;
    const { webformatURL } = item;
    return (
      <li className={styles.ImageGalleryItem}>
        <img
          onClick={this.onModal}
          className={styles.ImageGalleryItemImage}
          src={webformatURL}
          alt="img"
        />
        {this.state.shownModal && <Modal onClose={this.onModal} image={item} />}
      </li>
    );
  }
}
