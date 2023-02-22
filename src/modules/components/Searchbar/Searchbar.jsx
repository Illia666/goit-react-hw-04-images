import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { IoSearch } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import {
  SearchbarSection,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      toast.info('Enter a search term.');
      return;
    }
    onSubmit({ search });
    setSearch('');
  };

  return (
    <SearchbarSection>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormInput
          value={search}
          onChange={handleChange}
          name="search"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <SearchFormButton type="submit">
          <IconContext.Provider
            value={{
              style: { width: '30px', height: '30px', fill: '#3f51b5' },
            }}
          >
            <IoSearch />
          </IconContext.Provider>
        </SearchFormButton>
      </SearchForm>
    </SearchbarSection>
  );
};

export default memo(Searchbar);

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
