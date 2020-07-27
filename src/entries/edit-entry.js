import getCookieById from '../cookies/get-cookie-by-id';
import setConfMessage from '../utils/set-conf-message';
import disableConfirmation from '../utils/disable-confirmation';

export default (button, gratitudesField, confContent, editingMessage, confList, confButton, dateField, timeField, confirmAddGratitude) => {
  const parent = button.parentNode;
  const cookie = getCookieById(parent.dataset.id);

  if (button.dataset.editing === 'true') {
    button.dataset.editing = 'false';
    button.innerText = 'Edit entry';
    gratitudesField.dataset.editing = 0;
    gratitudesField.value = '';

    setConfMessage(`You've cancelled editing an existing journal entry`);
  } else {
    gratitudesField.value = cookie.gratitudes.join('\n');
    gratitudesField.dataset.editing = cookie.id;

    button.dataset.editing = 'true';
    button.innerText = 'Stop editing';
    disableConfirmation(confContent, editingMessage, confList, confButton, dateField, timeField, confirmAddGratitude);
  }
}