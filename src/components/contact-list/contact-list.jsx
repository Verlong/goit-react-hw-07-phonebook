import React from 'react';
import PropTypes from 'prop-types';
import css from './contact-list.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/actions';
import { deleteContact, getContacts } from 'redux/initialState';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filtered = useSelector(getFilter);

  const normalizedFilter = filtered.toLowerCase();
  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );
  return (
    <ul className={css.contactList}>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id} className={css.contactItem}>
          <p className={css.contactDetails}>
            {name}: {number}
          </p>
          <button
            className={css.deleteButton}
            type="button"
            onClick={() => dispatch(deleteContact(id))}
          >
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
};

export default ContactList;
