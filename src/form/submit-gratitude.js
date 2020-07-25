import setConfMessage from '../utils/set-conf-message';
import disableConfirmation from '../utils/disable-confirmation';
import sanitizeInput from '../utils/sanitize-input';
import renderList from '../rendering/list';

const errorMessage = document.getElementById('error-message');

const setErrorMessage = message => {
  if (message !== false) {
    errorMessage.classList.remove('hidden');
    errorMessage.innerText = message;
  } else {
    errorMessage.classList.add('hidden');
    errorMessage.innerText = '';
  }
};

export default (gratitudesField, confContent, editingMessage, confList, confButton, confirmAddGratitude) => {
  document.getElementById('submit-gratitude').addEventListener('click', () => {
    setConfMessage(false);

    if (gratitudesField.value === '') {
      setErrorMessage('Please enter content into the textbox below');
      disableConfirmation(confContent, editingMessage, confList, confButton);
      return;
    } else {
      setErrorMessage(false);
    }

    const gratitudes = sanitizeInput(gratitudesField.value).split(/\r?\n/);
    
    confContent.classList.remove('hidden');
    confList.innerHTML = renderList(gratitudes);

    if (gratitudesField.dataset.editing !== "0") {
      editingMessage.classList.remove('hidden');
    }

    confButton.addEventListener('click', confirmAddGratitude);
  });
};