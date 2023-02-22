import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreBtn from 'shared/components/Button/Button';
import Modal from 'shared/components/Modal/Modal';
import ModalImg from 'shared/components/ModalImg/ModalImg';
import Loader from 'shared/components/Loader/Loader';

import { searchImg } from 'shared/services/img-app';

const ImgSearch = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    }
    const fetchImg = async () => {
      try {
        setLoading(true);
        const data = await searchImg(search, page);
        if (!data.hits.length) {
          toast.info('Nothing found for your request.');
          return;
        }
        setItems(prevItems => [...prevItems, ...data.hits]);
      } catch (error) {
        setError(toast.error(error.message));
      } finally {
        setLoading(false);
      }
    };
    fetchImg();
  }, [search, page, setLoading, setItems, setError]);

  const onSearchImg = useCallback(({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  }, []);

  const showImg = useCallback(({ largeImageURL, tags }) => {
    setModalImg({
      largeImageURL,
      tags,
    });
  }, []);

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const closeModal = useCallback(() => {
    setModalImg(null);
  }, []);

  return (
    <>
      <Searchbar onSubmit={onSearchImg} />
      {Boolean(items.length) && (
        <ImageGallery items={items} showImg={showImg} />
      )}
      {error && <p>{error}</p>}
      {loading && <Loader />}
      {Boolean(items.length) && !loading && (
        <LoadMoreBtn type="button" onClick={loadMore} />
      )}
      {modalImg && (
        <Modal close={closeModal}>
          <ModalImg
            largeImageURL={modalImg.largeImageURL}
            tags={modalImg.tags}
          ></ModalImg>
        </Modal>
      )}
    </>
  );
};

export default ImgSearch;
