import setConfMessage from '../utils/set-conf-message';
import disableConfirmation from '../utils/disable-confirmation';
import sanitizeInput from '../utils/sanitize-input';
import renderList from '../rendering/list';
import timeFormatting from '../utils/time-formatting';

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

export default (gratitudesField, dateField, timeField, confContent, editingMessage, confList, confTimestamps, confButton, confirmAddGratitude) => {
  document.getElementById('submit-gratitude').addEventListener('click', () => {
    setConfMessage(false);

    try {
      if (gratitudesField.value === '') {
        throw new Error('Please enter some gratitudes into the textbox below');
        errorsPresent = true;
      } else if (dateField.value !== '' && Number.isNaN(Date.parse(dateField.value))) { 
        throw new Error('Please ensure you use the format "YYYY-MM-DD" when entering your gratitude\'s date');
      } else if (timeField.value !== '' && Number.isNaN(Date.parse(`1970-01-01T${timeField.value}`))) { 
        throw new Error('Please ensure you use the format "HH:MM" when entering your gratitude\'s date');
        
      } else {
        setErrorMessage(false);
      }
    } catch (e) {
      setErrorMessage(e);
      disableConfirmation(confContent, editingMessage, confList, confTimestamps, confButton, confirmAddGratitude);
      return;
    }

    const gratitudes = sanitizeInput(gratitudesField.value).split(/\r?\n/);
    const now = new Date();

    dateField.value = dateField.value === '' ? `${now.getFullYear()}-${timeFormatting(now.getMonth() + 1)}-${timeFormatting(now.getDate())}` : dateField.value;
    timeField.value = timeField.value === '' ? `${timeFormatting(now.getHours())}:${timeFormatting(now.getMinutes())}` : timeField.value;

    confContent.classList.remove('hidden');
    confList.innerHTML = renderList(gratitudes);
    confTimestamps.innerHTML = renderList([`Date: ${dateField.value}`, `Time: ${timeField.value}`]);

    if (gratitudesField.dataset.editing !== "0") {
      editingMessage.classList.remove('hidden');
    }

    confButton.addEventListener('click', confirmAddGratitude);
  });
};