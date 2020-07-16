import setCookie from '../cookies/set-cookie';
import sanitizeInput from '../utils/sanitize-input';
import renderJournalComponent from '../rendering/journal-component';
import disableConfirmation from '../utils/disable-confirmation';
import {clear as clearNoLogMessage} from '../rendering/no-log-message';
import setConfMessage from '../utils/set-conf-message';

export default (gratTextarea, journalList, editEntry, deleteEntry, confContent, editingMessage, confList, confButton, confirmAddGratitude) => {
  const latest = setCookie(sanitizeInput(gratTextarea.value).split(/\r?\n/), gratTextarea);
  let message = '';
  
  renderJournalComponent(latest, gratTextarea, journalList, editEntry, deleteEntry);

  if (gratTextarea.dataset.editing !== "0") {
    gratTextarea.dataset.editing = 0;
    message = `You've successfully updated one of your old entries!`;
  } else {
    message = `You've successfully added an entry to your gratitude journal!`;
  }

  disableConfirmation(confContent, editingMessage, confList, confButton, confirmAddGratitude);
  clearNoLogMessage(journalList);
  gratTextarea.value = '';

  setConfMessage(message);
}