import css from './App.module.css';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

class Forms extends Component {
  state = {
    name: '',
    number: '',
  };

  textWrite = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  onClickSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;
    this.props.onSubmit({
      name,
      number,
      id: nanoid(),
    });

    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form className={css.formStyle} onSubmit={this.onClickSubmit}>
        <input
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Corben Dallas"
          value={this.state.name}
          onChange={this.textWrite}
        />
        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="+38-0__-__-__-__"
          value={this.state.number}
          onChange={this.textWrite}
        />
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

Forms.propTypes = {
  onSubmit: PropTypes.func,
};

export default Forms;
