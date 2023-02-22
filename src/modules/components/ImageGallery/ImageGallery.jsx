import PropTypes from 'prop-types';
import { memo } from 'react';
import { ImageGalleryList } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ items, showImg }) => {
  const elements = items.map(({ id, webformatURL, tags, largeImageURL }) => {
    return (
      <ImageGalleryItem
        showImg={showImg}
        key={id}
        src={webformatURL}
        tags={tags}
        largeImageURL={largeImageURL}
      />
    );
  });

  return <ImageGalleryList>{elements}</ImageGalleryList>;
};

export default memo(ImageGallery);

ImageGallery.propTypes = {
  showImg: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

ImageGallery.defaultProps = {
  items: [],
};
