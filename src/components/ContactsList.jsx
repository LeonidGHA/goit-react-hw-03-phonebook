import css from './App.module.css';
import PropTypes from 'prop-types';
function ContactsList({ contacts, deleteContacts }) {
  const renderContact = contacts.map(({ id, name, number }) => (
    <li className={css.item} key={id}>
      {name} : {number}
      <button
        className={css.listBtn}
        type="button"
        onClick={deleteContacts}
        id={id}
      >
        X
      </button>
    </li>
  ));

  return <ul className={css.list}>{renderContact}</ul>;
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContacts: PropTypes.func.isRequired,
};

export default ContactsList;
