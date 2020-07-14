import getCookieById from './get-cookie-by-id';
import {render as renderNoLogMessage} from '../rendering/no-log-message';

export default (button, editEntryAlias, deleteEntryAlias, journalList) => {
  const parent = button.parentNode;
  const cookie = getCookieById(parent.dataset.id);

  document.cookie = `gratitude ${cookie.id}=null; expires=Thu, 01 Jan 1970 00:00:01 GMT`;

  parent.getElementsByTagName('button')[0].removeEventListener('click', editEntryAlias);
  button.removeEventListener('click', deleteEntryAlias);
  parent.classList.remove('journal-entry');
  parent.classList.add('message', 'message--success');
  parent.innerHTML = `Journal entry deleted successfully`;

  setTimeout(() => {
    parent.remove();
    if (journalList.children.length === 0) {
      renderNoLogMessage(journalList);
    }
  }, 3000);
};