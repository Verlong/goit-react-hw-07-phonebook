import React from 'react';
import Notiflix from 'notiflix';
import css from './contact-form.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact } from 'services/contactsApi';
import { selectContacts } from 'redux/selectors';

const ContactForm = () => {
  const [contactName, setContactName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = event => {
    event.preventDefault();

    if (contacts.some(({ name }) => name === contactName)) {
      Notiflix.Notify.failure(`${contactName} is already in your contacts`);
      return;
    }

    if (contacts.some(contact => contact.number === number)) {
      Notiflix.Notify.failure(
        `This number - ${number} is already in your contacts`
      );
      return;
    }

    dispatch(
      addContact({
        name: contactName,
        number,
        id: nanoid(),
      })
    );

    setContactName('');
    setNumber('');
  };

  const handleChange = event => {
    const { name, value } = event.target;
    let sanitizedValue = value;

    if (name === 'name') {
      sanitizedValue = value.replace(/[^a-zA-Zа-яА-Я\s'-]/g, '');
      setContactName(sanitizedValue);
    } else if (name === 'number') {
      sanitizedValue = value.replace(/[^0-9\s()-+]/g, '');
      setNumber(sanitizedValue);
    }
  };

  return (
    <form className={css.contactNameForm} onSubmit={handleSubmit}>
      <label className={css.contactLabel} htmlFor="contact-name">
        Name
      </label>
      <input
        id="contact-name"
        type="text"
        name="name"
        value={contactName}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <label className={css.contactLabel} htmlFor="contact-number">
        Number
      </label>
      <input
        id="contact-number"
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <button type="submit" className={css.addContactBtn}>
        ✅
      </button>
    </form>
  );
};

export default ContactForm;
