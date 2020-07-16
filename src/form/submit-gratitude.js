import setConfMessage from '../utils/set-conf-message';
import setErrorMessage from '../utils/set-error-message';
import disableConfirmation from '../utils/disable-confirmation';
import sanitizeInput from '../utils/sanitize-input';
import renderList from '../rendering/list';

export default (gratTextarea, confContent, editingMessage, confList, confButton, confirmAddGratitude) => {
  document.getElementById('submit-gratitude').addEventListener('click', () => {
    setConfMessage(false);

    if (gratTextarea.value === '') {
      setErrorMessage('Please enter content into the textbox below');
      disableConfirmation(confContent, editingMessage, confList, confButton);
      return;
    } else {
      setErrorMessage(false);
    }

    const gratitudes = sanitizeInput(gratTextarea.value).split(/\r?\n/);
    
    confContent.classList.remove('hidden');
    confList.innerHTML = renderList(gratitudes);

    if (gratTextarea.dataset.editing !== 0) {
      editingMessage.classList.remove('hidden');
    }

    confButton.addEventListener('click', confirmAddGratitude);
  });
};