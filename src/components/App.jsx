import { Component } from 'react';
import Notiflix from 'notiflix';
import css from './App.module.css';

import Forms from './Forms';
import ContactsList from './ContactsList';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  submitDataForm = data => {
    const { contacts } = this.state;
    if (contacts.find(el => el.name === data.name)) {
      Notiflix.Report.warning(
        `Warning`,
        `${data.name} is already in cotacts`,
        'Okay'
      );
      return;
    }
    Notiflix.Notify.success('You have a new Contact');
    this.setState(prevState => ({
      contacts: [...prevState.contacts, data],
    }));
  };

  textFilterWrite = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  fiterState = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContacts = e => {
    const { contacts } = this.state;
    const newArr = contacts.filter(el => el.id !== e.target.id);
    Notiflix.Notify.success('Contact is delete');
    return this.setState({
      contacts: newArr,
    });
  };

  render() {
    const { contacts } = this.state;
    const renderFiterItem = this.fiterState();
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <Forms onSubmit={this.submitDataForm} />
        <h2 className={css.title}>Contacts</h2>
        <Filter onWrite={this.textFilterWrite} />
        {contacts.length !== 0 && (
          <ContactsList
            contacts={this.fiterState(renderFiterItem)}
            deleteContacts={this.deleteContacts}
          />
        )}
      </div>
    );
  }
}

export default App;
