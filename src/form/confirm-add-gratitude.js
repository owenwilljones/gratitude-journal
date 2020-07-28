import setCookie from '../cookies/set-cookie';
import sanitizeInput from '../utils/sanitize-input';
import renderJournalComponent from '../rendering/journal-component';
import disableConfirmation from '../utils/disable-confirmation';
import {clear as clearNoLogMessage} from '../rendering/no-log-message';
import setConfMessage from '../utils/set-conf-message';

export default (gratitudesField, dateField, timeField, journalList, editEntry, deleteEntry, confContent, editingMessage, confList, confTimestamps, confButton, confirmAddGratitude) => {
  const latest = setCookie(sanitizeInput(gratitudesField.value).split(/\r?\n/), gratitudesField, dateField, timeField);
  let message = '';
  
  renderJournalComponent(latest, gratitudesField, journalList, editEntry, deleteEntry);

  if (gratitudesField.dataset.editing !== "0") {
    gratitudesField.dataset.editing = 0;
    message = `You've successfully updated one of your old entries!`;
  } else {
    message = `You've successfully added an entry to your gratitude journal!`;
  }

  disableConfirmation(confContent, editingMessage, confList, confTimestamps, confButton, confirmAddGratitude);
  clearNoLogMessage(journalList);
  gratitudesField.value = '';
  dateField.value = '';
  timeField.value = '';

  setConfMessage(message);
}