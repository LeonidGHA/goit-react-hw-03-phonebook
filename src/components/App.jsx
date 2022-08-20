import { Component } from 'react';
import Notiflix from 'notiflix';
import css from './App.module.css';

import Forms from './Forms';
import ContactsList from './ContactsList';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    // console.log('didmount');
    const localContacts = localStorage.getItem('contacts');
    const localParsedCont = JSON.parse(localContacts);

    if (localParsedCont) {
      this.setState({ contacts: localParsedCont });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('didupdate');

    if (this.state.contacts !== prevState.contacts) {
      // console.log('work');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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

  filterState = () => {
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
    const renderFiterItem = this.filterState();
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <Forms onSubmit={this.submitDataForm} />
        <h2 className={css.title}>Contacts</h2>
        <Filter onWrite={this.textFilterWrite} />
        {contacts.length !== 0 && (
          <ContactsList
            contacts={renderFiterItem}
            deleteContacts={this.deleteContacts}
          />
        )}
      </div>
    );
  }
}

export default App;
