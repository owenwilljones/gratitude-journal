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

export default (gratitudesField, dateField, timeField, confContent, editingMessage, confList, confButton, confirmAddGratitude) => {
  document.getElementById('submit-gratitude').addEventListener('click', () => {

    setConfMessage(false);

    if (gratitudesField.value === '') {
      setErrorMessage('Please enter content into the textbox below');
      disableConfirmation(confContent, editingMessage, confList, confButton, dateField, timeField, confirmAddGratitude);
      return;
    } else if (dateField.value !== '' && Number.isNaN(Date.parse(dateField.value))) { 
      setErrorMessage('Please ensure you use the format "YYYY-MM-DD" when entering your gratitude\'s date');
      disableConfirmation(confContent, editingMessage, confList, confButton, dateField, timeField, confirmAddGratitude);
    } else if (timeField.value !== '' && Number.isNaN(Date.parse(`1970-01-01T${timeField.value}Z`))) { 
      setErrorMessage('Please ensure you use the format "HH:MM" when entering your gratitude\'s date');
      disableConfirmation(confContent, editingMessage, confList, confButton, dateField, timeField, confirmAddGratitude);
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