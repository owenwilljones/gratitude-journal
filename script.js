import hideNoJs from './src/utils/hide-no-js';
import renderInitialJournalList from './src/rendering/initial-journal-list';
import editEntry from './src/entries/edit-entry';
import deleteCookie from './src/cookies/delete-cookie';

const journalList = document.getElementById('journal-list');
const gratTextarea = document.getElementById('gratitudes-textarea');
const confContent = document.getElementById('confirmation-content');
const editingMessage = document.getElementById('editing-message');
const confList = document.getElementById('confirmation-list');
const confButton = document.getElementById('confirm-gratitude');

const init = () => {
  hideNoJs();
  renderInitialJournalList(journalList, gratTextarea, editEntryAlias, deleteEntryAlias);
  submitGratitude();
};

//Alias events for event listeners
const editEntryAlias = event => {
  editEntry(event.target, gratTextarea, confContent, editingMessage, confList, confButton);
};

const deleteEntryAlias = event => {
  deleteCookie(event.target, editEntryAlias, deleteEntryAlias, journalList);
};

const submitGratitude = () => {
  document.getElementById('submit-gratitude').addEventListener('click', () => {
    setConfMessage(false);

    if (gratTextarea.value === '') {
      setErrorMessage('Please enter content into the textbox below');
      disableConfirmation();
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

const confirmAddGratitude = () => {
  const latest = setCookie(sanitizeInput(gratTextarea.value).split(/\r?\n/));
  let message = '';
  
  renderJournalComponent(latest);

  if (gratTextarea.dataset.editing !== "0") {
    gratTextarea.dataset.editing = 0;
    message = `You've successfully updated one of your old entries!`;
  } else {
    message = `You've successfully added an entry to your gratitude journal!`;
  }

  disableConfirmation();
  clearNoLogMessage();
  gratTextarea.value = '';

  setConfMessage(message);
};

const setCookie = gratitudes => {
  const expiration = new Date();
  const cookie = {
    id: gratTextarea.dataset.editing !== "0" ? gratTextarea.dataset.editing : getNewCookieId(),
    timestamp: getTimestamp(),
    gratitudes
  };

  expiration.setDate(expiration.getDate() + 7);
  document.cookie = `gratitude ${cookie.id}=${JSON.stringify(cookie)}; expires=${expiration}`;

  return cookie;
};

const getNewCookieId = () => {
  const cookies = getCookies().map(cookie => cookie.id);
  return cookies.length > 0 ? Math.max(...cookies) + 1 : 1;
};

const setErrorMessage = (message) => {
  const errorMessage = document.getElementById('error-message');

  if (message !== false) {
    errorMessage.classList.remove('hidden');
    errorMessage.innerText = message;
  } else {
    errorMessage.classList.add('hidden');
    errorMessage.innerText = '';
  }
};

const getTimestamp = () => {
  const now = new Date();
  return `${now.getDate()}/${timeFormatting(now.getMonth() + 1)}/${now.getFullYear()}, ${now.getHours()}:${timeFormatting(now.getMinutes())}`;
};

const timeFormatting = num => {
  return num > 10 ? num.toString() : `0${num.toString()}`;
};

const sanitizeInput = string => string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

window.onload = init;