import hideNoJs from './src/hide-no-js';

const journalList = document.getElementById('journal-list');
const gratTextarea = document.getElementById('gratitudes-textarea');
const confContent = document.getElementById('confirmation-content');
const editingMessage = document.getElementById('editing-message');
const confList = document.getElementById('confirmation-list');
const confButton = document.getElementById('confirm-gratitude');
const confMessage = document.getElementById('conf-message');


const init = () => {
  hideNoJs();
  renderInitialJournalList();
  submitGratitude();
};

const renderInitialJournalList = () => {
  const gratitudeData = getCookies();

  journalList.innerHTML = '';

  if (gratitudeData.length > 0) {
    for (let i = 0; i < gratitudeData.length; i += 1) {
      renderJournalComponent(gratitudeData[i]);
    }
  } else {
    renderNoLogMessage();
  }

  journalList.setAttribute('aria-live', 'polite');
};

const renderJournalComponent = data => {
  const parent = gratTextarea.dataset.editing !== "0" ? document.querySelector(`[data-id="${gratTextarea.dataset.editing}"]`) : document.createElement('div');

  parent.classList.add('journal-entry');
  parent.dataset.id = data.id;

  if (gratTextarea.dataset.editing === "0") {
    parent.innerHTML = `
      <h3>Last recorded on ${data.timestamp}</h3>
      <ul>
        ${renderList(data.gratitudes)}
      </ul>
      <button class="journal-entry__button">Edit entry</botton>
      <button class="journal-entry__button">Delete entry</botton>
    `;

    clearNoLogMessage();
    journalList.insertBefore(parent, journalList.firstChild);
    parent.getElementsByTagName('button')[0].addEventListener('click', editEntry);
    parent.getElementsByTagName('button')[1].addEventListener('click', deleteCookie); 
  } else {
    parent.getElementsByTagName('ul')[0].innerHTML = renderList(data.gratitudes);

    const editButton = parent.getElementsByTagName('button')[0];
    editButton.dataset.editing = 'false';
    editButton.innerText = 'Edit entry';

  }
};

const renderList = (data) => data.map(datum => `<li>${datum}</li>`).join('');

const renderNoLogMessage = () => journalList.innerHTML = '<p>You have no previously entered gratitudes. Use the above text box to start entering gratitudes!</p>';

const clearNoLogMessage = () => {
  if (journalList.firstChild && journalList.firstChild.nodeName.toLowerCase() === 'p') {
    journalList.innerHTML = '';
  }
};

const submitGratitude = () => {
  document.getElementById('submit-gratitude').addEventListener('click', () => {
    confMessage.classList.add('hidden');
    confMessage.innerText = '';

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

const disableConfirmation = () => {
  confContent.classList.add('hidden');
  editingMessage.classList.add('hidden');
  confList.innerHTML = '';
  confButton.removeEventListener('click', confirmAddGratitude);
};

const editEntry = event => {
  const parent = event.target.parentNode;
  const cookie = getCookieById(parent.dataset.id);

  if (event.target.dataset.editing === 'true') {
    event.target.dataset.editing = 'false';
    event.target.innerText = 'Edit entry';
    gratTextarea.dataset.editing = 0;
    gratTextarea.value = '';

    setConfMessage(`You've cancelled editing an existing journal entry`);
  } else {
    gratTextarea.value = cookie.gratitudes.join('\n');
    gratTextarea.dataset.editing = cookie.id;

    event.target.dataset.editing = 'true';
    event.target.innerText = 'Stop editing';
    disableConfirmation();
  }
};

const setEditingState = (entry) => {
  entry.getElementsByTagName('button')[0].innerText = 'Cancel edit';
  parent.dataset.editing = 'true';
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

const getCookies = () => {
  const cookies =  document.cookie.split('; ').filter(cookie => cookie.indexOf('gratitude') !== -1);
  return cookies.map(cookie => JSON.parse(cookie.split('=')[1]));
};

const deleteCookie = event => {
  const parent = event.target.parentNode;
  const cookie = getCookieById(parent.dataset.id);

  document.cookie = `gratitude ${cookie.id}=null; expires=Thu, 01 Jan 1970 00:00:01 GMT`;

  parent.getElementsByTagName('button')[0].removeEventListener('click', editEntry);
  event.target.removeEventListener('click', deleteCookie);
  parent.classList.remove('journal-entry');
  parent.classList.add('message', 'message--success');
  parent.innerHTML = `Journal entry deleted successfully`;

  setTimeout(() => {
    parent.remove();
    if (journalList.children.length === 0) {
      renderNoLogMessage();
    }
  }, 3000);
};

const getCookieById = id => getCookies().find(cookie => cookie.id.toString() === id.toString());

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

setConfMessage = message => {
  confMessage.classList.remove('hidden');
  confMessage.innerText = message;
  setTimeout(() => {
    confMessage.classList.add('hidden');
    confMessage.innerText = '';
  }, 3000);
}

const getTimestamp = () => {
  const now = new Date();
  return `${now.getDate()}/${timeFormatting(now.getMonth() + 1)}/${now.getFullYear()}, ${now.getHours()}:${timeFormatting(now.getMinutes())}`;
};

const timeFormatting = num => {
  return num > 10 ? num.toString() : `0${num.toString()}`;
};

const sanitizeInput = string => string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

window.onload = init;