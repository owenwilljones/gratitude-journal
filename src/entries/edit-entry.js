import getCookieById from '../cookies/get-cookie-by-id';
import setConfMessage from '../utils/set-conf-message';
import disableConfirmation from '../utils/disable-confirmation';

export default (button, gratTextarea, confContent, editingMessage, confList, confButton) => {
  const parent = button.parentNode;
  const cookie = getCookieById(parent.dataset.id);

  if (button.dataset.editing === 'true') {
    button.dataset.editing = 'false';
    button.innerText = 'Edit entry';
    gratTextarea.dataset.editing = 0;
    gratTextarea.value = '';

    setConfMessage(`You've cancelled editing an existing journal entry`);
  } else {
    gratTextarea.value = cookie.gratitudes.join('\n');
    gratTextarea.dataset.editing = cookie.id;

    button.dataset.editing = 'true';
    button.innerText = 'Stop editing';
    disableConfirmation(confContent, editingMessage, confList, confButton);
  }
}