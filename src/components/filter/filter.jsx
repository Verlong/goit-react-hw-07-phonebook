import React from 'react';
import PropTypes from 'prop-types';
import css from './filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter, setFilter } from 'redux/actions';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const onChange = e => {
    dispatch(setFilter(e.target.value));
  };
  return (
    <div className={css.filterContainer}>
      <label className={css.filterLabel}>Find contacts by name</label>
      <input type="text" name={filter} value={filter} onChange={onChange} />
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
