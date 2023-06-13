import React from 'react';
import css from './App.module.css';
import ContactForm from './contact-form/contact-form';
import ContactList from './contact-list/contact-list';
import { Filter } from './filter/filter';

const App = () => {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Phonebook</h2>
      <ContactForm />
      <h3 className={css.subtitle}>Contacts</h3>

      <Filter />

      <ContactList />
    </div>
  );
};

export default App;
