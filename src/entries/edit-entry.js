import getCookieById from '../cookies/get-cookie-by-id';
import setConfMessage from '../utils/set-conf-message';
import disableConfirmation from '../utils/disable-confirmation';

export default (button, gratitudesField, confContent, editingMessage, confList, confTimestamps, confButton, dateField, timeField, confirmAddGratitude) => {
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

    const dateTime = cookie.timestamp.split(', ');
    const date = dateTime[0].split('/');
    dateField.value = `${date[2]}-${date[1]}-${date[0]}`;
    timeField.value = dateTime[1];

    button.dataset.editing = 'true';
    button.innerText = 'Stop editing';
    disableConfirmation(confContent, editingMessage, confList, confTimestamps, confButton, confirmAddGratitude);
  }
}