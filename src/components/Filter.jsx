import css from './App.module.css';
import PropTypes from 'prop-types';
function Filter({ onWrite }) {
  return (
    <input
      type="text"
      className={css.input}
      name="filter"
      placeholder="Serch Contacts"
      //   value={this.state.filter}
      onChange={onWrite}
    />
  );
}

Filter.propTypes = {
  onWrite: PropTypes.func,
};
export default Filter;
